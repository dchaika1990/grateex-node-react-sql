import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";
import {saveUserGlobalSettings} from "@services/userAPI";
import {logOutUser} from "@/actions/user";

const DeactivateAccountComponent = () => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const form = new FormData();

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to deactivate your account?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Please note that if you click “Delete” your profile as well your active listings will be
						permanently deleted.</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>Close</Button>
					<Button variant="danger" onClick={e => {
						form.append('isActivated', false)
						saveUserGlobalSettings(form).then(res => {
							dispatch(logOutUser())
							toast.success("Account was deactivated")
						})
					}}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
			<Button
				variant="danger"
				onClick={handleShow}
			>Deactivate account</Button>
		</>
	);
};

export default DeactivateAccountComponent;
