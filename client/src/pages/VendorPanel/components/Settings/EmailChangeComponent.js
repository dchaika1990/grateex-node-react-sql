import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {changeEmail} from "@services/userAPI";
import {toast} from "react-toastify";
import {Button, Form} from "react-bootstrap";
import {setUserInfo} from "@/actions/user";

const EmailChangeComponent = () => {
	const dispatch = useDispatch();
	const {currentUser} = useSelector(state => state.user);
	const {register, handleSubmit, formState: {errors}, reset} = useForm()

	const changeEmailHandler = async ({email}) => {
		changeEmail(currentUser.email, email).then(data => {
			dispatch(setUserInfo(data))
			toast.success("Email is changed")
			reset({email: ""})
		}).catch(e => {
			toast.error(e.response.data.message)
		});
	}

	return (
		<Form onSubmit={handleSubmit(changeEmailHandler)}>
			<h5 className="mb-3">Change Your Email</h5>
			<Form.Group controlId="email">
				<Form.Control
					className={errors.email && 'is-invalid'}
					placeholder="New email"
					type={'email'}
					{...register("email", { required: true})}
				/>
			</Form.Group>
			<Button type="submit" className="mt-3" variant="success">Save</Button>
		</Form>
	);
};

export default EmailChangeComponent;
