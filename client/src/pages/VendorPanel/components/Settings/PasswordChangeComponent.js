import React from 'react';
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {changePassword} from "@services/userAPI";
import {Button, Form} from "react-bootstrap";

const PasswordChangeComponent = () => {
	const {currentUser} = useSelector(state => state.user);
	const {register, handleSubmit, formState: {errors}, reset} = useForm()

	const changePasswordHandler = async ({password, newPassword, confirmNewPassword}) => {
		if (newPassword !== confirmNewPassword) {
			return toast.error('Password and Confirm password must be match')
		}
		changePassword('', newPassword, password, currentUser.email).then(res => {
			toast.success(res)
			reset({newPassword: "", confirmNewPassword: "", password: ''})
		}).catch(e => {
			toast.error(e.response.data.message)
		});
	}

	return (
		<Form onSubmit={handleSubmit(changePasswordHandler)}>
			<h5 className="mb-3">Change Your Password</h5>
			<Form.Group>
				<Form.Control
					className={errors.password && 'is-invalid'}
					placeholder="Current Password"
					type={'password'}
					{...register("password", { required: true, min: 8 })}
				/>
				{errors.password &&
				<p className='invalid-feedback'>{errors.password?.message}</p>}
			</Form.Group>
			<Form.Group className="mt-2">
				<Form.Control
					className={errors.newPassword && 'is-invalid'}
					placeholder="New Password"
					type={'password'}
					{...register("newPassword", { required: true, min: 8 })}
				/>
				{errors.newPassword &&
				<p className='invalid-feedback'>{errors.newPassword?.message}</p>}
			</Form.Group>
			<Form.Group className="mt-2">
				<Form.Control
					className={errors.confirmNewPassword && 'is-invalid'}
					placeholder="Confirm New Password"
					type={'password'}
					{...register("confirmNewPassword", { required: true, min: 8 })}
				/>
				<Form.Text className="text-muted">
					Your password must be at least 8 characters in length.
				</Form.Text>
				{errors.confirmNewPassword &&
				<p className='invalid-feedback'>{errors.confirmNewPassword?.message}</p>}
			</Form.Group>
			<Button type="submit" className="mt-3" variant="success">Save</Button>
		</Form>
	);
};

export default PasswordChangeComponent;
