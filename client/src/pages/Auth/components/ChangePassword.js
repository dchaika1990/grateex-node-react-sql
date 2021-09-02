import React from 'react';
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Col, Container, Row} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {changePassword} from "@/services/userAPI";
import {LOGIN_ROUTE} from "@/utils/consts";
import {toast} from "react-toastify";

const SignupSchema = yup.object().shape({
	password: yup.string().required().min(8),
	confirmPassword: yup.string().required().min(8),
})

const ChangePassword = () => {
	const {link} = useParams();
	const history = useHistory();
	const {register, handleSubmit, formState: {errors}, reset} = useForm({
		resolver: yupResolver(SignupSchema),
	})

	const onSubmit = async ({newPassword, confirmPassword}) => {
		try {
			if (newPassword !== confirmPassword) {
				return toast.error('Password and Confirm password must be match')
			}
			changePassword(link, newPassword).then(data => {
				toast.success(data);
				reset({newPassword: "", confirmPassword: ""})
				setTimeout(()=> {
					history.push(LOGIN_ROUTE)
				}, 4000)
			}).catch(e => {
				toast.error(e.response.data.message)
			})

		} catch (e) {
			toast.error(e.response.data.message)
		}
	}

	return (
		<>
			<section className="my-5">
				<Container>
					<Row>
						<Col md={{span: 6, offset: 3}}>
							<p className="message">Please enter your new password.</p>
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Form.Group className="mt-3">
									<Form.Control
										type="password"
										className={errors.newPassword && 'is-invalid'}
										placeholder="Enter your password..."
										{...register("newPassword")}
									/>
									{errors.newPassword && <p className={'invalid-feedback'}>{errors.newPassword?.message}</p>}
								</Form.Group>
								<Form.Group className="mt-3">
									<Form.Control
										type="password"
										className={errors.confirmPassword && 'is-invalid'}
										placeholder="Confirm your password..."
										{...register("confirmPassword")}
									/>
									{errors.confirmPassword && <p className={'invalid-feedback'}>{errors.confirmPassword?.message}</p>}
								</Form.Group>
								<Form.Group className="mt-3">
									<Button
										variant="success"
										type="submit"
									>
										Get new password
									</Button>
								</Form.Group>
							</Form>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	)
};

export default ChangePassword;
