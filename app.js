const express = require('express')
const cors = require('cors')
const app = express()
const notFound = require('./middleware/notFound')
require('dotenv').config()

// middlewares
app.use(express.json())
app.use(cors())

// routes
const userRouter = require('./routes/user')
const bookRouter = require('./routes/book')

app.use('/users', userRouter)
app.use('/books', bookRouter)

// not found middleware
app.use(notFound)

const port = process.env.PORT || 3000

const start = async () => {
	try {
		app.listen(3000, () =>
			console.log(`Server is listening on port ${port}...`)
		)
	} catch (error) {
		console.log(error.message)
	}
}
start()
