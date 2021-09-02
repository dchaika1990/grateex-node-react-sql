const { userController } = require('./userController');
const { productController } = require('./productController');
const { categoryController } = require('./categoryController');
const { cartController } = require('./cartController');

module.exports = {
    userController,
    categoryController,
    productController,
    cartController
};
