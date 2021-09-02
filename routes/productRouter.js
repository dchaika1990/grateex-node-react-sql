const Router = require('express');
const router = new Router();
const async = require("async");
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

async.parallel([
	router.get('/filters', productController.getProductsFilters),
	router.get('/status', productController.getProductsStatus),
	router.get('/uploads/', authMiddleware, productController.getProductsUploads),
	router.get('/purchases', authMiddleware, productController.getProductsPurchases),
	router.get('/wishlist/get', authMiddleware, productController.getProductsWishList),
	router.get('/wishlist/add', authMiddleware, productController.addProductsToWishList),
	router.post('/purchases/add', authMiddleware, productController.addToProductsPurchases),
	router.delete('/wishlist/delete', authMiddleware, productController.deleteProductFromWishList),
	router.get('/all/:id', productController.getProduct),
	router.get('/all-approved', productController.getProductsAllApproved),
	router.get('/all', productController.getProductsAll),
	router.use('/add', authMiddleware, productController.addProduct),
	router.get('/statistics', roleMiddleware(['ADMIN']), productController.getProductsStatistics),
	router.get('/delete/:id', authMiddleware, productController.deleteProduct),
	router.get('/edit-status/:id', authMiddleware, productController.editProductStatus),
	router.get('/download', productController.downloadProduct),
	router.get('/download-zip', productController.downloadZip),
	router.get('/comments/get', productController.getComments),
	router.post('/comments/add', authMiddleware, productController.addComment),
	router.get('/reviews/get', productController.getReviews),
	router.post('/reviews/add', authMiddleware, productController.addReview),
	router.get('/reviews/check', authMiddleware, productController.checkHasReview),
	router.get('/populations/get', productController.getPopulations),
])

module.exports = router;
