const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError");

module.exports = function (roles) {
	return function (req, res, next) {
		if (req.method === "OPTIONS") {
			next()
		}

		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return next(ApiError.forbidden('User is not logged in'))
			}
			const {roles: userRoles} = jwt.verify(token, process.env.SECRET_KEY)
			let hasRole = false

			if (roles.includes(userRoles)) {
				hasRole = true
			}

			if (!hasRole) {
				return next(ApiError.forbidden("You don't have access"))
			}
			next();
		} catch (e) {
			return next(ApiError.forbidden(e.message))
		}
	}
};
