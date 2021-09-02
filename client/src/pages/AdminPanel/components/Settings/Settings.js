import React from 'react';
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import Cats from "@pages/AdminPanel/components/Settings/components/cats/Cats";
import Schools from "@pages/AdminPanel/components/Settings/components/schools/Schools";
import Emails from "@pages/AdminPanel/components/Settings/components/emails/Emails";

const Settings = () => {

	return (
		<>
			<section className="py-5">
				<Container>
					<Row>
						<Col>
							<Tabs defaultActiveKey="Categories" id="categories" className="mt-3">
								<Tab eventKey="Categories" title="Categories">
									<Cats />
								</Tab>
								<Tab eventKey="Schools" title="Schools">
									<Schools />
								</Tab>
								<Tab eventKey="Emails" title="Emails">
									<Emails />
								</Tab>
							</Tabs>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};

export default Settings;
