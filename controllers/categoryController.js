const ApiError = require("../error/ApiError");
const {Categories} = require("../models");
const {where, Op, fn, col} = require("sequelize");

class CategoryController {
	async getAll(req, res, next) {
		try {
			let {debouncedSearchTInput} = req.query
			if(!debouncedSearchTInput) debouncedSearchTInput = ''
			const category = await Categories.findAll({
				where: {
					[Op.and]: [
						(debouncedSearchTInput.trim().length === 0) && {parent_id: null},
						{
							[Op.or]: [
								where(fn('lower', col('categories.label')), 'LIKE', `%${debouncedSearchTInput}%`),
							]
						}
					]
				},
				order: [
					['label', 'ASC'],
					[{model: Categories, as: 'children'}, 'label', 'ASC'],
					[{model: Categories, as: 'children'}, {model: Categories, as: 'children'}, 'label', 'ASC'],
					[{model: Categories, as: 'children'}, {model: Categories, as: 'children'}, {
						model: Categories,
						as: 'children'
					}, 'label', 'ASC'],
					[{model: Categories, as: 'children'}, {model: Categories, as: 'children'}, {
						model: Categories,
						as: 'children'
					}, {model: Categories, as: 'children'}, 'label', 'ASC']
				],
				include: [
					{
						model: Categories,
						as: 'children',
						required: false,
						include: {
							model: Categories,
							as: 'children',
							required: false,
							include: {
								model: Categories,
								as: 'children',
								required: false,
								include: {
									model: Categories,
									as: 'children',
									required: false,
								},
							},
						},
					},
				],
				separate: true,
			});
			return next(ApiError.ok(category))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async getAllByList(req, res, next) {
		try {
			const categories = await Categories.findAll()
			return next(ApiError.ok(categories))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async addCategory(req, res, next) {
		try {
			let {catName, parentCategories} = req.body.category
			if (!parentCategories.length) {
				parentCategories = null
			}
			const cat = await Categories.findOne({where: {label: catName}})
			if (cat) {
				return next(ApiError.badRequest(`Category ${catName} is already exist`))
			}
			await Categories.create({label: catName, parent_id: parentCategories})
			return next(ApiError.ok(`Category ${catName} Added`))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async deleteCategory(req, res, next) {
		try {
			await Categories.destroy({where: {id: req.params.id}})
			return next(ApiError.ok(`Category deleted`))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async editCategory(req, res, next) {
		try {
			const {id, catData} = req.body

			let parent_id = catData.parentCategoriesEdit

			if (catData.parentCategoriesEdit === '') {
				parent_id = null
			}

			await Categories.update(
				{
					label: catData.catNameEdit,
					parent_id: parent_id
				},
				{where: {id}}
			)
			return next(ApiError.ok(`Category deleted`))
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}
}

module.exports = new CategoryController()
