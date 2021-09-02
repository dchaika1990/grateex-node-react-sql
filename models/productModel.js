const sequelize = require('../db')
const {DataTypes} = require('sequelize');

const Product = sequelize.define('product', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		title: {type: DataTypes.STRING(100), defaultValue: ''},
		description: {type: DataTypes.STRING(3000), defaultValue: ''},
		excerpt: {type: DataTypes.STRING(200), defaultValue: ''},
		price: {type: DataTypes.STRING, defaultValue: ''},
		productLink: {type: DataTypes.STRING, defaultValue: ''},
		ratingLevel: {type: DataTypes.FLOAT, defaultValue: 0},
		countReviews: {type: DataTypes.INTEGER, defaultValue: 0},
		createdAt: {
			allowNull: false,
			type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
		},
		updatedAt: {
			allowNull: false,
			type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
		}
	}
)

const ProductImgs = sequelize.define('productImgs', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: {type: DataTypes.STRING, defaultValue: 'placeholder-bg.png'},
	},
	{ // options
		timestamps: false
	}
)

const ProductStatus = sequelize.define('productStatus', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: {type: DataTypes.STRING, defaultValue: ''},
	},
	{ // options
		timestamps: false
	}
)

const DegreeLevel = sequelize.define('degreeLevel', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
	},
	{
		timestamps: false
	}
);

const ProductDegreeLevel = sequelize.define('productDegreeLevel', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	},
	{
		timestamps: false
	}
);

const ResourceType = sequelize.define('resourceType', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
	},
	{
		timestamps: false
	}
);

const ProductResourceType = sequelize.define('productResourceType', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	},
	{
		timestamps: false
	}
);

const Format = sequelize.define('format', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
	},
	{
		timestamps: false
	}
);

const ProductFormat = sequelize.define('productFormat', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	},
	{
		timestamps: false
	}
);

const TypeSelling = sequelize.define('typeSelling', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
	},
	{ // options
		timestamps: false
	}
)

const ProductTypeSelling = sequelize.define('productTypeSelling', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	},
	{ // options
		timestamps: false
	}
)

const Language = sequelize.define('language', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
	},
	{ // options
		timestamps: false
	}
)

const ProductLanguage = sequelize.define('productLanguage', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	},
	{ // options
		timestamps: false
	}
)

const ProductTypePrice = sequelize.define('productTypePrice', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		name: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
	},
	{ // options
		timestamps: false
	}
)

const ProductCategories = sequelize.define('productCategories', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	},
	{ // options
		timestamps: false
	}
)

const ProductFiles = sequelize.define('productFiles', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		file_name: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
	},
	{ // options
		timestamps: false
	}
)

const ProductPreviewFiles = sequelize.define('productPreviewFiles', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		file_name: {
			type: DataTypes.STRING,
			defaultValue: ''
		},
	},
	{ // options
		timestamps: false
	}
)

const Comments = sequelize.define('comments', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	content: {
		type: DataTypes.STRING,
		defaultValue: ''
	},
	approved: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
	createdAt: {
		allowNull: false,
		type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
	},
	updatedAt: {
		allowNull: false,
		type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
	}
})

const Review = sequelize.define('review', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	content: {type: DataTypes.STRING(3000), defaultValue: ''},
	ratingLevel: {type: DataTypes.FLOAT, defaultValue: null},
	approved: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
	createdAt: {
		allowNull: false,
		type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
	},
	updatedAt: {
		allowNull: false,
		type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
	}
})

const Population = sequelize.define('population', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		title: {type: DataTypes.STRING, defaultValue: ''},
	},
	{ // options
		timestamps: false
	}
)

const ReviewPopulations = sequelize.define('reviewPopulation', {
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	},
	{ // options
		timestamps: false
	}
)


module.exports = {
	Product,
	ProductImgs,
	DegreeLevel,
	ProductDegreeLevel,
	ResourceType,
	ProductResourceType,
	Format,
	ProductFormat,
	TypeSelling,
	ProductTypeSelling,
	Language,
	ProductLanguage,
	ProductTypePrice,
	ProductCategories,
	ProductStatus,
	ProductFiles,
	ProductPreviewFiles,
	Comments,
	Review,
	Population,
	ReviewPopulations
};
