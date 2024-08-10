const getBooks = async (req, res) => {
	res.send('Get all books')
}

const getBook = async (req, res) => {
	res.send('Get book')
}

const createBook = async (req, res) => {
	res.send('Create book')
}

module.exports = {
	getBooks,
	getBook,
	createBook,
}
