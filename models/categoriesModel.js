const sequelize = require('../db')
const {DataTypes} = require('sequelize');

// first define your model, you don't have to define the `id` or `parent_id` as they will be created automatically
const Categories = sequelize.define('categories', {
		label: {
			type: DataTypes.STRING(255),
			defaultValue: ''
		},
		createdAt: {
			allowNull: false,
			type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
		},
		updatedAt: {
			allowNull: false,
			type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
		},
		status: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
	},
	{
		// use underscores in generated column names
		underscored: true,
	}
);

module.exports = {
	Categories
};

