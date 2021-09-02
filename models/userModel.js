const sequelize = require('../db')
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type: DataTypes.STRING, unique: true, defaultValue: '', required: true},
	password: {type: DataTypes.STRING, defaultValue: '', required: true},
	nickName: {type: DataTypes.STRING, defaultValue: '', required: true},
	firstName: {type: DataTypes.STRING, defaultValue: '', required: true},
	lastName: {type: DataTypes.STRING, defaultValue: '', required: true},
	activationLink: {type: DataTypes.STRING, defaultValue: ''},
	isActivated: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
	isPublic: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
	isNotification: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
	isTrusted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
	createdAt: {
		allowNull: false,
		type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
	},
	updatedAt: {
		allowNull: false,
		type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
	}
})

const UserInfo = sequelize.define('userInfo', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		avatarImg: {type: DataTypes.STRING, defaultValue: 'placeholder.png'},
		education: {type: DataTypes.STRING(500), defaultValue: ''},
		publications: {type: DataTypes.STRING(500), defaultValue: ''},
		personal_email: {type: DataTypes.STRING(500), defaultValue: ''},
		personal_web_site: {type: DataTypes.STRING(500), defaultValue: ''},
		linkedin: {type: DataTypes.STRING(500), defaultValue: ''},
		git_hub: {type: DataTypes.STRING(500), defaultValue: ''},
		twitter: {type: DataTypes.STRING(500), defaultValue: ''},
		work_experience: {type: DataTypes.STRING(500), defaultValue: ''},
		awards: {type: DataTypes.STRING(500), defaultValue: ''},
		bio: {type: DataTypes.STRING(3000), defaultValue: ''},
		featuredImg: {type: DataTypes.STRING, defaultValue: 'placeholder-bg.png'},
	},
	{ // options
		timestamps: false
	}
)

const UserCategories = sequelize.define('userCategories', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	},
	{ // options
		timestamps: false
	}
)

const UserProductsPurchases = sequelize.define('userProductsPurchases', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		title: {type: DataTypes.STRING(100), defaultValue: ''},
		description: {type: DataTypes.STRING(3000), defaultValue: ''},
		excerpt: {type: DataTypes.STRING(200), defaultValue: ''},
		price: {type: DataTypes.STRING, defaultValue: ''},
		productLink: {type: DataTypes.STRING, defaultValue: ''},
	},
)

const UserProductsWithList = sequelize.define('userProductsWithList', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	},
	{ // options
		timestamps: false
	}
)

const UserNotification = sequelize.define('userNotification', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		title: {type: DataTypes.STRING, defaultValue: '', required: true},
		isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
	},
	{ // options
		timestamps: true
	}
)

const AdminsEmails = sequelize.define('adminsEmails', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		emailAbusive: {type: DataTypes.STRING, defaultValue: '', required: true},
		emailRegistered: {type: DataTypes.STRING, defaultValue: '', required: true},
		roles: {type: DataTypes.INTEGER, defaultValue: 1}
	},
	{ // options
		timestamps: false
	}
)

module.exports = {
	User,
	UserInfo,
	UserCategories,
	UserNotification,
	UserProductsPurchases,
	UserProductsWithList,
	AdminsEmails
};
