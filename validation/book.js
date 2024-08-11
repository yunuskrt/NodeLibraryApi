const Joi = require('joi')

const getBookSchema = Joi.object({
	bookId: Joi.number().min(1).required().messages({
		'number.base': 'Book ID must be a number',
		'number.min': 'Book ID must be greater than or equal to 1',
		'any.required': 'Book ID is required',
	}),
})

const createBookSchema = Joi.object({
	name: Joi.string().required().messages({
		'string.base': 'Name must be a string',
		'string.empty': 'Name must not be empty',
		'any.required': 'Name is required',
	}),
})

module.exports = {
	getBookSchema,
	createBookSchema,
}
