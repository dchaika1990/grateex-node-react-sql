import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import EmailChangeComponent from "@pages/VendorPanel/components/Settings/EmailChangeComponent";
import PasswordChangeComponent from "@pages/VendorPanel/components/Settings/PasswordChangeComponent";
import SwitchersOptionsComponents from "@pages/VendorPanel/components/Settings/SwitchersOptionsComponents";
import DeactivateAccountComponent from "@pages/VendorPanel/components/Settings/DeactivateAccountComponent";

const Settings = () => {
	return (
		<section className="py-5 vendor-settings">
			<Container>
				<Row>
					<Col xs={12}>
						<h2 className="mb-3">My Settings</h2>
					</Col>
					<Col lg={4} className="mb-3">
						<div className="shadow ls p-3 p-xl-5 rounded">
							<EmailChangeComponent/>
						</div>
					</Col>
					<Col lg={4} className="mb-3">
						<div className="shadow ls p-3 p-xl-5 rounded">
							<PasswordChangeComponent/>
						</div>
					</Col>
					<Col lg={4} className="mb-3">
						<div className="shadow ls p-3 p-xl-5 rounded">
							<SwitchersOptionsComponents/>
						</div>
					</Col>
					<Col xs={12} className="mt-3">
						<DeactivateAccountComponent/>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Settings;
