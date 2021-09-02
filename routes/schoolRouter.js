const Router = require('express');
const router = new Router();
const async = require("async");
const schoolController = require('../controllers/schoolController')
const roleMiddleware = require('../middleware/roleMiddleware')

async.parallel([
	router.get('/', schoolController.getAll),
	router.post('/add', roleMiddleware(['ADMIN']), schoolController.addSchool),
	router.get('/delete/:id', roleMiddleware(['ADMIN']), schoolController.deleteSchool),
	router.post('/edit/', roleMiddleware(['ADMIN']), schoolController.editSchool)
])


module.exports = router;
