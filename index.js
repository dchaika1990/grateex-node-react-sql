const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require("express-fileupload")
const sequelize = require('./db');
const router = require('./routes');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const filePathMiddleware = require('./middleware/filePathMiddleware');
const http = require('http');
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: '*',
	}
});

const {PORT} = process.env || 3010;

app.use(cors())
app.use(fileUpload({}))
app.use(filePathMiddleware(path.resolve(__dirname, 'uploads')))
app.use(express.json())

if (process.env.TYPE === 'development') {
	app.use('/api', router);
	app.use(express.static(path.resolve(__dirname, 'uploads')));
} else if (process.env.TYPE === 'production') {
	app.use('/grateex/api', router);
	app.use('/grateex/', express.static(path.join(__dirname, 'build')));
	app.use('/grateex/', express.static(path.join(__dirname, 'uploads')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
	})
}

app.use(errorHandler)

let usersArr = [];
const addUser = ({ id, role, vendorNickname }) => {
	if(vendorNickname && role){
		role = role.toString().trim().toLowerCase();
		vendorNickname = vendorNickname.toString().trim().toLowerCase();
	}

	const existingUser = usersArr.find(
		user => user.vendorNickname === vendorNickname
	);

	const user = { id, role, vendorNickname };

	if (!existingUser) usersArr.push(user);

	return user;
};

const getUser = vendorNickname => {
	return usersArr.find(user => user.vendorNickname === vendorNickname)
};


io.sockets.on('connection', function (socket) {

	socket.on('join', ({role, vendorId, vendorNickname}) => {

		const user = addUser({
			id: socket.id,
			role,
			vendorNickname
		})

		if (role === "ADMIN") {
			socket.join("ADMIN_ROOM");
		} else {
			socket.join(user.vendorNickname);
		}
	});

	socket.on('vendor_publish_product', function ({nickName, product}) {
		socket.broadcast.to('ADMIN_ROOM').emit('vendor_publish_product_to_admin', {msg: `User ${nickName} added or edited the product - ${product}`});
	})

	socket.on('vendor_delete_product', function ({nickName, product}) {
		socket.broadcast.to('ADMIN_ROOM').emit('vendor_delete_product_to_admin', {msg: `User ${nickName} deleted the product - ${product}`});
	})

	socket.on('vendor_registration_approve', function ({nickName}) {
		socket.broadcast.to('ADMIN_ROOM').emit('vendor_registration_approve_to_admin', {msg: `User ${nickName} is waiting for approve`});
	})

	socket.on('vendor_send_report_privacy_compliant', function ({nickName}) {
		socket.broadcast.to('ADMIN_ROOM').emit('vendor_send_report_privacy_compliant_to_admin', {msg: `User ${nickName} send report privacy compliant`});
	})

	socket.on('vendor_send_report_copyright_infringement', function ({nickName}) {
		socket.broadcast.to('ADMIN_ROOM').emit('vendor_send_report_copyright_infringement_to_admin', {msg: `User ${nickName} send report copyright infringement`});
	})

	socket.on('vendor_send_report_product_infringement', function ({nickName}) {
		socket.broadcast.to('ADMIN_ROOM').emit('vendor_send_report_product_infringement_to_admin', {msg: `Abusive email from ${nickName}`});
	})

	socket.on('vendor_send_message', function ({nickName}) {
		socket.broadcast.to('ADMIN_ROOM').emit('vendor_send_message_to_admin', {msg: `User ${nickName} send message`});
	})

	socket.on('admin_change_status_to_product',  ({title, status, nickName}) => {
		const userCurrent = getUser(nickName);
		userCurrent && io.to(userCurrent.vendorNickname).emit('admin_change_status_to_product_to_vendor', {msg: `Admin change status for product ${title} on ${status}`});
	})

	socket.on('vendor_post_question',  ({title, nickName}) => {
		const userCurrent = getUser(nickName);
		userCurrent && io.to(userCurrent.vendorNickname).emit('vendor_post_question_to_vendor', {msg: `You received a question on product "${title}"`});
	})

	socket.on('vendor_post_answer',  ({title, nickName}) => {
		const userCurrent = getUser(nickName);
		userCurrent && io.to(userCurrent.vendorNickname).emit('vendor_post_answer_to_vendor', {msg: `You received an answer on product "${title}"`});
	})

	socket.on('vendor_post_review',  ({title, nickName}) => {
		const userCurrent = getUser(nickName);
		userCurrent && io.to(userCurrent.vendorNickname).emit('vendor_post_review_to_vendor', {msg: `You received a review on product "${title}"`});
	})

	socket.on('vendor_post_answer_on_review',  ({title, nickName}) => {
		const userCurrent = getUser(nickName);
		userCurrent && io.to(userCurrent.vendorNickname).emit('vendor_post_answer_on_review_to_vendor', {msg: `You received an answer on your review on product "${title}"`});
	})
});

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({force: false}).then(() => {
			console.log("Drop and re-sync db...");
		});
		server.listen(PORT, () => {
			console.log(`Server started on port ${PORT} !!! Happy Hacking :)`)
		})

	} catch (e) {
		console.log(e)
	}
}

start();
