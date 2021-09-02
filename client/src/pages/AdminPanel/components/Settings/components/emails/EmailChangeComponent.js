import React from 'react';
import {useForm} from "react-hook-form";
import {updateAdminsEmails} from "@services/userAPI";
import {toast} from "react-toastify";
import {Button, Form} from "react-bootstrap";

const EmailChangeComponent = ({header, registerKey, oldEmail, setEmails}) => {
	const {register, handleSubmit, formState: {errors}, reset} = useForm()

	const changeEmailHandler = async (email) => {
		const formData = new FormData();
		formData.append(registerKey, email[registerKey])
		updateAdminsEmails(formData).then(emails => {
			setEmails(emails)
			toast.success("Email is changed")
			reset({email: ""})
		}).catch(e => {
			toast.error(e.response.data.message)
		});
	}

	return (
		<Form onSubmit={handleSubmit(changeEmailHandler)}>
			<h5 className="mb-3">{header}</h5>
			<Form.Group controlId="email">
				<Form.Control
					className={errors.email && 'is-invalid'}
					placeholder={oldEmail ? 'You email is ' + oldEmail : 'Write down the email'}
					type={'email'}
					{...register(registerKey, { required: true})}
				/>
			</Form.Group>
			<Button type="submit" className="mt-3" variant="success">Save</Button>
		</Form>
	);
};

export default EmailChangeComponent;
