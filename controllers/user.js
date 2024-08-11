const {
	getUserSchema,
	createUserSchema,
	returnBookSchema,
	userWithBookSchema,
} = require('../validation/user')

const asyncWrapper = require('../middleware/asyncWrapper')

const getUsers = async (req, res) => {
	res.send('Get all users')
}

const getUser = asyncWrapper(async (req, res) => {
	const { userId } = await getUserSchema.validateAsync(req.params)
	res.status(201).json({ userId })
})

const createUser = asyncWrapper(async (req, res) => {
	const { name } = await createUserSchema.validateAsync(req.body)
	res.status(201).json({ name })
})

const borrowBook = asyncWrapper(async (req, res) => {
	const { userId, bookId } = await userWithBookSchema.validateAsync(req.params)
	res.status(201).json({ userId, bookId })
})

const returnBook = asyncWrapper(async (req, res) => {
	const { userId, bookId } = await userWithBookSchema.validateAsync(req.params)
	const { score } = await returnBookSchema.validateAsync(req.body)
	res.status(201).json({ userId, bookId, score })
})

module.exports = {
	getUsers,
	getUser,
	createUser,
	borrowBook,
	returnBook,
}
