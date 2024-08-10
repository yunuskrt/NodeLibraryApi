const express = require('express')
const router = express.Router()

const {
	getUsers,
	getUser,
	createUser,
	borrowBook,
	returnBook,
} = require('../controllers/user')

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getUser)
router.route('/:userId/borrow/:bookId').post(borrowBook)
router.route('/:userId/return/:bookId').post(returnBook)

module.exports = router
