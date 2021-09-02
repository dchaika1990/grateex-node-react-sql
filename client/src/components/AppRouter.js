import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {adminRoutes, authRoutes, publicRoutes} from "@/routes";
import {useSelector} from "react-redux";

const AppRouter = () => {
	const user = useSelector(state => state.user);
	return (
		<Switch>
			{user.isAdmin && adminRoutes.map(({path, Component}) =>
				<Route key={path} path={path} component={Component}/>
			)}
			{user.isAuth && !user.isAdmin && authRoutes.map(({path, Component}) =>
				<Route key={path} path={path} component={Component}/>
			)}
			{publicRoutes.map(({path, Component}) =>
				<Route key={path} path={path} component={Component} exact/>
			)}
		</Switch>
	);
};

export default AppRouter;
