const express = require('express')
const router = express.Router()

const { getBooks, getBook, createBook } = require('../controllers/book')
router.route('/').get(getBooks).post(createBook)
router.route('/:bookId').get(getBook)

module.exports = router
