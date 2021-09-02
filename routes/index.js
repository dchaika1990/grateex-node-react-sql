const Router = require('express');
const async = require("async");
const router = new Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');
const schoolRouter = require('./schoolRouter');
const cartRouter = require('./cartRouter')

async.parallel([
	router.use('/user', userRouter),
	router.use('/product', productRouter),
	router.use('/categories', categoryRouter),
	router.use('/schools', schoolRouter),
	router.use('/cart', cartRouter),
])

module.exports = router;
