import React from 'react';
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE} from "@/utils/consts";
import {useSelector} from "react-redux";

const AdminBar = () => {
    const {notifications} = useSelector(state => state.notifications)
    return (
        <>
            <ul className="sidebar-menu">
                <li>
                    <NavLink activeClassName="selected" to={ADMIN_ROUTE + '/statistics_analytics'}><i className="fa fa-line-chart" /><span>Statistics & Analytics</span></NavLink>
                </li>
                <li>
                    <NavLink to={ADMIN_ROUTE + '/users'}><i className="fa fa-users" /><span>All Users</span></NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to={ ADMIN_ROUTE + '/products'}><i className="fa fa-files-o" /><span>All Products</span></NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to={ADMIN_ROUTE + '/payments'}><i className="fa fa-usd" /><span>Payments</span></NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to={ADMIN_ROUTE + '/notifications'}><i className="fa fa-comment" /><span>Notifications</span> <span className="badge bg-danger">{notifications.length}</span></NavLink>
                </li>
                <li>
                    <NavLink activeClassName="selected" to={ADMIN_ROUTE + '/settings'}><i className="fa fa-cogs" /><span>Settings</span></NavLink>
                </li>
            </ul>
        </>
    );
};

export default AdminBar;
