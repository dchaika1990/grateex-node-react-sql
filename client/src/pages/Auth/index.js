import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {LOGIN_ROUTE} from "@/utils/consts";
import {useLocation} from "react-router-dom";
import Login from "@pages/Auth/components/Login";
import Registration from "@pages/Auth/components/Registration";


const Auth = () => {
	const location = useLocation();
	const isLogin = location.pathname === LOGIN_ROUTE

	return (
		<section className='py-5'>
			<Container>
				<Row>
					<Col xs={12}>
						<h2 className="text-center">{isLogin ? 'Log In' : "Registration"}</h2>
					</Col>
					<Col md={{span: 6, offset: 3}}>
						{isLogin ? <Login /> : <Registration />}
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Auth;
