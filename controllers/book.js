const Book = require('../models/book')
const Borrow = require('../models/borrow')

const { getBookSchema, createBookSchema } = require('../validation/book')

const asyncWrapper = require('../middleware/asyncWrapper')

const getBooks = asyncWrapper(async (req, res) => {
	const books = await Book.findAll({
		order: [['name', 'ASC']],
	})
	res.status(200).json(books)
})

const getBook = asyncWrapper(async (req, res) => {
	const { bookId } = await getBookSchema.validateAsync(req.params)
	const book = await Book.findByPk(bookId)
	if (!book) {
		res.status(404).json({ message: 'Book not found' })
	} else {
		// get all scores of book
		const scores = await Borrow.findAll({
			where: {
				bookId: bookId,
				returned: true,
			},
			attributes: ['score'],
		})
		const score =
			scores.length === 0
				? -1
				: (
						scores.reduce((acc, score) => acc + score.score, 0) / scores.length
				  ).toFixed(2)
		res.status(200).json({ id: book.id, name: book.name, score })
	}
})

const createBook = asyncWrapper(async (req, res) => {
	const { name } = await createBookSchema.validateAsync(req.body)
	await Book.create({ name })
	res.status(201).end()
})

module.exports = {
	getBooks,
	getBook,
	createBook,
}
