const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define(
	'User',
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
		tableName: 'users',
		timestamps: false,
	}
)

module.exports = User
