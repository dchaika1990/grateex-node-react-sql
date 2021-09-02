import React, {useState} from 'react';
import {Button, Form, Modal, ModalBody} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {sendProductInfringement} from "@services/userAPI";
import {toast} from "react-toastify";
import {socket} from "@services/socket";
import {useSelector} from "react-redux";

const Report = ({product}) => {
	const {currentUser} = useSelector(state => state.user);
	const formData = new FormData
	const {register, handleSubmit, formState: {errors}} = useForm()
	const [showModal, setShowModal] = useState(false);
	const reasons = ['It infringes my rights', 'It contains incorrect information', 'It is a poor quality', 'It is something else']

	const handleClose = () => setShowModal(false);
	const handleShow = (event) => {
		event.preventDefault();
		setShowModal(true);
	};

	const onSubmit = (data) => {
		Object.keys(data).map(key => {
			formData.append(key, data[key])
		})
		formData.append('product_id', product.id)
		formData.append('product_title', product.title)
		formData.append('product_author', product.user.nickName)
		sendProductInfringement(formData).then(res => {
			toast.success(res)
			socket.emit('vendor_send_report_product_infringement', {nickName: currentUser.email})
			handleClose()
		})
	}

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Report This Resource to Grateex</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)} className="p-0">
					<ModalBody>
						<p>Your information will be kept private and will only be used by us to communicate with you
							about
							your report if necessary.</p>
						<p>Please select one of the reasons for reporting below and follow the prompts.</p>
						<Form.Group>
							<div className={errors.reason && 'is-invalid'}>
								{reasons.map((item, index) => {
									return (
										<Form.Check key={index}>
											<Form.Check.Input
												type="radio"
												id={index + 1}
												name="reason"
												value={item}
												className="me-2"
												{...register('reason', {required: true})}
											/>
											<Form.Check.Label htmlFor={index + 1}>{item}</Form.Check.Label>
										</Form.Check>
									)
								})}
							</div>
							{errors.reason && <p className={'invalid-feedback'}>Choose the reason</p>}
						</Form.Group>
						<Form.Group className="mt-4">
							<Form.Control
								as="textarea"
								placeholder="Enter your comments"
								className={errors.comments && 'is-invalid'}
								name="comments"
								{...register('comments', {required: true})}
							/>
							{errors.comments && <p className={'invalid-feedback'}>This field is required</p>}
						</Form.Group>

					</ModalBody>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>Close</Button>
						<Button type="submit" variant="success">Report</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			<div className="p-3 p-xl-5 ls">
				<h4>Report this Resource to Grateex</h4>
				<p>Reported resources will be reviewed by our team. <a href="#" className="link-primary" onClick={handleShow}>Report
					this resource</a> to let us know if this resource
					is abusive or infringing on copyright.</p>
			</div>
		</>
	);
};

export default Report;
