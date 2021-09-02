import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import {sendMessage} from "@services/userAPI";
import {toast} from "react-toastify";
import {socket} from "@services/socket";
import {useSelector} from "react-redux";
import Loading from "@components/Loading";

const ContactForm = ({setShowForm}) => {
	const {currentUser} = useSelector(state => state.user)
	const {register, handleSubmit, formState: {errors}} = useForm()
	const [fetch, setFetch] = useState(false)

	const onSubmit = async (data) => {
		setFetch(true)
		const res = await sendMessage(data)
		setShowForm(false)
		socket.emit('vendor_send_message', {nickName: currentUser.nickName})
		toast.success(res)
		setFetch(false)
	}

	return (
		<>
			{fetch ? (
				<Loading />
			) : (
				<Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
					<Form.Group>
						<Form.Control
							as="textarea"
							className={errors.message && 'is-invalid'}
							placeholder="Your message"
							{...register('message', {required: true})}
						/>
						{errors.message &&
						<p className={'invalid-feedback'}>This field is required</p>}
					</Form.Group>
					<Form.Group className="mt-4">
						<Button variant="success" type="submit">Send</Button>
					</Form.Group>
				</Form>
			)}
		</>
	);
};

export default ContactForm;
