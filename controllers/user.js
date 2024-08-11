const Joi = require('joi')
const {
	getUserSchema,
	createUserSchema,
	returnBookSchema,
	userWithBookSchema,
} = require('../validation/user')

const getUsers = async (req, res) => {
	res.send('Get all users')
}

const getUser = async (req, res) => {
	try {
		const { userId } = await getUserSchema.validateAsync(req.params)
		res.status(201).json({ userId })
	} catch (err) {
		let status = 500
		if (err instanceof Joi.ValidationError) {
			status = 400
		}
		res.status(status).json(err.message)
	}
}

const createUser = async (req, res) => {
	try {
		const { name } = await createUserSchema.validateAsync(req.body)
		res.status(201).json({ name })
	} catch (err) {
		let status = 500
		if (err instanceof Joi.ValidationError) {
			status = 400
		}
		res.status(status).json(err.message)
	}
}

const borrowBook = async (req, res) => {
	try {
		const { userId, bookId } = await userWithBookSchema.validateAsync(
			req.params
		)
		res.status(201).json({ userId, bookId })
	} catch (err) {
		let status = 500
		if (err instanceof Joi.ValidationError) {
			status = 400
		}
		res.status(status).json(err.message)
	}
}

const returnBook = async (req, res) => {
	try {
		const { userId, bookId } = await userWithBookSchema.validateAsync(
			req.params
		)
		const { score } = await returnBookSchema.validateAsync(req.body)
		res.status(201).json({ userId, bookId, score })
	} catch (err) {
		let status = 500
		if (err instanceof Joi.ValidationError) {
			status = 400
		}
		res.status(status).json(err.message)
	}
}

module.exports = {
	getUsers,
	getUser,
	createUser,
	borrowBook,
	returnBook,
}
