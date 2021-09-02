import React, {useEffect, useMemo, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {NavLink, useHistory} from "react-router-dom";
import {registration} from "@/services/userAPI";
import {ADMIN_ROUTE, LOGIN_ROUTE, THANK_YOU_PAGE} from "@/utils/consts";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {getSchools} from "@services/schoolAPI";
import Loading from "@components/Loading";
import {socket} from "@services/socket";

const SignupSchema = yup.object().shape({
	school: yup.string().required(),
	email: yup.string().required().email(),
	password: yup.string().required().min(8),
	confirmPassword: yup.string().required().min(8),
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	nickName: yup.string().required(),
})

const Registration = () => {
	const history = useHistory()
	const {isAdmin} = useSelector(state => state.user);
	const {schools} = useSelector(state => state.user)
	const {register, handleSubmit, formState: {errors}, setValue} = useForm({
		resolver: yupResolver(SignupSchema),
	})
	const [terms, setTerms] = useState(false)
	const [schoolsFilter, setSchoolsFilter] = useState('')
	const [customValue, setCustomValue] = useState({id: '', label: ''})
	const [customValueShow, setCustomValueShow] = useState(false)
	const [fetching, setFetching] = useState(true)

	useEffect(() => {
		setFetching(false)
	}, [])

	const chooseOption = (e) => {
		setCustomValue({
			id: e.target.getAttribute('data-value'),
			label: e.target.innerText
		})
		setValue('school', e.target.innerText)
		setSchoolsFilter('')
		setCustomValueShow(false)
	}

	const filterSchool = useMemo(() => {
		if (schoolsFilter.length > 0) {
			return [...schools].filter(o => o.label.toLowerCase().indexOf(schoolsFilter) > -1)
		}
		return schools
	}, [schools, schoolsFilter])


	const onSubmit = async ({email, password, confirmPassword, school, firstName, lastName, nickName}) => {
		try {
			if (password !== confirmPassword) {
				return toast.error('Password and Confirm password must be match')
			}
			school = customValue.id

			registration(school, email, password, firstName, lastName, nickName, isAdmin).then(data => {
				if (isAdmin) {
					history.push(ADMIN_ROUTE + '/users')
				} else {
					history.push(THANK_YOU_PAGE)
				}
				toast.success(data);
				socket.emit('vendor_registration_approve', {nickName})
			}).catch(e => {
				toast.error(e.response.data.message)
			});
		} catch (e) {
			toast.error(e.response.data.message)
		}
	}

	return (
		<>
			{fetching ? (
				<Loading/>
			) : (
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="mt-3">
						<Form.Control
							className={errors.nickName && 'is-invalid'}
							placeholder="Username*"
							{...register("nickName")}
						/>
						<Form.Text className="text-muted">
							Your username will be visible to all Grateex users.
						</Form.Text>
						{errors.nickName &&
						<p className='invalid-feedback'>{errors.nickName?.message}</p>}
					</Form.Group>
					<Form.Group className="mt-3">
						<Form.Control
							className={errors.firstName && 'is-invalid'}
							placeholder="First name*"
							{...register("firstName")}
						/>
						{errors.firstName &&
						<p className='invalid-feedback'>{errors.firstName?.message}</p>}
					</Form.Group>
					<Form.Group className="mt-3">
						<Form.Control
							className={errors.lastName && 'is-invalid'}
							placeholder="Last name*"
							{...register("lastName")}
						/>
						<Form.Text className="text-muted">
							Your name is hidden from other users by default. You can make it visible to other users in
							settings.
						</Form.Text>
						{errors.lastName &&
						<p className='invalid-feedback'>{errors.lastName?.message}</p>}
					</Form.Group>
					<Form.Group className="mt-3">
						<div className="custom-select">
							<div className={"position-relative " + errors.lastName && 'is-invalid'}>
								<Form.Control
									autoComplete='off'
									placeholder='Choose school'
									value={customValue.label}
									onClick={e => setCustomValueShow(true)}
									onChange={event => {}}
									{...register('school', {required: true})}
								/>
								{ customValueShow && (
									<div className="custom-select-input">
										<Form.Control
											placeholder="Search school..."
											className="mb-2"
											onChange={e => {setSchoolsFilter(e.target.value)}}
										/>
										<div className="custom-select-options">
											{filterSchool.map(school => {
												return (<span onClick={chooseOption} data-value={school.id} key={school.id}>{school.label}</span>)
											})}
										</div>
									</div>
								) }
							</div>

							<Form.Text className="text-muted">Choose Your school.</Form.Text>
							{errors.school &&
							<p className='invalid-feedback'>{errors.school?.message}</p>}
						</div>
					</Form.Group>

					<Form.Group className="mt-3">
						<Form.Control
							className={errors.email && 'is-invalid'}
							placeholder="School-issued email address*"
							{...register("email")}
						/>
						<Form.Text className="text-muted">
							Make sure to enter your valid school-issued email address as it will be used to verify your
							instructor status. If you are an instructor but do not have a school-issued email please <a
							className="link-primary" rel="noreferrer" target="_blank" href="https://grateex.com/blog/contacts/">contact
							us</a> and we will assist you.
						</Form.Text>
						{errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>}
					</Form.Group>

					<Form.Group className="mt-3">
						<Form.Control
							className={errors.password && 'is-invalid'}
							placeholder="Password*"
							type={'password'}
							{...register("password")}
						/>
						<Form.Text className="text-muted">
							Your password must be at least 8 characters in length.
						</Form.Text>
						{errors.password &&
						<p className='invalid-feedback'>{errors.password?.message}</p>}
					</Form.Group>
					<Form.Group className="mt-3">
						<Form.Control
							type="password"
							className={errors.confirmPassword && 'is-invalid'}
							placeholder="Confirm password*"
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword &&
						<p className={'invalid-feedback'}>{errors.confirmPassword?.message}</p>}
					</Form.Group>
					<Form.Group className="mt-3">
						<Form.Check type="checkbox">
							<Form.Check.Input id="terms" className="me-2" type="checkbox"
											  onChange={e => setTerms(!terms)} value={terms}/>
							<Form.Check.Label htmlFor="terms">
								By creating this account, I agree with the <a rel="noreferrer" className="link-primary" target="_blank"
																			  href="https://grateex.com/blog/terms-of-use/">terms
								of service</a> and <a rel="noreferrer" target="_blank" className="link-primary"
													  href="https://grateex.com/blog/privacy-policy/">privacy
								policy</a>.
							</Form.Check.Label>
						</Form.Check>
					</Form.Group>
					<Form.Group className="mt-3">
						<Button
							variant="success"
							type="submit"
							disabled={!terms}
						>
							Sign Up
						</Button>
					</Form.Group>
					<Form.Group className="mt-3">
						<div>Already have a Grateex account? <NavLink to={LOGIN_ROUTE} className="link-primary fw-bold">Log In!</NavLink></div>
					</Form.Group>
				</Form>
			)}
		</>
	)
}

export default Registration;
