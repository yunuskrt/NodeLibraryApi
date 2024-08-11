const Joi = require('joi')

const asyncWrapper = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next)
		} catch (err) {
			let status = 500
			if (err instanceof Joi.ValidationError) {
				status = 400
			}
			res.status(status).json({ message: err.message })
		}
	}
}

module.exports = asyncWrapper
