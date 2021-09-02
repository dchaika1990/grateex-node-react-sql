const sequelize = require('../db')
const {DataTypes} = require('sequelize');

const Role = sequelize.define('role', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		role_name: {type: DataTypes.STRING, unique: true, defaultValue: ''},
	},
	{ // options
		timestamps: false
	}
)

module.exports = Role;
