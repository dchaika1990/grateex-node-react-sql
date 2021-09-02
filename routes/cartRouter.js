const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/', authMiddleware, cartController.getUserCart);
router.post('/add', authMiddleware, cartController.addToCart);
router.post('/remove', authMiddleware, cartController.removeFromCart);

module.exports = router;
