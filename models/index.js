const {
    User,
    UserInfo,
    UserCategories,
    UserProductsPurchases,
    UserProductsWithList,
    UserNotification,
    AdminsEmails
} = require('./userModel')

const {
    Schools
} = require('./schoolModel')

const {Cart} = require('./cartModel')

const {
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
    ProductTypePrice,
    ProductCategories,
    ProductStatus,
    Language,
    ProductLanguage,
    ProductFiles,
    ProductPreviewFiles,
    Comments,
    Review,
    Population,
    ReviewPopulations
} = require('./productModel')

const {Categories} = require('./categoriesModel')

const Role = require('./roleModel')

User.hasMany(UserNotification, { onDelete: "cascade"})
UserNotification.belongsTo(User)

Role.hasOne(User, {onDelete: "cascade"})
User.belongsTo(Role);

Schools.hasOne(User, {onDelete: "cascade"})
User.belongsTo(Schools);

UserInfo.hasOne(User, {onDelete: "cascade"})
User.belongsTo(UserInfo);

User.hasMany(Review, {onDelete: "cascade"})
Review.belongsTo(User)

Product.hasMany(Review, { onDelete: "cascade"})
Review.belongsTo(Product)

User.hasMany(Comments, { onDelete: "cascade"})
Comments.belongsTo(User)

Product.hasMany(Comments, { onDelete: "cascade"})
Comments.belongsTo(Product)

User.belongsToMany(Categories, { through: UserCategories, onDelete: "cascade", as: 'cats'});
Categories.belongsToMany(User, { through: UserCategories, as: 'user'});

Product.belongsToMany(Categories, { through: ProductCategories, onDelete: "cascade", as: 'cats'});
Categories.belongsToMany(Product, { through: ProductCategories, as: 'product'});

//fix to M-T-M
Product.hasOne(ProductImgs, {onDelete: "cascade"})
ProductImgs.belongsTo(Product);

User.hasMany(Product, { onDelete: "cascade", as: 'products'})
Product.belongsTo(User, { onDelete: "cascade", as: 'user'})

User.hasMany(UserProductsPurchases, { onDelete: "cascade", as: 'productsPurchases'})
UserProductsPurchases.belongsTo(User, { onDelete: "cascade", as: 'user'})

User.hasMany(UserProductsWithList, { onDelete: "cascade", as: 'productsWishLists'})
UserProductsWithList.belongsTo(User, { onDelete: "cascade", as: 'user'})
UserProductsWithList.belongsTo(Product, { onDelete: "cascade", as: 'product'})

Product.belongsToMany(DegreeLevel, { through: ProductDegreeLevel, onDelete: "cascade", as: 'degreeLevels'});
DegreeLevel.belongsToMany(Product, { through: ProductDegreeLevel, as: 'products' });

Product.belongsToMany(ResourceType, { through: ProductResourceType, onDelete: "cascade", as: 'resourceTypes'});
ResourceType.belongsToMany(Product, { through: ProductResourceType, as: 'products' });

Product.belongsToMany(TypeSelling, { through: ProductTypeSelling, onDelete: "cascade", as: 'typeSellings'});
TypeSelling.belongsToMany(Product, { through: ProductTypeSelling, as: 'products' });

Product.belongsToMany(Format, { through: ProductFormat, onDelete: "cascade", as: 'productFormats'});
Format.belongsToMany(Product, { through: ProductFormat, as: 'products' });

Product.belongsToMany(Language, { through: ProductLanguage, onDelete: "cascade", as: 'productLanguages'});
Language.belongsToMany(Product, { through: ProductLanguage, as: 'products' });

Review.belongsToMany(Population, { through: ReviewPopulations, onDelete: "cascade", as: 'reviewPopulations'});
Population.belongsToMany(Review, { through: ReviewPopulations, as: 'products'});

ProductTypePrice.hasOne(Product, {onDelete: "cascade"})
Product.belongsTo(ProductTypePrice);

ProductStatus.hasOne(Product, {onDelete: "cascade"})
Product.belongsTo(ProductStatus);

Product.hasMany(ProductFiles, {onDelete: "cascade"})
ProductFiles.belongsTo(Product);

Product.hasMany(ProductPreviewFiles, {onDelete: "cascade"})
ProductPreviewFiles.belongsTo(Product);

User.hasMany(Cart)
Cart.belongsTo(User)
Product.hasMany(Cart)
Cart.belongsTo(Product)

// relate a category to its parent=
Categories.belongsTo(Categories, {
    as: 'parent',
    foreignKey: 'parent_id',
    targetKey: 'id',
});

// relate parent to child categories
Categories.hasMany(Categories, {
    as: 'children',
    foreignKey: 'parent_id',
});

// relate a category to its parent=
Comments.belongsTo(Comments, {
    as: 'parent',
    foreignKey: 'parent_id',
    targetKey: 'id',
});

// relate parent to child categories
Comments.hasMany(Comments, {
    as: 'children',
    foreignKey: 'parent_id',
});

// relate a category to its parent=
Review.belongsTo(Review, {
    as: 'parent',
    foreignKey: 'parent_id',
    targetKey: 'id',
});

// relate parent to child categories
Review.hasMany(Review, {
    as: 'children',
    foreignKey: 'parent_id',
});

module.exports = {
    User,
    Role,
    Cart,
    UserInfo,
    Schools,
    Categories,
    UserCategories,
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
    ProductTypePrice,
    Language,
    ProductLanguage,
    UserProductsPurchases,
    UserProductsWithList,
    ProductCategories,
    ProductStatus,
    ProductFiles,
    ProductPreviewFiles,
    UserNotification,
    AdminsEmails,
    Comments,
    Review,
    Population,
    ReviewPopulations
};
