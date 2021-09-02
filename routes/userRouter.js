const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const async = require("async");

async.parallel([
	router.post('/registration', [
		check('email', 'Email cannot be empty').isEmail(),
		check('password', 'Password must be greater than 4 and less than 10').isLength({min: 8})
	], userController.registration),
	router.post('/login', userController.login),
	router.get('/auth', authMiddleware, userController.check),
	router.get('/activate/:link', userController.activateUser),
	router.get('/delete/:link', userController.deleteUser),
	router.post('/lost-password', userController.lostPassword),
	router.post('/change-password', userController.changePassword),
	router.post('/change-email', userController.changeEmail),
	router.put('/update-user-settings', authMiddleware, userController.updateUserSettings),
	router.put('/update-user-global-settings', authMiddleware, userController.updateUserGlobalSettings),
	router.get('/get-current-user', authMiddleware, userController.getCurrentUser),
	router.get('/users', roleMiddleware(['ADMIN']), userController.getAllUsers),
	router.post('/notifications/add', authMiddleware, userController.addNotification),
	router.get('/notifications/get', authMiddleware, userController.getNotificationAll),
	router.get('/notifications/clean', authMiddleware, userController.cleanNotification),
	router.get('/users/:nickname', roleMiddleware(['ADMIN']), userController.getOneUser),
	router.get('/statistics', roleMiddleware(['ADMIN']), userController.getUsersStatistics),
	router.get('/:nickname', userController.getUserPage),
	router.put('/admins-emails/update', roleMiddleware(['ADMIN']), userController.updateAdminsEmails),
	router.get('/admins-emails/get', roleMiddleware(['ADMIN']), userController.getAdminsEmails),
	router.post('/infringement/privacy', authMiddleware, userController.privacyInfringement),
	router.post('/infringement/copyright', authMiddleware, userController.copyrightInfringement),
	router.post('/infringement/product', authMiddleware, userController.productInfringement),
	router.post('/contact-us', authMiddleware, userController.contactUs),
	router.post('/send-email', authMiddleware, userController.sendEmailToVendor),
])


module.exports = router;
