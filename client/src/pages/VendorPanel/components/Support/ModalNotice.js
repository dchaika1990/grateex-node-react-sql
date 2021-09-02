import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ModalNotice = ({showModalNotice, setRadioChoose, setShowModalNotice}) => {
	const handleCloseNotice = () => {
		setShowModalNotice(false)
		setRadioChoose(0)
	};

	return (
		<Modal show={showModalNotice} onHide={handleCloseNotice}>
			<Modal.Header closeButton>
				<Modal.Title>For another copyright owner</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Please note that a report alleging infringement or violation of legal rights must come from the
					rights owner or someone authorized to report on their behalf (ex: attorney, agent). If you are not
					the rights owner or their authorized representative, we will not be able to process your report.</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="success" onClick={handleCloseNotice}>Back to the form</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalNotice;
