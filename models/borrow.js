const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const User = require('./user')
const Book = require('./book')

const Borrow = sequelize.define(
	'Borrow',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		bookId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Book,
				key: 'id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		returned: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		score: {
			type: DataTypes.INTEGER,
			defaultValue: -1,
		},
	},
	{
		tableName: 'borrows',
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ['userId', 'bookId'],
			},
		],
	}
)

module.exports = Borrow
