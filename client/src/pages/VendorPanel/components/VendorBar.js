import React from 'react';
import {NavLink} from "react-router-dom";
import {VENDOR_PANEL} from "@/utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {isEditing} from "@/actions/user";
import {productIsEditingAction, productToEditId} from "@/actions/products";

const VendorBar = () => {
	const dispatch = useDispatch()
	let user = useSelector(state => state.user.currentUser)
	const {notifications} = useSelector(state => state.notifications)
	
	return (
		<>
			<div className="sidebar-header">
				
				<h4 className="name">
					<span>{user.firstName} {user.lastName}</span>
				</h4>
				
				<div className="email">
					<span>{user.nickName}</span>
				</div>
				<div className="img">
					<img src={process.env.REACT_APP_API_URL + '/' + user.userInfo?.avatarImg} alt="img"/>
				</div>
			</div>
			<ul className="sidebar-menu">
				<li onClick={e => dispatch(isEditing(false))}>
					<NavLink to={VENDOR_PANEL + '/profile'}><i className="fa fa-user"/><span>my profile</span></NavLink>
				</li>
				<li onClick={e => {
					dispatch(productIsEditingAction(false))
					dispatch(productToEditId(null))
				}}>
					<NavLink activeClassName="selected" to={VENDOR_PANEL + '/materials'}><i
						className="fa fa-file"/><span>my materials</span></NavLink>
				</li>
				<li>
					<NavLink to={VENDOR_PANEL + '/earnings'}><i
						className="fa fa-money"/><span>my earnings</span></NavLink>
				</li>
				<li>
					<NavLink to={VENDOR_PANEL + '/messages'}><i className="fa fa-comment"/><span>my messages</span>
						<span className="badge bg-danger">{notifications.length}</span></NavLink>
				</li>
				<li>
					<NavLink to={VENDOR_PANEL + '/settings'}><i
						className="fa fa-cog"/><span>account settings</span></NavLink>
				</li>
				<li>
					<NavLink to={VENDOR_PANEL + '/support'}><i
						className="fa fa-life-ring"/><span>support</span></NavLink>
				</li>
			</ul>
		</>
	);
};

export default VendorBar;
