import React, {useEffect, useState} from 'react';
import { CSVLink } from "react-csv";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import Order from "./Order";

const Earnings = () => {

	const [orders, setOrders] = useState([
		{
			date: '7/29/2021',
			type: 'Sale',
			product: 'English Course',
			orderId: 'asdasd5asd46as5d6as4d6a4sd6',
			amount: '423'
		},
		{
			date: '8/29/2021',
			type: 'Withdrawal',
			product: 'French Course',
			orderId: '7c6vx8c6vfsklfmdsfs54',
			amount: '7985'
		},
		{
			date: '8/29/2021',
			type: 'Sale',
			product: 'Gitar Course',
			orderId: 'c78v6bc78v6bcv876',
			amount: '120'
		},
		{
			date: '7/22/2021',
			type: 'Sale',
			product: 'Drive Course',
			orderId: '56fd7s6f7s56f78',
			amount: '3270'
		},
		{
			date: '7/25/2021',
			type: 'Withdrawal',
			product: 'Sex Course',
			orderId: 'ad6sf856sf75s7sd6',
			amount: '270'
		}
	])

	const [currentBalance, setCurrentBalance] = useState(null)

	useEffect(() => {
		setCurrentBalance(orders.reduce((sum, order) =>  order.type === 'Withdrawal' ? sum - +order.amount : sum + +order.amount, 0))
	}, [orders])

	return (
		<section className="py-5">
			<Container>
				<Row>
					<Col xs={12} className="d-flex justify-content-between align-items-center">
						<h3 className="mb-0">My Earnings</h3>
						<CSVLink className="btn btn-mainColor" data={orders}>Download</CSVLink>
					</Col>
					<Col xs={12}>
						<div className="ls p-5 rounded shadow mt-3">
							<Table bordered hover responsive="sm">
								<thead>
								<tr>
									<th>#</th>
									<th>Date</th>
									<th>Type</th>
									<th>Product</th>
									<th>Order ID</th>
									<th>Amount</th>
								</tr>
								</thead>
								<tbody>
								{!orders.length && (
									<tr>
										<td colSpan="6">
											<p className="text-center">
												You dont have Orders
											</p>
										</td>
									</tr>
								)}
								<Order orders={orders}/>
								</tbody>
							</Table>
							<div className="currentBalance">
								<h5>Current balance = <strong className={currentBalance < 0 ? 'refund' : null}>{currentBalance}$</strong></h5>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Earnings;
