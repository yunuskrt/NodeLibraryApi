const { getBookSchema, createBookSchema } = require('../validation/book')

const asyncWrapper = require('../middleware/asyncWrapper')

const getBooks = async (req, res) => {
	res.send('Get all books')
}

const getBook = asyncWrapper(async (req, res) => {
	const { bookId } = await getBookSchema.validateAsync(req.params)
	res.status(201).json({ bookId })
})

const createBook = asyncWrapper(async (req, res) => {
	const { name } = await createBookSchema.validateAsync(req.body)
	res.status(201).json({ name })
})

module.exports = {
	getBooks,
	getBook,
	createBook,
}
