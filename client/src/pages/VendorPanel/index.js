import React, {useEffect} from 'react';
import VendorRouter from "./components/VendorRouter";
import VendorBar from "./components/VendorBar";
import Sidebar from "../../components/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../components/Loading";
import {endLoad, startLoad} from "@/actions/fetch";
import {getNotificationAll, getUser} from "@services/userAPI";
import {setUserInfo} from "@/actions/user";
import {setNotices} from "@/actions/notifications";

const VendorPanel = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user.currentUser)
	let {fetching} = useSelector(state => state.fetch)

	useEffect(()=>{
		getUser(user.email).then(data2 => {
			dispatch(startLoad())
			dispatch(setUserInfo(data2))
			getNotificationAll().then(data3 => {
				dispatch(setNotices(data3))
			})
			dispatch(endLoad())
		})
	}, [])

	return (
		<>
			{fetching ? (
				<Loading/>
			) : (
				<main className="admin-panel">
					<Sidebar>
						<VendorBar/>
					</Sidebar>
					<div id="main">
						<VendorRouter/>
					</div>
				</main>
			)}
		</>

	);
}

export default VendorPanel;
