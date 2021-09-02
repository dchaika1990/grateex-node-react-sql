import React from 'react';
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {NavLink, useHistory} from "react-router-dom";
import {setIsAuth, setUserInfo} from "@/actions/user";
import {getNotificationAll, getUser, login} from "@/services/userAPI";
import {ADMIN_ROUTE, LOST_PASSWORD, REGISTRATION_ROUTE, VENDOR_PANEL} from "@/utils/consts";
import {toast} from "react-toastify";
import {endLoad, startLoad} from "@/actions/fetch";
import {setNotices} from "@/actions/notifications";

const SignupSchema = yup.object().shape({
	email: yup.string().required().email(),
	password: yup.string().required(),
})

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {register, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(SignupSchema),
	})

	const onSubmit = async ({email, password}) => {
		try {
			let data = await login(email, password);

			dispatch(setIsAuth(data))
			if (data.roles === 'USER'){
				history.push(VENDOR_PANEL+'/materials')
			}else{
				history.push(ADMIN_ROUTE+'/users')
			}
			getUser(data.email).then(data2 => {
				dispatch(startLoad())
				dispatch(setUserInfo(data2))
				getNotificationAll().then(data3 => {
					dispatch(setNotices(data3))
				})
				dispatch(endLoad())
			})
		} catch (e) {
			toast.error(e.response.data.message)
		}
	}

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className="mt-3">
					<Form.Control
						className={errors.email && 'is-invalid'}
						placeholder="Email address"
						{...register("email")}
					/>
					{errors.email && <p className={'invalid-feedback'}>{errors.email?.message}</p>}
				</Form.Group>
				<Form.Group className="mt-3">
					<Form.Control
						className={errors.password && 'is-invalid'}
						placeholder="Password"
						type={'password'}
						{...register("password")}
					/>
					{errors.password &&
					<p className={'invalid-feedback'}>{errors.password?.message}</p>}
				</Form.Group>
				<Form.Group className="mt-3">
					<div>
						<NavLink className="mt-3 d-block link-primary" to={LOST_PASSWORD}>Forgot Password?</NavLink>
					</div>
				</Form.Group>
				<Form.Group className="mt-3">
					<Button
						variant="success"
						type="submit"
					>
						Log In
					</Button>
				</Form.Group>
				<Form.Group className="mt-3">
					<div>Do not have an account with Grateex? <NavLink to={REGISTRATION_ROUTE} className="link-primary fw-bold">Sign Up.</NavLink></div>
				</Form.Group>
			</Form>
		</>
	)
}

export default Login;
