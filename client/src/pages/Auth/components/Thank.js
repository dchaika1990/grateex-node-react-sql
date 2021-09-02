import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Thank = () => {
	return (
		<section className="my-5">
			<Container>
				<Row>
					<Col className='text-center' xs={12} lg={{span: 8, offset: 2}}>
						<h2 className="mb-3">Thank you for registering with Grateex!</h2>
						<p>We are currently verifying your instructor status, this process may take up to 24 hours. Once
							your status is verified you will receive a confirmation email and can start using our
							platform immediately!</p>
						<p>
							Best, Grateex Team.
						</p>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Thank;
