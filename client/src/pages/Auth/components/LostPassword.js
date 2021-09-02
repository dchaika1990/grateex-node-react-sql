import React from 'react';
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "@/utils/consts";
import {Col, Container, Row} from "react-bootstrap";
import {lostPassword} from "@/services/userAPI";
import {toast} from "react-toastify";

const SignupSchema = yup.object().shape({
	email: yup.string().required().email()
})

const LostPassword = () => {
	const {register, handleSubmit, formState: {errors}, reset} = useForm({
		resolver: yupResolver(SignupSchema),
	})

	const onSubmit = async ({email}) => {
		try {
			lostPassword(email).then(data => {
				toast.success(data);
				reset({email: ""})
			}).catch(e => {
				toast.error(e.response.data.message)
			});
		} catch (e) {
			toast.error(e.response.data.message)
		}
	}

	return (
		<>
			<section className="py-5">
				<Container>
					<Row>
						<Col md={{span: 6, offset: 3}}>
							<p className="message">Please enter your email address. You will receive an
								email message with instructions on how to reset your password.</p>
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Form.Group className="mt-3">
									<Form.Control
										type='text'
										className={errors.email && 'is-invalid'}
										placeholder="Enter your email..."
										{...register("email")}

									/>
									{errors.email && <p className={'invalid-feedback'}>{errors.email?.message}</p>}
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
							<NavLink className="mt-3 d-block" to={LOGIN_ROUTE}><i
								className="fa fa-long-arrow-left me-2"/> Back to login page</NavLink>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	)
};

export default LostPassword;
