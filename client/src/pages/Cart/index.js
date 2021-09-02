import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loading from "@components/Loading";
import {removeFromCart} from "@services/cartAPI";
import {removeFromCartItem} from "@/actions/user";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import {CHECKOUT_ROUTE} from "@/utils/consts";

const Cart = () => {
	const {currentUser} = useSelector(state => state.user)
	const dispatch = useDispatch()
	const history =  useHistory()
	
	const [fetch, setFetch] = useState(true)
	
	useEffect(() => {
		setFetch(false)
	}, [])
	
	const deleteFromCartHandler = async (id) => {
		const data = await removeFromCart(id)
		dispatch(removeFromCartItem(id))
		toast.info(data)
	}

	return (
		<>
			{fetch ?
				<Loading/>
				:
				<section className="py-5">
					<Container>
						<Row>
							<Col xs={12}>
								<h2 className="fw-bold">My Cart ({currentUser.carts?.length})</h2>
							</Col>
							<Col xs={12}>
								<Table className="users_table" bordered hover responsive>
									<thead>
									<tr>
										<th>#</th>
										<th>Product title</th>
										<th>Price</th>
										<th className="actions">Actions</th>
									</tr>
									</thead>
									<tbody>
									{currentUser.carts?.map(({id, product}, index) =>
										<tr key={index}>
											<td>
												{index + 1}
											</td>
											<td>
												<h6 className="fw-bold">{product.title}</h6>
											</td>
											<td>
												{+product.price === 0 ? 'Free' : '$ '+ product.price}
											</td>
											<td>
												<Button variant={'danger'} onClick={() => deleteFromCartHandler(product.id)}>
													Delete
												</Button>
											</td>
										</tr>
									)}
									</tbody>
								</Table>
							</Col>
							<Col>
								<h3 className="fw-bold">Total: $ {currentUser.carts?.reduce((sum, {product}) =>  sum + +product.price, 0)}</h3>
							</Col>
							<Col xs={12}>
								<Button onClick={()=>history.push(CHECKOUT_ROUTE)} disabled={0 === currentUser.carts?.length}>
									Place Order
								</Button>
							</Col>
						</Row>
					</Container>
				</section>
			}
		</>
	);
};

export default Cart;
