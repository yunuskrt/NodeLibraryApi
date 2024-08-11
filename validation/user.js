const Joi = require('joi')

const getUserSchema = Joi.object({
	userId: Joi.number().min(1).required().messages({
		'number.base': 'User ID must be a number',
		'number.min': 'User ID must be greater than or equal to 1',
		'any.required': 'User ID is required',
	}),
})

const createUserSchema = Joi.object({
	name: Joi.string().required().messages({
		'string.base': 'Name must be a string',
		'string.empty': 'Name must not be empty',
		'any.required': 'Name is required',
	}),
})

const returnBookSchema = Joi.object({
	score: Joi.number().min(1).max(10).required().messages({
		'number.base': 'Score must be a number',
		'number.min': 'Score must be greater than or equal to 1',
		'number.max': 'Score must be less than or equal to 10',
		'any.required': 'Score is required',
	}),
})

const userWithBookSchema = Joi.object({
	userId: Joi.number().min(1).required().messages({
		'number.base': 'User ID must be a number',
		'number.min': 'User ID must be greater than or equal to 1',
		'any.required': 'User ID is required',
	}),
	bookId: Joi.number().min(1).required().messages({
		'number.base': 'Book ID must be a number',
		'number.min': 'Book ID must be greater than or equal to 1',
		'any.required': 'Book ID is required',
	}),
})

module.exports = {
	getUserSchema,
	createUserSchema,
	returnBookSchema,
	userWithBookSchema,
}
