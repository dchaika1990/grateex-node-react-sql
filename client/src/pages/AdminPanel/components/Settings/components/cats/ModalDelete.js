import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ModalDelete = ({deletedCat, handleClose, deleteCat}) => {
	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to delete the
					category <strong>{deletedCat.label}</strong> ?</Modal.Title>
			</Modal.Header>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
				<Button variant="danger" onClick={deleteCat}>Delete</Button>
			</Modal.Footer>
		</>
	);
};

export default ModalDelete;
