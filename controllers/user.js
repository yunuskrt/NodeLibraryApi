const getUsers = async (req, res) => {
	res.send('Get all users')
}

const getUser = async (req, res) => {
	res.send('Get user')
}

const createUser = async (req, res) => {
	res.send('Create user')
}

const borrowBook = async (req, res) => {
	res.send('Borrow book')
}

const returnBook = async (req, res) => {
	res.send('Return book')
}

module.exports = {
	getUsers,
	getUser,
	createUser,
	borrowBook,
	returnBook,
}
