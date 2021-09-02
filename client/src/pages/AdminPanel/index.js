import React, {useEffect} from 'react';
import Loading from "@components/Loading";
import Sidebar from "@components/Sidebar";
import AdminRouter from "@pages/AdminPanel/components/AdminRouter";
import AdminBar from "@pages/AdminPanel/components/AdminBar";
import {useSelector} from "react-redux";


const AdminPanel = () => {

	let {fetching} = useSelector(state => state.fetch)

	useEffect(() => {
	}, [])
	return (
		<>
			{fetching ? (
				<Loading/>
			) : (
				<main className="admin-panel">
					<Sidebar>
						<AdminBar/>
					</Sidebar>
					<div id="main">
						<AdminRouter/>
					</div>
				</main>
			)}
		</>
	);
};

export default AdminPanel;
