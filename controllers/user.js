const User = require('../models/user')
const Book = require('../models/book')
const Borrow = require('../models/borrow')

Borrow.belongsTo(Book, { foreignKey: 'bookId' })
Book.hasMany(Borrow, { foreignKey: 'bookId' })

const asyncWrapper = require('../middleware/asyncWrapper')

const {
	getUserSchema,
	createUserSchema,
	returnBookSchema,
	userWithBookSchema,
} = require('../validation/user')

const getUsers = asyncWrapper(async (req, res) => {
	// get all from users
	const users = await User.findAll({
		order: [['name', 'ASC']],
	})
	res.status(200).json(users)
})

const getUser = asyncWrapper(async (req, res) => {
	// validate request params
	const { userId } = await getUserSchema.validateAsync(req.params)
	// find user by id
	const user = await User.findByPk(userId)
	if (!user) {
		res.status(404).json({ message: 'User not found' })
	} else {
		// user exists
		// get borrowed books of user
		const borrowedBooks = await Borrow.findAll({
			include: [
				{
					model: Book,
					attributes: ['name'],
					required: false,
				},
			],
			where: {
				userId,
			},
		})
		const books = {
			past: [],
			present: [],
		}
		// categorize borrowed books
		borrowedBooks.forEach((borrow) => {
			if (borrow.returned) {
				books.past.push({ name: borrow.Book.name, userScore: borrow.score })
			} else {
				books.present.push({ name: borrow.Book.name })
			}
		})
		// order ascending by book name
		books.past.sort((a, b) => a.name.localeCompare(b.name))
		books.present.sort((a, b) => a.name.localeCompare(b.name))

		res.status(200).json({ id: user.id, name: user.name, books })
	}
})

const createUser = asyncWrapper(async (req, res) => {
	// validate request body
	const { name } = await createUserSchema.validateAsync(req.body)
	await User.create({ name })
	res.status(201).end()
})

const borrowBook = asyncWrapper(async (req, res) => {
	// validate request params
	const { userId, bookId } = await userWithBookSchema.validateAsync(req.params)
	// check if user exists
	const user = await User.findByPk(userId)
	if (!user) {
		res.status(404).json({ message: 'User not found' })
	} else {
		// check if book exists
		const book = await Book.findByPk(bookId)
		if (!book) {
			res.status(404).json({ message: 'Book not found' })
		} else {
			// check if book is already borrowed and not returned
			const borrowedBook = await Borrow.findOne({
				where: {
					bookId,
					returned: false,
				},
			})
			if (borrowedBook) {
				res.status(400).json({
					message: `${book.name} is already borrowed.`,
				})
			} else {
				// create or get the borrow record for user and book
				const [userBorrow, created] = await Borrow.findOrCreate({
					where: {
						userId,
						bookId,
					},
					defaults: {
						// for create
						userId,
						bookId,
						returned: false,
						score: -1,
					},
				})
				if (userBorrow.returned) {
					// user borrows same book again
					userBorrow.returned = false
					userBorrow.score = -1
					await userBorrow.save()
				}
				res.status(204).end()
			}
		}
	}
})

const returnBook = asyncWrapper(async (req, res) => {
	const { userId, bookId } = await userWithBookSchema.validateAsync(req.params)
	const { score } = await returnBookSchema.validateAsync(req.body)

	// check if borrow record exists and not returned
	const borrow = await Borrow.findOne({
		where: {
			userId,
			bookId,
			returned: false,
		},
	})
	if (!borrow) {
		res.status(404).json({ message: 'Borrow record not found' })
	} else {
		// give score and return book
		borrow.score = score
		borrow.returned = true

		await borrow.save()

		res.status(204).end()
	}
})

module.exports = {
	getUsers,
	getUser,
	createUser,
	borrowBook,
	returnBook,
}
