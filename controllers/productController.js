const {Op, where, fn, col} = require("sequelize");
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const {
	User,
	Categories,
	Product,
	ProductDegreeLevel,
	ProductResourceType,
	ProductFormat,
	ProductTypeSelling,
	ProductTypePrice,
	ProductLanguage,
	Language,
	UserProductsPurchases,
	UserProductsWithList,
	ProductCategories,
	ProductStatus,
	ProductFiles,
	ProductPreviewFiles,
	DegreeLevel,
	ResourceType,
	Format,
	TypeSelling,
	ProductImgs,
	UserNotification,
	UserInfo,
	Cart,
	Comments,
	Review,
	Population,
	ReviewPopulations
} = require('../models')

const mailService = require('../service/mailService');
const fileService = require('../service/fileService')

class ProductController {

	static async _getAllReviews(productId) {
		return await Review.findAll({
			include: [
				{
					model: User,
					attributes: ['nickName', 'email'],
					include: [
						{model: UserInfo, attributes: ['avatarImg']},
					]
				},
				{model: Population, as: 'reviewPopulations'},
				{model: Product, attributes: ['title']},
				{
					model: Review,
					as: 'children',
					required: false,
					include: [
						{
							model: User,
							attributes: ['nickName', 'email'],
							include: [
								{model: UserInfo, attributes: ['avatarImg']},
							]
						},
						{model: Population, as: 'reviewPopulations'},
						{model: Product, attributes: ['title']},
					],
				},
			],
			order: [
				['createdAt', 'DESC']
			],
			separate: true,
			where: {
				productId,
				parent_id: null,
			},
		})
	}

	static async _getAllComments(productId) {
		return await Comments.findAll({
			include: [
				{
					model: User,
					attributes: ['nickName', 'email'],
					include: {model: UserInfo, attributes: ['avatarImg']}
				},
				{
					model: Comments,
					as: 'children',
					required: false,
					include: [
						{
							model: User,
							attributes: ['nickName', 'email'],
							include: {model: UserInfo, attributes: ['avatarImg']}
						},
					]
				},
			],
			order: [
				['createdAt', 'DESC']
			],
			separate: true,
			where: {
				productId,
				parent_id: null,
			},
		})
	}

