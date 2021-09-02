const sequelize = require('../db')
const {DataTypes} = require('sequelize');

const Schools = sequelize.define('schools', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		label: {
			type: DataTypes.STRING(255),
			defaultValue: ''
		},
	},
	{
		timestamps: false
	}
);

module.exports = {Schools};
