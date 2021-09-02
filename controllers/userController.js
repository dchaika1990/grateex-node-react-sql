const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const events = require('events')
const uuid = require('uuid');
const {validationResult} = require('express-validator')
const {Op, fn, col, where} = require('sequelize')
const mailService = require('../service/mailService');
const fileService = require('../service/fileService')
const {
	User,
	Role,
	UserInfo,
	Categories,
	UserCategories,
	Product,
	Schools,
	UserNotification,
	AdminsEmails, ResourceType, Cart
} = require('../models')

const generateAccessToken = (id, email, roles, nickName) => {
	const payload = {id, email, roles, nickName}
	return jwt.sign(
		payload,
		process.env.SECRET_KEY,
		{expiresIn: '24h'}
	)
}

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest({message: 'Registration error', errors: errors.errors}))
			}

			const {school, email, password, firstName, lastName, nickName, permissions} = req.body

			const candidateEmail = await User.findOne({where: {email}})
			const candidateNickName = await User.findOne({where: {nickName}})

			if (candidateEmail) {
				return next(ApiError.badRequest('User with this email already exists'))
			}

			if (candidateNickName) {
				return next(ApiError.badRequest('User with this username already exists'))
			}

			const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf
			const hashPassword = await bcrypt.hashSync(password, 5)
			const role = await Role.findOne({where: {role_name: "USER"}})

			let isActivated = 0
			if (permissions) {
				isActivated = 1
				await mailService.sendActivationMail(email, `You are registered your login is ${email} and your password is ${password}`, `${process.env.CLIENT_URL}/login`)
				await fileService.createDir(req, activationLink)
			}

			const user = await User.create({
				email,
				password: hashPassword,
				nickName,
				firstName,
				lastName,
				activationLink,
				schoolId: school,
				isActivated,
				roleId: role.id,
			})

			const userInfo = await UserInfo.create({
				userId: user.id
			})

			await User.update({userInfoId: userInfo.id}, {where: {id: user.id}})

			const adminEmail = await AdminsEmails.findOne({where: {roles: 1}})
			const emailRegistered = adminEmail.emailRegistered ? adminEmail.emailRegistered : process.env.SMTP_USER

			const admins = await User.findAll({where: {roleId: 1}})
			let adminsMessage = []
			admins.forEach(admin => adminsMessage.push({
				title: `User ${user.nickName} is waiting for approve`,
				isActive: false,
				userId: admin.id
			}))
			await UserNotification.bulkCreate(adminsMessage)

			const text = `<p>User <strong>${user.nickName}</strong> is waiting for approve</p>`

			await mailService.sendMessageMail(emailRegistered, text, user.email, `New registered users`)

			return next(ApiError.ok(`User ${nickName} registered successfully`))
		} catch (e) {
			return next(ApiError.badRequest('Registration error'))
		}

	}

	async login(req, res, next) {
		try {
			const {email, password} = req.body
			const user = await User.findOne({where: {email}, include: [Role]})
			if (!user) {
				return next(ApiError.badRequest('Wrong password or email'))
			}
			if (!user.isActivated) {
				return next(ApiError.badRequest('You are not logged in yet.'))
			}
			const validPassword = bcrypt.compareSync(password, user.password)
			if (!validPassword) {
				return next(ApiError.badRequest('Wrong password or email'))
			}
			const token = generateAccessToken(user.id, user.email, user.role.role_name, user.nickName)

			return next(ApiError.ok({token}))
		} catch (e) {
			return next(ApiError.badRequest('Login error'))
		}
	}

	async deleteUser(req, res, next) {
		try {
			const rejectLink = req.params.link;
			const user = await User.findOne({where: {activationLink: rejectLink}})
			const userInfo = await UserInfo.findOne({where: {id: user.userInfoId}})
			if (!user) {
				return next(ApiError.badRequest('Invalid delete link'))
			}
			if (!userInfo) {
				return next(ApiError.badRequest('User information not found'))
			}
			await UserInfo.destroy({where: {id: user.userInfoId}}).then(() => {
				fileService.deleteDir(req, rejectLink)
				mailService.sendActivationMail(user.email, 'You have been deleted', '', user.isNotification)
			})
			return next(ApiError.ok('User is deleted'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async lostPassword(req, res, next) {
		try {
			const {email} = req.body;
			const user = await User.findOne({where: {email}})
			if (!user) {
				return next(ApiError.badRequest('Invalid email'))
			}
			await mailService.sendActivationMail(user.email,
				'Link to create a new password',
				`${process.env.CLIENT_URL}/change-password/${user.activationLink}`,
				user.isNotification)
			return next(ApiError.ok('Request was send'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async changePassword(req, res, next) {
		try {
			const {link, newPassword, password, email} = req.body;
			let user = {}
			let validPassword = true
			if (!password) {
				user = await User.findOne({where: {activationLink: link}})
			} else {
				validPassword = false
				user = await User.findOne({where: {email}})
				validPassword = bcrypt.compareSync(password, user.password)
			}
			if (!validPassword) {
				return next(ApiError.badRequest('Invalid password'))
			}
			user.password = await bcrypt.hashSync(newPassword, 5);
			await user.save()
			return next(ApiError.ok('Changed password'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async changeEmail(req, res, next) {
		try {
			const {oldEmail, email} = req.body;
			const user = await User.findOne({where: {email: oldEmail}})
			const userExist = await User.findOne({where: {email}})
			if (userExist) {
				return next(ApiError.badRequest('This email is used'))
			}
			user.email = email

			await user.save()
			await user.reload()

			const token = generateAccessToken(user.id, user.email, user.roles, user.nickName)

			return next(ApiError.ok({user, token}))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async activateUser(req, res, next) {
		try {
			const {deactivate} = req.query
			const activationLink = req.params.link;
			const user = await User.findOne({where: {activationLink}})
			if (!user) {
				return next(ApiError.badRequest('Incorrect activation link'))
			}
			if (deactivate) {
				await User.update({isActivated: false}, {where: {activationLink}}).then(() => {
					mailService.sendActivationMail(user.email,
						'You are deactivated',
						`${process.env.CLIENT_URL}/login`,
						user.isNotification)
				})
				return next(ApiError.ok('User is deactivate'))
			}

			await User.update({isActivated: true}, {where: {activationLink}}).then(() => {
				fileService.createDir(req, activationLink)
				mailService.sendActivationMail(user.email,
					'You are activated',
					`${process.env.CLIENT_URL}/login`,
					user.isNotification)
			})

			return next(ApiError.ok('User is activate'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async check(req, res, next) {
		try {
			const user = await User.findOne({where: {email: req.user.email}})

			if (!user) {
				return next(ApiError.badRequest('User not found'))
			}
			let token
			if (user.isActivated) {
				token = generateAccessToken(req.user.id, req.user.email, req.user.roles, req.user.nickName)
			}
			return next(ApiError.ok({token}))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async updateUserGlobalSettings(req, res, next) {
		try {
			const user = await User.findByPk(req.user.id)
			const body = req.body

			Object.keys(body).forEach(key => {
				user[key] = body[key]
			})

			await user.save()
			await user.reload()

			return next(ApiError.ok(user))

		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async updateAdminsEmails(req, res, next) {
		try {
			const emails = await AdminsEmails.findOne({where: {roles: 1}})
			const body = req.body

			Object.keys(body).forEach(key => {
				emails[key] = body[key]
			})

			await emails.save()
			await emails.reload()

			return next(ApiError.ok(emails))

		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getAdminsEmails(req, res, next) {
		try {
			const emails = await AdminsEmails.findOrCreate({where: {roles: 1}})
			return next(ApiError.ok(emails))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async updateUserSettings(req, res, next) {
		try {

			const {file, featured} = req.files ? req.files : {};
			const {
				firstName,
				lastName,
				nickName,
				education,
				awards,
				publications,
				work_experience,
				bio,
				cats,
				isAdmin,
				userID,
				personal_email,
				personal_web_site,
				linkedin,
				git_hub,
				twitter,
				cleanAvatar,
				isTrusted,
				schoolId
			} = req.body;

			let user;
			if (isAdmin) {
				user = await User.findOne({
					where: {id: userID},
					include: [{model: Categories, as: 'cats'}, {model: UserInfo}, Schools]
				})
			} else {
				user = await User.findOne({
					where: {id: req.user.id},
					include: [{model: Categories, as: 'cats'}, {model: UserInfo}, Schools]
				})
			}

			const userInfo = await UserInfo.findByPk(user.userInfoId)

			let catsArray = cats.split(',')
			let dataArray = []

			catsArray.forEach(cat => {
				dataArray.push({
					userId: user.id,
					categoryId: cat
				})
			})

			await UserCategories.destroy({
				where: {userId: user.id}
			})
			if (cats.length) {
				await UserCategories.bulkCreate(dataArray)
			}

			if (cleanAvatar === 'true') {
				if (userInfo.avatarImg !== 'placeholder.png') {
					fileService.deleteFile(req, userInfo.avatarImg)
					userInfo.avatarImg = 'placeholder.png'
				}
			}

			if (file) {
				userInfo.avatarImg = user.activationLink + '/' + file.name
				await file.mv(req.filePath + '/' + user.activationLink + '/' + file.name)
			}

			if (featured) {
				UserInfo.featuredImg = user.activationLink + '/' + featured.name
				await featured.mv(req.filePath + '/' + user.activationLink + '/' + featured.name)
			}

			user.firstName = firstName
			user.lastName = lastName
			user.nickName = nickName
			user.isTrusted = isTrusted
			user.schoolId = schoolId
			userInfo.education = education
			userInfo.awards = awards
			userInfo.publications = publications
			userInfo.work_experience = work_experience
			userInfo.bio = bio
			userInfo.personal_email = personal_email
			userInfo.personal_web_site = personal_web_site
			userInfo.linkedin = linkedin
			userInfo.git_hub = git_hub
			userInfo.twitter = twitter

			await userInfo.save();
			await user.save();
			await userInfo.reload();
			await user.reload();

			return next(ApiError.ok(user))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getCurrentUser(req, res, next) {
		try {
			const user = await User.findOne({
				where: {email: req.user.email},
				include: [
					{model: UserInfo, attributes: {exclude: ['id']}},
					{model: Cart, include: [{model: Product, attributes: ['id', 'title', 'price']}]},
					{model: Categories, as: 'cats'},
					Schools
				],
				attributes: {exclude: ['password', 'activationLink', 'isActivated', 'roleId', 'userInfoId']}
			})
			if (!user) {
				return next(ApiError.badRequest('User not found'))
			}
			return next(ApiError.ok(user))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getUserPage(req, res, next) {
		try {
			const {nickname} = req.params;

			const user = await User.findOne({
				where: {nickName: nickname},
				attributes: {
					exclude: ['password', 'activationLink', 'isActivated', 'roleId', 'userInfoId']
				},
				include: [
					{model: UserInfo, attributes: {exclude: ['id']}},
					{model: Categories, as: 'cats'},
					{model: Product, separate: true, required: false, where: {productStatusId: 3}, as: 'products', include: [{model: ResourceType, as: 'resourceTypes'}]},
					Schools
				],
			})
			if (!user) {
				return next(ApiError.ok('User not found'))
			}
			
			return next(ApiError.ok(user))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getAllUsers(req, res, next) {
		try {
			let users
			let arrStatus = [0, 1]
			let startDate
			let endDate
			let {searchTerm, statusSelect, fromDate, toDate, page, limit, sort} = req.query
			
			page = page || 1
			limit = limit || 9
			let offset = page * limit - limit

			if (Object.keys(req.query).length) {
				if (fromDate.length && toDate.length) {
					startDate = new Date(fromDate);
					endDate = new Date(toDate);
				} else if (!toDate.length) {
					startDate = new Date(fromDate);
					endDate = new Date('December 17, 2225 03:24:00');
				} else if (!fromDate.length) {
					startDate = new Date('December 17, 1995 03:24:00');
					endDate = new Date(toDate);
				} else {
					startDate = new Date('December 17, 1995 03:24:00');
					endDate = new Date('December 17, 2225 03:24:00');
				}

				if (statusSelect.length) {
					arrStatus = statusSelect
				}

				let orderVal;

				switch (sort) {
					case 'newest':
						orderVal = ['createdAt', 'DESC']
						break;
					case 'oldest':
						orderVal = ['createdAt', 'ASC']
						break;
					default:
						orderVal = ['createdAt', 'DESC']
				}

				users = await User.findAndCountAll({
					where: {
						[Op.and]: [
							{
								roleId: 2
							},
							{
								isActivated: arrStatus
							},
							{
								[Op.or]: [
									where(fn('lower', col('nickname')), 'LIKE', `%${searchTerm}%`),
									where(fn('lower', col('email')), 'LIKE', `%${searchTerm}%`),
								]
							},
							{
								createdAt: {
									[Op.between]: [startDate, endDate]
								}
							},
						]
					},
					order: [
						orderVal
					],
					limit: +limit,
					offset: +offset,
				})

			} else {
				users = await User.findAll({where: {roleId: 2}})
			}

			const userInfoForCSV = await User.findAll({
				where: {roleId: 2},
				attributes: {
					exclude: ['password', 'roleId', 'activationLink', 'userInfoId', 'schoolId']
				}
			})

			return next(ApiError.ok([users, userInfoForCSV]))
		} catch (e) {
			return next(ApiError.badRequest('Something wrong'))
		}
	}

	//надо совместить с getCurrentUser
	async getOneUser(req, res, next) {
		try {
			const {nickname} = req.params
			const user = await User.findOne({
				where: {nickName: nickname},
				include: [
					{model: UserInfo, attributes: {exclude: ['id']}},
					{model: Categories, as: 'cats'}
				],
				attributes: {exclude: ['password', 'activationLink', 'isActivated', 'roleId', 'userInfoId']}
			})
			if (!user) {
				return next(ApiError.badRequest('User not found'))
			}
			return next(ApiError.ok(user))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getUsersStatistics(req, res, next) {
		try {
			const usersAll = await User.count({where: {roleId: 2}})
			const usersPending = await User.count({where: {[Op.and]: [{roleId: 2}, {isActivated: 0}]}})
			const usersApproved = await User.count({where: {[Op.and]: [{roleId: 2}, {isActivated: 1}]}})
			return next(ApiError.ok({usersAll, usersPending, usersApproved}))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getNotificationAll(req, res, next) {
		try {
			const {id} = req.user
			const notifications = await UserNotification.findAll({where: {userId: id}})
			return next(ApiError.ok(notifications))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async cleanNotification(req, res, next) {
		try {
			const {id} = req.user
			const {idNotice} = req.query

			if (!idNotice) {
				await UserNotification.destroy({where: {userId: id}})
			} else {
				await UserNotification.destroy({where: {id: idNotice}})
			}

			const notifications = await UserNotification.findAll({where: {userId: id}})
			return next(ApiError.ok(notifications))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async addNotification(req, res, next) {
		try {
			const body = req.body
			await UserNotification.create({
				title: body.title,
				isActive: false,
				userId: +body.userId
			})
			return next(ApiError.ok('Add notification'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async privacyInfringement(req, res, next) {
		try {
			const body = req.body
			const adminEmail = await AdminsEmails.findOne({where: {roles: 1}})
			const emailAbusive = adminEmail.emailAbusive ? adminEmail.emailAbusive : process.env.SMTP_USER
			const indicateInfo = body.indicateInfoCheckboxes.join(', ')

			const text = `
				<p><strong>Name:</strong> ${body.name}</p>
				<p><strong>Contry:</strong> ${body.country}</p>
				<p><strong>Email:</strong> ${body.email}</p>
				<p><strong>Work that reveal your privacy:</strong> ${body.url}</p>
				<p><strong>Information to report:</strong> ${indicateInfo}</p>
				<p><strong>Describe:</strong> ${body.private_information}</p>
				<p><strong>Signature:</strong> ${body.signature}</p>
			`

			await mailService.sendMessageMail(emailAbusive, text, body.email, `Abusive email from ${body.email}`)

			const admins = await User.findAll({where: {roleId: 1}})
			let adminsMessage = []
			admins.forEach(admin => adminsMessage.push({
				title: `User ${req.user.nickName} send report privacy compliant`,
				isActive: false,
				userId: admin.id
			}))
			await UserNotification.bulkCreate(adminsMessage)

			return next(ApiError.ok('Your request was send'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async copyrightInfringement(req, res, next) {
		try {
			const body = req.body
			const adminEmail = await AdminsEmails.findOne({where: {roles: 1}})
			const emailAbusive = adminEmail.emailAbusive ? adminEmail.emailAbusive : process.env.SMTP_USER

			const text = `
				<p><strong>Name:</strong> ${body.name}</p>
				<p><strong>University:</strong> ${body.university}</p>
				<p><strong>Job:</strong> ${body.job}</p>
				<p><strong>Grateex URL of infringing material:</strong> ${body.url}</p>
				<p><strong>Official/original title:</strong> ${body.titles}</p>
				<p><strong>Type of content:</strong> ${body.type_of_content}</p>
				<h2>Contact information</h2>
				<p><strong>Street:</strong> ${body.street}</p>
				<p><strong>City:</strong> ${body.city}</p>
				<p><strong>State:</strong> ${body.state}</p>
				<p><strong>Zipcode:</strong> ${body.zipcode}</p>
				<p><strong>Contry:</strong> ${body.country}</p>
				<p><strong>Phone:</strong> ${body.phone}</p>
				<p><strong>Email:</strong> ${body.email}</p>
				<p><strong>Signature:</strong> ${body.signature}</p>
			`

			const admins = await User.findAll({where: {roleId: 1}})
			let adminsMessage = []
			admins.forEach(admin => adminsMessage.push({
				title: `User ${req.user.nickName} send report copyright infringement`,
				isActive: false,
				userId: admin.id
			}))
			await UserNotification.bulkCreate(adminsMessage)

			await mailService.sendMessageMail(emailAbusive, text, body.email, `Abusive email from ${body.email}`)

			return next(ApiError.ok('Your request was send'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async productInfringement(req, res, next) {
		try {
			const body = req.body
			const adminEmail = await AdminsEmails.findOne({where: {roles: 1}})
			const emailAbusive = adminEmail.emailAbusive ? adminEmail.emailAbusive : process.env.SMTP_USER

			const text = `
				<p><strong>Name:</strong> ${req.user.nickName}</p>
				<p><strong>Email:</strong> ${req.user.email}</p>
				<p><strong>Product:</strong> id:${body.product_id} / title: ${body.product_title} / author: ${body.product_author}</p>
				<p><strong>Reason:</strong> ${body.reason}</p>
				<p><strong>Comments:</strong> ${body.comments}</p>
			`

			const admins = await User.findAll({where: {roleId: 1}})
			let adminsMessage = []
			admins.forEach(admin => adminsMessage.push({
				title: `User ${req.user.nickName} send report on product ${body.product_title}`,
				isActive: false,
				userId: admin.id
			}))
			await UserNotification.bulkCreate(adminsMessage)

			await mailService.sendMessageMail(emailAbusive, text, req.user.email, `Abusive email from ${req.user.email}`)

			return next(ApiError.ok('Your request was send'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async contactUs(req, res, next) {
		try {
			const body = req.body
			const adminEmail = await AdminsEmails.findOne({where: {roles: 1}})
			const emailAbusive = adminEmail.emailAbusive ? adminEmail.emailAbusive : process.env.SMTP_USER

			const text = `
				<p><strong>UserName:</strong> ${req.user.nickName}</p>
				<p><strong>Message:</strong> ${body.message}</p>
			`
			const admins = await User.findAll({where: {roleId: 1}})

			let adminsMessage = []

			admins.forEach(admin => adminsMessage.push({
				title: `User ${req.user.nickName} send message`,
				isActive: false,
				userId: admin.id
			}))
			await UserNotification.bulkCreate(adminsMessage)

			await mailService.sendMessageMail(emailAbusive, text, req.user.email, `Email from ${req.user.email}`)

			return next(ApiError.ok('Your request was send'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}
	
	async sendEmailToVendor(req, res, next){
		try {
			const {to, from, fromNickname, msg} = req.body
			await mailService.sendEmailToVendor(to, from, fromNickname, msg)
			return next(ApiError.ok('Your request was send'))
		}catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}
}

module.exports = new UserController();
