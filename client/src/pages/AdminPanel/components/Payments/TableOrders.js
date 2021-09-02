import React from 'react';
import {Table} from "react-bootstrap";
import Order from "@pages/VendorPanel/components/Earnings/Order";

const TableOrders = ({orders}) => {
	return (
		<Table bordered hover responsive="sm">
			<thead>
			<tr>
				<th>#</th>
				<th>Date</th>
				<th>Type</th>
				<th>Username</th>
				<th>Order ID</th>
				<th>Amount</th>
				<th>Balance</th>
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
	);
};

export default TableOrders;
