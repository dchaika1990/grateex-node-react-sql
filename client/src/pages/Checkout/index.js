import React from 'react';
import {Accordion, Button, Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {CART_ROUTE, ORDER_THANKS} from "@/utils/consts";
import {useHistory} from "react-router-dom";
import {addToPurchases, getPurchases} from "@services/productAPI";
import {deleteAllFromCart} from "@/actions/user";
import {setProductsPurchases} from "@/actions/products";

const Checkout = () => {
	const history =  useHistory()
	const dispatch = useDispatch()
	const {currentUser} = useSelector(state => state.user)
	
	const submitOrderHandler = async (e) => {
		e.preventDefault()
		await addToPurchases()
		dispatch(deleteAllFromCart())
		getPurchases().then(res => dispatch(setProductsPurchases(res)))
		history.push(ORDER_THANKS)
	}
	
	return (
		<section className="py-5">
			<Container>
				<Row>
					<Col xs={12}>
						<Form onSubmit={(e)=> submitOrderHandler(e)}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Your Email</Form.Label>
								<Form.Control type="email" placeholder="Enter email" defaultValue={currentUser.email}/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Your First Name</Form.Label>
								<Form.Control type="text" placeholder="Enter Your First Name" defaultValue={currentUser.firstName}/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Your Last Name</Form.Label>
								<Form.Control type="text" placeholder="Enter Your Last Name" defaultValue={currentUser.lastName}/>
							</Form.Group>
							<Accordion>
								<Accordion.Item eventKey="0">
									<Accordion.Header>Show all {currentUser.carts?.length} items</Accordion.Header>
									<Accordion.Body>
										<ul>
											{currentUser.carts?.map(item =>
												<li key={item.id + '_cart_user'}>
													{item.product.title} -
													<span className="ms-4">$ {item.product.price}</span>
												</li>
											)}
										</ul>
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
							<h3 className="fw-bold">Total Price: $ {currentUser.carts?.reduce((sum, {product}) =>  sum + +product.price, 0)}</h3>
							<Button variant="primary" type="submit">
								Submit Order
							</Button>
							<Button onClick={()=> history.push(CART_ROUTE)}>
								Back to Cart
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Checkout;
