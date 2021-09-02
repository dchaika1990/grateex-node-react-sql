const ApiError = require("../error/ApiError");
const {Schools} = require("../models");

class SchoolController {
	async getAll (req, res, next) {
		try{
			const schools = await Schools.findAll()
			return next(ApiError.ok(schools))
		}catch (e){
			return next(ApiError.badRequest(e.message))
		}
	}

	async addSchool(req, res, next) {
		try {
			let {schoolLabel} = req.body.formData

			const sch =  await Schools.findOne({where: {label: schoolLabel}})
			if(sch){
				return next(ApiError.badRequest(`School ${schoolLabel} is already exist`))
			}
			await Schools.create({label: schoolLabel})

			const schools = await Schools.findAll();

			return next(ApiError.ok(schools))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async deleteSchool(req, res, next) {
		try {
			await Schools.destroy({where: {id: req.params.id}})
			const schools = await Schools.findAll();
			return next(ApiError.ok(schools))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async editSchool(req, res, next) {
		try {
			const {id, label} = req.body.formData
			const item = await Schools.findByPk(id)

			item.label = label
			await item.save()
			await item.reload()

			const schools = await Schools.findAll();
			return next(ApiError.ok(schools))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}
}

module.exports = new SchoolController()
