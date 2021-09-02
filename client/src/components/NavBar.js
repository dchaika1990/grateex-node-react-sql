import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {
    ADMIN_ROUTE, CART_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    VENDOR_PANEL
} from "@/utils/consts";
import {useHistory} from 'react-router-dom'
import {logOutUser} from '@/actions/user'


const NavBar = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch()
	const history = useHistory();
	
	const logOut = () => {
		dispatch(logOutUser())
	}
	return (
		<header className="page_header ls">
			<Container>
				<Row className="align-items-center">
					<Col>
						<div className="nav-wrap">
							<Navbar expand="lg">
								<Navbar.Brand href="https://grateex.com/blog/">
									<img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="logo"/>
								</Navbar.Brand>
								<Link to={SHOP_ROUTE} className="btn btn-mainColor">browse teaching materials</Link>
								<Navbar.Toggle aria-controls="basic-navbar-nav"/>
								<Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
									<Nav.Link href="https://grateex.com/blog/about/">About</Nav.Link>
									<Nav.Link href="https://grateex.com/blog/blog/">Blog</Nav.Link>
									<Nav.Link href="https://grateex.com/blog/forum/">Forum</Nav.Link>
									<Nav.Link href="https://grateex.com/blog/faq/">FAQ</Nav.Link>
									{user.isAuth ?
										<>
											<NavDropdown title={'Hello ' + user.currentUser.nickName}
														 id="basic-nav-dropdown">
												{user.isAdmin ?
													<NavDropdown.Item as={Link} to={ADMIN_ROUTE + '/users'}>My
														Admin</NavDropdown.Item>
													: <NavDropdown.Item as={Link} to={VENDOR_PANEL + '/materials'}>My
														Panel</NavDropdown.Item>}
												<NavDropdown.Divider/>
												<Button
													onClick={() => logOut()}
													className="ml-2"
												>
													Log out
												</Button>
											</NavDropdown>
                                            <Link to={CART_ROUTE} className="shopping-cart d-flex align-items-center">
											    <i className="fa fa-shopping-cart ms-3 fs-2"/>
                                                {user.currentUser.carts?.length !== 0 &&
                                                    <span className="badge bg-info ms-1">
                                                        {user.currentUser.carts?.length}
                                                    </span>
                                                }
                                               
                                            </Link>
										</>
										:
										<span className="buttons-wrap">
                                        <Button variant={''} className="btn-mainColor"
												onClick={() => history.push(LOGIN_ROUTE)}>Log in</Button>
                                        <Button variant={''} className="btn-mainColor"
												onClick={() => history.push(REGISTRATION_ROUTE)}>Sign up</Button>
                                    </span>
									}
								</Navbar.Collapse>
							</Navbar>
						</div>
					</Col>
				</Row>
			</Container>
		</header>
	);
};

export default NavBar;
