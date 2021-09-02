import React, {useEffect, useState} from 'react';
import {Toast, ToastContainer} from "react-bootstrap";

const ServerError = ({msg, variant}) => {

	const [show, setShow] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		setMessage(msg)
		setShow(true)
	}, [message])

	return (
		<ToastContainer className="p-3 position-fixed" position='bottom-end'>
			<Toast className="m-1" bg={variant.toLowerCase()} onClose={() => setShow(false)} show={show} delay={3000} autohide>
				<Toast.Body>
					{message}
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default ServerError;
