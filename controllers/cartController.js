const ApiError = require("../error/ApiError");
const {Cart} = require("../models");

class CartController {
	async getUserCart(req, res, next) {
		try {
			const userCart = await Cart.findAll({where: {userId: req.user.id}})
			return next(ApiError.ok(userCart))
		}catch (e){
			return next(ApiError.badRequest(e.message))
		}
	}
	
	async addToCart(req, res, next) {
		try {
			const productInCart = await Cart.findOne({where: {productId: req.body.productId}})
			if(productInCart) {
				return next(ApiError.ok('This product already in cart'))
			}
			await Cart.create({userId: req.user.id, productId: req.body.productId})
			return next(ApiError.ok('Product added to cart'))
		}catch (e){
			return next(ApiError.badRequest(e.message))
		}
	}
	
	async removeFromCart(req, res, next) {
		try {
			await Cart.destroy({where: {productId: req.body.productId}})
			return next(ApiError.ok('Product remove from cart'))
		}catch (e){
			return next(ApiError.badRequest(e.message))
		}
	}
}

module.exports = new CartController()
