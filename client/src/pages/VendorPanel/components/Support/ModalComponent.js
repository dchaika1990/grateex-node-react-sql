import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {VENDOR_PANEL} from "@/utils/consts";
import {useHistory} from "react-router-dom";

const ModalComponent = ({showModal, setShowModal}) => {
	const history = useHistory()
	const [isReport, setIsReport] = useState(false)
	const [route, setRoute] = useState('');

	const handleClose = () => {
		setShowModal(false)
		setIsReport(false)
		setRoute('')
	};

	const handleAgree = () => {
		history.push(VENDOR_PANEL + route)
		handleClose()
	}

	return (
		<Modal show={showModal} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Report that someone:</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Check>
					<Form.Check.Input
						onChange={() => {
							setIsReport(true)
							setRoute('/support/copyright-infringement')
						}}
						className="me-2"
						id="abusive1" type="radio" name="abusive"/>
					<Form.Check.Label htmlFor="abusive1">has posted my copyrighted work without my
						permission</Form.Check.Label>
				</Form.Check>

				<Form.Check>
					<Form.Check.Input
						onChange={() => {
							setIsReport(true)
							setRoute('/support/privacy-infringement')
						}}
						className="me-2"
						id="abusive2" type="radio" name="abusive"/>
					<Form.Check.Label htmlFor="abusive2">has violated my privacy by posting personal
						information</Form.Check.Label>
				</Form.Check>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
				<Button variant="danger" disabled={!isReport} onClick={handleAgree}>Start the request form</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalComponent;
