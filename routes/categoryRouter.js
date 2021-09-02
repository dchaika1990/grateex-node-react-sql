const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get('/', categoryController.getAll);
router.get('/by-list', categoryController.getAllByList);
router.post('/add', categoryController.addCategory);
router.get('/delete/:id', categoryController.deleteCategory);
router.post('/edit/', categoryController.editCategory);

module.exports = router;
