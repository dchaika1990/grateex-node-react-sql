import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const OrderThanks = () => {
	return (
		<section className="py-5">
			<Container>
				<Row>
					<Col>
						<h1>You Order is success</h1>
						<p>you can download files in your panel in your downloads/purchases</p>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default OrderThanks;
