import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import AppRouter from "./components/AppRouter";
import {setIsAuth, setSchools, setUserInfo} from './actions/user'
import NavBar from "./components/NavBar";
import NotificationProvider from "./components/Notification";
import Footer from "./components/Footer";
import {check, getNotificationAll, getUser} from "@services/userAPI";
import {
	getAllFilters,
	getPopulations,
	getPurchases,
	getUploadsProducts,
	getUploadsWishlist
} from "@services/productAPI";
import {
	setPopulations,
	setProductsFilters,
	setProductsPurchases,
	setProductsUploads,
	setProductsWishList
} from "@/actions/products";
import {setNotices} from "@/actions/notifications";
import {socket} from "@services/socket";
import {endLoad, startLoad} from "@/actions/fetch";
import {getCategories, getCategoriesByList} from "@services/categoryAPI";
import {setCats, setCatsList} from "@/actions/categories";
import {getSchools} from "@services/schoolAPI";

const App = () => {
	const dispatch = useDispatch();
	let {currentUser} = useSelector(state => state.user)
	const [value, setValue] = useState(null)

	useEffect(() => {
		const _logic = async (data) => {
			const notices = await getNotificationAll()
			dispatch(setNotices(notices))
			toast.info(data.msg)
		}

		const MESSAGE = (data) => value !== null && _logic(data)

		socket.on("vendor_publish_product_to_admin", MESSAGE)
		socket.on("vendor_delete_product_to_admin", MESSAGE)
		socket.on("vendor_registration_approve_to_admin", MESSAGE)
		socket.on("admin_change_status_to_product_to_vendor", MESSAGE)
		socket.on("vendor_send_report_privacy_compliant_to_admin", MESSAGE)
		socket.on("vendor_send_report_copyright_infringement_to_admin", MESSAGE)
		socket.on("vendor_send_report_product_infringement_to_admin", MESSAGE)
		socket.on("vendor_send_message_to_admin", MESSAGE)
		socket.on("vendor_post_question_to_vendor", MESSAGE)
		socket.on("vendor_post_answer_to_vendor", MESSAGE)
		socket.on("vendor_post_review_to_vendor", MESSAGE)
		socket.on("vendor_post_answer_on_review_to_vendor", MESSAGE)
	}, [value])

	useEffect(() => {
		getCategories().then(res => dispatch(setCats(res)))
		getCategoriesByList().then(res => dispatch(setCatsList(res)))
		getAllFilters().then(res => dispatch(setProductsFilters(res)))
		getSchools().then(res => dispatch(setSchools(res)))
		getPopulations().then(res => dispatch(setPopulations(res)))

	}, [])

	useEffect(() => {

		if (localStorage.getItem('token')) {
			check().then(data => {
				dispatch(setIsAuth(data))
				getUser(currentUser.email).then(data => {
					setValue(data.id)
					dispatch(startLoad())
					dispatch(setUserInfo(data))
					getNotificationAll().then(data => dispatch(setNotices(data)))
					dispatch(endLoad())
				})
				socket.emit('join', {role: data.roles, vendorNickname: data.nickName});

				if (data.nickName) {
					getUploadsProducts().then(res => dispatch(setProductsUploads(res)))
					getPurchases().then(res => dispatch(setProductsPurchases(res)))
					getUploadsWishlist().then(res => dispatch(setProductsWishList(res)))
				}
			}).catch(e => {
				toast.error('User not found')
			})
		}
	}, [dispatch])


	return (
		<BrowserRouter basename="/grateex">
			<NavBar/>
			<NotificationProvider>
				<AppRouter/>
			</NotificationProvider>
			<Footer/>
		</BrowserRouter>
	);
};

export default App;
