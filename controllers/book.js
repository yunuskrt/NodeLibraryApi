const Joi = require('joi')
const { getBookSchema, createBookSchema } = require('../validation/book')

const getBooks = async (req, res) => {
	res.send('Get all books')
}

const getBook = async (req, res) => {
	try {
		const { bookId } = await getBookSchema.validateAsync(req.params)
		res.status(201).json({ bookId })
	} catch (err) {
		let status = 500
		if (err instanceof Joi.ValidationError) {
			status = 400
		}
		res.status(status).json(err.message)
	}
}

const createBook = async (req, res) => {
	try {
		const { name } = await createBookSchema.validateAsync(req.body)
		res.status(201).json({ name })
	} catch (err) {
		let status = 500
		if (err instanceof Joi.ValidationError) {
			status = 400
		}
		res.status(status).json(err.message)
	}
}

module.exports = {
	getBooks,
	getBook,
	createBook,
}
