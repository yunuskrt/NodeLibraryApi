const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Book = sequelize.define(
	'Book',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'books',
		timestamps: false,
	}
)

module.exports = Book
