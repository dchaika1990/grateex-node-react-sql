import React, {useEffect, useState} from 'react';
import Loading from "@components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Button, Col, Container, Modal, Row} from "react-bootstrap";
import {cleanNotification} from "@services/userAPI";
import {setNotices} from "@/actions/notifications";


const Notifications = () => {
	const dispatch = useDispatch()
	const {notifications} = useSelector(state => state.notifications)
	const [fetching, setFetchings] = useState(true)

	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);


	useEffect(() => {
		setFetchings(false)
	}, [])

	const CleanNoticesHandler = () => {
		cleanNotification().then(res => {
			dispatch(setNotices(res))
		})
		handleClose()
	}

	const cleanNoticeHandler = (id) => {
		cleanNotification(id).then(res => {
			dispatch(setNotices(res))
		})
	}


	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete all notifications</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>Close</Button>
					<Button variant="danger" onClick={CleanNoticesHandler}>Delete</Button>
				</Modal.Footer>
			</Modal>
			{fetching ? (
				<Loading/>
			) : (
				<section className="py-5">
					<Container>
						<Row>
							<Col>
								{notifications.length > 0 && (
									<Button className="mb-5" variant="danger" onClick={handleShow}>Delete all
										notifications</Button>
								)}
								{notifications.map((notice, index) =>
									<Alert key={index} className="d-flex align-items-center justify-content-between" variant="primary">{notice.title} <Button onClick={() => cleanNoticeHandler(notice.id)} variant="danger">Delete</Button></Alert>
								)}
							</Col>
						</Row>
					</Container>
				</section>
			)}
		</>
	);
};

export default Notifications;