	async getProductsAll(req, res, next) {
		try {
			let products;
			let arrStatus = [2, 3, 4]
			let startDate
			let endDate
			let {searchTerm, statusSelect, fromDate, toDate, page, limit, sort} = req.query

			page = page || 1
			limit = limit || 9
			let offset = page * limit - limit

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

			products = await Product.findAndCountAll({
				where: {
					[Op.and]: [
						{
							productStatusId: arrStatus
						},
						{
							[Op.or]: [
								where(fn('lower', col('title')), 'LIKE', `%${searchTerm}%`),
								where(fn('lower', col('excerpt')), 'LIKE', `%${searchTerm}%`),
							]
						},
						{
							createdAt: {
								[Op.between]: [startDate, endDate]
							}
						}
					],
					[Op.not]: [
						{productStatusId: 1},
					]
				},
				order: [
					orderVal
				],
				limit: +limit,
				offset: +offset,
				include: [
					{model: User, as: 'user'}
				]
			})

			if (!products) {
				return next(ApiError.badRequest('There are no products'))
			}

			const productsInfoForCSV = await Product.findAll({
				where: {
					[Op.not]: [
						{productStatusId: 1},
					]
				},
				attributes: {
					exclude: ['productLink', 'productStatusId', 'productTypePriceId', 'userId']
				},
				include: [{model: User, as: 'user'}, ProductStatus]
			})

			return next(ApiError.ok([products, productsInfoForCSV]))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getProductsAllApproved(req, res, next) {
		try {
			let {
				sort,
				searchTerm,
				productResourceType,
				productDegreeLevel,
				productFormat,
				productTypeSelling,
				productLanguage,
				page,
				limit,
				checkedArr
			} = req.query

			page = page || 1
			limit = limit || 9
			let offset = page * limit - limit

			let statementResourceType = {model: ResourceType, as: 'resourceTypes'};
			if (productResourceType) {
				statementResourceType.where = {id: productResourceType}
			}

			let statementDegreeLevel = {model: DegreeLevel, as: 'degreeLevels'};
			if (productDegreeLevel) {
				statementDegreeLevel.where = {id: productDegreeLevel}
			}

			let statementFormat = {model: Format, as: 'productFormats'};
			if (productFormat) {
				statementFormat.where = {id: productFormat}
			}

			let statementTypeSelling = {model: TypeSelling, as: 'typeSellings'};
			if (productTypeSelling) {
				statementTypeSelling.where = {id: productTypeSelling}
			}

			let statementLanguage = {model: Language, as: 'productLanguages'};
			if (productLanguage) {
				statementLanguage.where = {id: productLanguage}
			}

			let statementCats = {model: Categories, as: 'cats'};
			if (checkedArr) {
				statementCats.where = {id: checkedArr}
			}

			let orderVal;

			switch (sort) {
				// case 'relevance':
				// 	orderVal = ['relevance', 'ASC']
				// 	break;
				// case 'best_selling':
				// 	orderVal = ['best_selling', 'ASC']
				// 	break;
				case 'highly_rated':
					orderVal = ['ratingLevel', 'DESC']
					break;
				case 'price':
					orderVal = ['price', 'ASC']
					break;
				case 'newly_added':
					orderVal = ['createdAt', 'DESC']
					break;
				default:
					orderVal = ['createdAt', 'ASC']
			}
			const productsFiltered = await Product.findAll({
				include: [
					{model: User, as: 'user', attributes: ['nickName']},
					statementResourceType,
					statementDegreeLevel,
					statementFormat,
					statementTypeSelling,
					statementLanguage,
					statementCats
				],
			})

			let productsFilteredIDs = []

			productsFiltered.forEach(product => {
				productsFilteredIDs.push(product.id)
			})

			const products = await Product.findAndCountAll({
				where: {
					[Op.and]: [
						{productStatusId: 3},
						{id: productsFilteredIDs},
						{
							[Op.or]: [
								where(fn('lower', col('title')), 'LIKE', `%${searchTerm}%`),
								where(fn('lower', col('excerpt')), 'LIKE', `%${searchTerm}%`),
							]
						},
					]
				}, include: [
					{model: User, as: 'user', attributes: ['nickName']},
					{model: ResourceType, as: 'resourceTypes'}
				],
				order: [
					orderVal
				],
				limit: +limit,
				offset: +offset,
				distinct: true
			})

			return next(ApiError.ok(products))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getProduct(req, res, next) {
		try {
			let product = await Product.findOne({
				where: {id: req.params.id},
				include: [ProductStatus,
					{model: DegreeLevel, as: 'degreeLevels'},
					{model: ResourceType, as: 'resourceTypes'},
					{model: Format, as: 'productFormats'},
					{model: TypeSelling, as: 'typeSellings'},
					{model: Categories, as: 'cats'},
					{model: Language, as: 'productLanguages'},
					ProductTypePrice,
					ProductImgs,
					{model: ProductFiles, 	separate: true,},
					{model: ProductPreviewFiles, 	separate: true,},
					{
						model: User, as: 'user',
						attributes: ['id', 'nickName'],
						include: {
							model: UserInfo,
							attributes: ['avatarImg']
						}
					},
					{
						model: Review,
						include: [
							{
								model: User,
								attributes: ['nickName', 'email'],
								include: [
									{model: UserInfo, attributes: ['avatarImg']},
								]
							},
							{model: Population, as: 'reviewPopulations'},
							{model: Product, attributes: ['title']},
							{
								model: Review,
								as: 'children',
								required: false,
								include: [
									{
										model: User,
										attributes: ['nickName', 'email'],
										include: [
											{model: UserInfo, attributes: ['avatarImg']},
										]
									},
									{model: Population, as: 'reviewPopulations'},
									{model: Product, attributes: ['title']},
								],
							},
						],
						required: false,
						where: {parent_id: null},
						separate: true,
						order: [
							['createdAt', 'DESC'],
							[{model: Review, as: 'children'}, 'createdAt', 'DESC']
						],
					},
					{
						model: Comments,
						include: [
							{
								model: User,
								attributes: ['nickName', 'email'],
								include: {model: UserInfo, attributes: ['avatarImg']}
							},
							{
								model: Comments,
								as: 'children',
								required: false,
								include: [
									{
										model: User,
										attributes: ['nickName', 'email'],
										include: {model: UserInfo, attributes: ['avatarImg']}
									},
								]
							},
						],
						required: false,
						where: {parent_id: null},
						separate: true,
						order: [
							['createdAt', 'DESC'],
							[{model: Comments, as: 'children'}, 'createdAt', 'DESC']
						],
					}
				],
			});

			if (!product) {
				return next(ApiError.badRequest('There are not products'))
			}

			return next(ApiError.ok(product))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getProductsUploads(req, res, next) {
		try {
			const products = await Product.findAll(
				{
					where: {userId: req.user.id},
					include: [
						ProductFiles,
						ProductPreviewFiles,
						ProductImgs,
						ProductTypePrice,
						ProductStatus,
						{model: Language, as: 'productLanguages'},
						{model: DegreeLevel, as: 'degreeLevels'},
						{model: ResourceType, as: 'resourceTypes'},
						{model: Format, as: 'productFormats'},
						{model: TypeSelling, as: 'typeSellings'},
						{model: Categories, as: 'cats'},
					]
				}
			)
			return next(ApiError.ok(products))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getProductsPurchases(req, res, next) {
		try {
			const productPurchases = await UserProductsPurchases.findAll({where: {userId: req.user.id}})
			return next(ApiError.ok(productPurchases))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async addToProductsPurchases(req, res, next) {
		try {
			const productsInCart = await Cart.findAll({where: {userId: req.user.id}})
			const productsIDs = []
			productsInCart.forEach(product => {
				productsIDs.push(product.productId)
			})
			const products = await Product.findAll({where: {id: productsIDs}})

			const productsPurchases = []

			await products.forEach(product => {
				productsPurchases.push({
					title: product.title,
					description: product.description,
					excerpt: product.excerpt,
					price: product.price,
					productLink: product.productLink,
					userId: req.user.id
				})
			})

			await UserProductsPurchases.bulkCreate(productsPurchases)
			await Cart.destroy({where: {userId: req.user.id}})

			return next(ApiError.ok('Products added to Purchases'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getProductsWishList(req, res, next) {
		try {
			const products = await UserProductsWithList.findAll({
				where: {userId: req.user.id},
				include: [
					{
						model: Product, as: 'product',
						include: [
							ProductFiles,
							ProductImgs,
							ProductTypePrice,
							ProductStatus,
							{model: Language, as: 'productLanguages'},
							{model: DegreeLevel, as: 'degreeLevels'},
							{model: ResourceType, as: 'resourceTypes'},
							{model: Format, as: 'productFormats'},
							{model: TypeSelling, as: 'typeSellings'},
							{model: Categories, as: 'cats'}
						]
					}]
			})
			const arr = []
			products.forEach(item => {
				arr.push({...item.product.dataValues})
			})
			return next(ApiError.ok(arr))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async addProductsToWishList(req, res, next) {
		try {
			const {id} = req.query
			await UserProductsWithList.create({
				productId: id,
				userId: req.user.id
			})
			return next(ApiError.ok('Product add to wish list'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async deleteProductFromWishList(req, res, next) {
		try {
			const {id} = req.query
			await UserProductsWithList.destroy({
				where: {productId: id}
			})
			return next(ApiError.ok('Product destroy from wish list'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getProductsStatus(req, res, next) {
		try {
			const productStatuses = await ProductStatus.findAll()

			return next(ApiError.ok(productStatuses))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getProductsFilters(req, res, next) {
		try {
			const productDegreeLevel = await DegreeLevel.findAll();
			const productResourceType = await ResourceType.findAll();
			const productFormat = await Format.findAll();
			const productTypeSelling = await TypeSelling.findAll();
			const productTypePrice = await ProductTypePrice.findAll();
			const productLanguage = await Language.findAll();
			return next(ApiError.ok([
				{
					productDegreeLevel: {
						name: 'Degree level',
						slug: 'degreeLevels',
						multiple: true,
						options: productDegreeLevel
					}
				},
				{
					productResourceType: {
						name: 'Resource type',
						slug: 'resourceTypes',
						multiple: true,
						options: productResourceType
					}
				},
				{
					productFormat: {
						name: 'Format',
						slug: 'productFormats',
						multiple: true,
						options: productFormat
					}
				},
				{
					productTypeSelling: {
						name: 'Setting',
						slug: 'typeSellings',
						multiple: true,
						options: productTypeSelling
					}
				},
				{
					productLanguage: {
						name: 'Language',
						slug: 'productLanguages',
						multiple: true,
						options: productLanguage
					}
				},
				{
					productTypePrice: {
						name: 'Price',
						slug: 'productTypePriceId',
						multiple: false,
						options: productTypePrice
					}
				},
			]))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async addProduct(req, res, next) {
		try {
			const form = JSON.parse(req.body.form)
			const {
				id,
				title,
				description,
				excerpt,
				cats,
				price = 0,
				status,
				degreeLevels,
				resourceTypes,
				productFormats,
				typeSellings,
				productTypePriceId,
				productLanguages,
				deleteFileArr,
			} = form

			const files = req.files || {}
			const {productImage} = req.files || {}
			const productLink = uuid.v4();
			let user;
			let product = {}

			if (req.user.roles === 'ADMIN') {
				const product = await Product.findOne({
					where: {id},
					include: [{model: User, as: 'user'}]
				})
				user = product.user
			} else {
				user = await User.findByPk(req.user.id)
			}

			if (req.method === "POST") {
				product = await Product.create({
					title,
					description,
					excerpt,
					price: price || 0,
					productLink,
					productStatusId: status,
					productTypePriceId,
					userId: req.user.id
				})

				fileService.createDir(req, user.activationLink + '/' + productLink)
			}

			if (req.method === "PUT") {
				await Product.update({
					title,
					description,
					excerpt,
					price: price || 0,
					productStatusId: status,
					productTypePriceId,
				}, {where: {id}})
				product = await Product.findByPk(id)
			}

			if (degreeLevels.length) {
				const arr = []
				degreeLevels.forEach(item => {
					return arr.push({
						productId: product.id,
						degreeLevelId: item.id
					})
				})
				await ProductDegreeLevel.destroy({where: {productId: product.id,}})
				await ProductDegreeLevel.bulkCreate(arr)
			}

			if (resourceTypes.length) {
				const arr = []
				resourceTypes.forEach(item => {
					return arr.push({
						productId: product.id,
						resourceTypeId: item.id
					})
				})
				await ProductResourceType.destroy({where: {productId: product.id,}})
				await ProductResourceType.bulkCreate(arr)
			}

			if (productFormats.length) {
				const arr = []
				productFormats.forEach(item => {
					return arr.push({
						productId: product.id,
						formatId: item.id
					})
				})
				await ProductFormat.destroy({where: {productId: product.id,}})
				await ProductFormat.bulkCreate(arr)
			}

			if (typeSellings.length) {
				const arr = []
				typeSellings.forEach(item => {
					return arr.push({
						productId: product.id,
						typeSellingId: item.id
					})
				})
				await ProductTypeSelling.destroy({where: {productId: product.id,}})
				await ProductTypeSelling.bulkCreate(arr)
			}

			if (productLanguages.length) {
				const arr = []
				productLanguages.forEach(item => {
					return arr.push({
						productId: product.id,
						languageId: item.id
					})
				})
				await ProductLanguage.destroy({where: {productId: product.id,}})
				await ProductLanguage.bulkCreate(arr)
			}

			if (deleteFileArr.length) {
				const files = await ProductFiles.findAll({where: {id: deleteFileArr}})
				const predFiles = await ProductPreviewFiles.findAll({where: {id: deleteFileArr}})

				files.forEach(file => {
					fileService.deleteFile(req, file.file_name)
				})
				predFiles.forEach(file => {
					fileService.deleteFile(req, file.file_name)
				})

				await ProductFiles.destroy({where: {id: deleteFileArr}})
				await ProductPreviewFiles.destroy({where: {id: deleteFileArr}})
			}

			if (files) {
				let filesArr = []
				let filesPredArr = []
				Object.keys(files).map(key => {
					if (key !== 'productImage') {

						if (key.indexOf('pred-file-') > -1) {
							filesPredArr.push({
								file_name: user.activationLink + '/' + product.productLink + '/' + files[key].name,
								productId: product.id
							})
						} else {
							filesArr.push({
								file_name: user.activationLink + '/' + product.productLink + '/' + files[key].name,
								productId: product.id
							})
						}
					}
				})
				if (filesArr.length) {
					await ProductFiles.bulkCreate(filesArr)
					Object.keys(files).map(key => {
						files[key].mv(req.filePath + '/' + user.activationLink + '/' + product.productLink + '/' + files[key].name)
					})
				}
				if (filesPredArr.length) {
					await ProductPreviewFiles.bulkCreate(filesPredArr)
					Object.keys(files).map(key => {
						files[key].mv(req.filePath + '/' + user.activationLink + '/' + product.productLink + '/' + files[key].name)
					})
				}
			}

			if (productImage) {
				const image = await ProductImgs.findAll({
					where: {productId: product.id}
				})
				image.forEach(elem => {
					fileService.deleteFile(req, elem.name)
				})
				await ProductImgs.destroy({
					where: {productId: product.id}
				})
				await ProductImgs.create({
					name: user.activationLink + '/' + product.productLink + '/' + productImage.name,
					productId: product.id
				})

				await productImage.mv(req.filePath + '/' + user.activationLink + '/' + product.productLink + '/' + productImage.name)
			}

			let catsArray;
			let dataArray = []
			if (cats.length) {
				let catsArray = cats.split(',')

				catsArray.forEach(cat => {
					dataArray.push({
						productId: product.id,
						categoryId: cat
					})
				})
			}

			await ProductCategories.destroy({
				where: {productId: product.id}
			})

			if (cats.length) {
				await ProductCategories.bulkCreate(dataArray)
			}

			const admins = await User.findAll({where: {roleId: 1}})
			let adminsMessage = []
			admins.forEach(admin => adminsMessage.push({
				title: `User ${user.nickName} added or edited the product - ${product.title}`,
				isActive: false,
				userId: admin.id
			}))

			await UserNotification.bulkCreate(adminsMessage)

			if (req.method === "POST") {
				return next(ApiError.ok('Added product'))
			}
			if (req.method === "PUT") {
				return next(ApiError.ok('Edited product'))
			}
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async editProductStatus(req, res, next) {
		try {
			const productId = req.params.id
			const statusId = req.query.status
			const emailId = req.query.email

			const user = await User.findOne({
				where: {email: emailId}
			})

			const product = await Product.findByPk(productId)
			const status = await ProductStatus.findByPk(statusId)

			product.productStatusId = statusId

			await product.save().then(() => {

				mailService.sendActivationMail(emailId,
					`Product ${product.title} get a status - ${status.name}`,
					'',
					user.isNotification)
			})

			await UserNotification.create({
				title: `Admin change status for product ${product.title} on ${status.name}`,
				isActive: false,
				userId: user.id
			})

			return next(ApiError.ok('Status have been changed'))

		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async deleteProduct(req, res, next) {

		try {
			const {id} = req.params
			let userId = req.user.id
			const product = await Product.findByPk(id)

			if (!product) {
				return next(ApiError.badRequest('Invalid delete link'))
			}

			if (req.user.roles === 'ADMIN') {
				const usProd = await Product.findOne({
					where: {id: id},
					include: {model: User, as: 'user'}
				})
				userId = usProd.user.id
			}

			const user = await User.findByPk(userId)

			fileService.deleteDir(req, user.activationLink + '/' + product.productLink)
			await Product.destroy({
				where: {id}
			})

			const admins = await User.findAll({where: {roleId: 1}})
			let adminsMessage = []
			admins.forEach(admin => adminsMessage.push({
				title: `User ${user.nickName} deleted the product - ${product.title}`,
				isActive: false,
				userId: admin.id
			}))

			await UserNotification.bulkCreate(adminsMessage)

			return next(ApiError.ok('Product deleted'))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getProductsStatistics(req, res, next) {
		try {
			const productsAll = await Product.count()
			const productsPending = await Product.count({where: {productStatusId: 2}})
			const productsApproved = await Product.count({where: {productStatusId: 3}})
			const productsRejected = await Product.count({where: {productStatusId: 4}})
			return next(ApiError.ok({productsAll, productsPending, productsApproved, productsRejected}))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async downloadProduct(req, res, next) {
		try {
			const {fileName} = req.query
			const {priceStatusId} = req.query
			const fileLocation = path.join('uploads', fileName);
			if (priceStatusId === '1') {
				return res.status(200).download(fileLocation, fileName);
			}
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async downloadZip(req, res, next) {
		try {
			const {productLink} = req.query
			const product = await Product.findOne({
				where: {productLink},
				include: [{model: User, as: 'user', attributes: ['activationLink']}]
			});
			const zip = await fileService.generateZipForPath(product.user.activationLink, productLink);
			res.send(zip);
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getComments(req, res, next) {
		try {
			const productId = req.query.id
			const comments = await ProductController._getAllComments(productId);
			return next(ApiError.ok(comments))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async addComment(req, res, next) {
		try {
			const {content, userId, productId, parent_id = null, to, productTitle, replay} = req.body
			await Comments.create({content, userId, productId, parent_id})
			const comments = await ProductController._getAllComments(productId);

			const title = replay !== 'false'
				? `You received an answer on product "${productTitle}"`
				: `You received a question on product "${productTitle}"`

			await UserNotification.create({
				title,
				isActive: false,
				userId: to
			})

			return next(ApiError.ok(comments))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getReviews(req, res, next) {
		try {
			const productId = req.query.id
			const reviews = await ProductController._getAllReviews(productId);
			return next(ApiError.ok(reviews))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async addReview(req, res, next) {
		try {
			const userId = req.user.id
			const {
				content,
				ratingLevel = null,
				populations,
				productId,
				parent_id = null,
				to,
				productTitle,
				replay
			} = req.body
			const review = await Review.create({content, ratingLevel, userId, productId, parent_id})
			if (populations !== undefined && populations !== 'false') {
				let populationsList = []
				const populationsArr = populations.split(',')
				populationsArr.forEach(item => {
					populationsList.push({
						reviewId: review.id,
						populationId: item
					})
				})
				await ReviewPopulations.bulkCreate(populationsList)
			}

			const reviews = await ProductController._getAllReviews(productId);

			const _reviewMean = () => {
				let allReviews = 0;
				reviews.forEach(review => {
					allReviews += review.ratingLevel
				})
				return allReviews / reviews.length
			}

			if (ratingLevel !== null) {
				const product = await Product.findByPk(productId)
				product.ratingLevel = _reviewMean()
				product.countReviews = reviews.length
				await product.save()
				await product.reload()
			}

			const title = replay !== 'false'
				? `You received an answer on your review on product "${productTitle}"`
				: `You received a review on product "${productTitle}"`

			await UserNotification.create({
				title,
				isActive: false,
				userId: to
			})

			return next(ApiError.ok(reviews))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async checkHasReview(req, res, next) {
		try {
			const userId = req.user.id
			const {productId} = req.query
			const review = await Review.findAll({where: {productId, userId}});
			const hasReview = (review.length > 0)
			return next(ApiError.ok(hasReview))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getPopulations(req, res, next) {
		try {
			const population = await Population.findAll();
			return next(ApiError.ok(population))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}
}

module.exports = new ProductController();
