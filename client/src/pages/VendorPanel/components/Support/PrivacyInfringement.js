import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Form, Button} from "react-bootstrap";
import ModalComponent from "@pages/VendorPanel/components/Support/ModalComponent";
import {useForm} from "react-hook-form";
import {getAllCountries} from "@services/countryApi";
import Loading from "@components/Loading";
import {sendPrivacyInfringement} from "@services/userAPI";
import {toast} from "react-toastify";
import {socket} from "@services/socket";
import {useHistory} from "react-router-dom";
import {VENDOR_PANEL} from "@/utils/consts";

const PrivacyInfringement = () => {
	const history = useHistory()
	const {register, handleSubmit, formState: {errors}} = useForm()
	const [showModal, setShowModal] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [countries, setCountries] = useState([])
	const indicateInfo = ['Full Name', 'Email address', 'Home address', 'Telephone number', 'Financial', 'Medical', 'Other']

	useEffect(async () => {
		setCountries(await getAllCountries())
		setFetching(false)
	}, [])

	const handleShow = () => setShowModal(true);

	const onSubmit = (data) => {
		sendPrivacyInfringement(data).then(res => {
			toast.success(res)
			socket.emit('vendor_send_report_privacy_compliant', {nickName: data.email})
			history.push(VENDOR_PANEL + '/support')
		}).catch(e => {
			toast.error(e.response?.data?.message)
		})
	}

	return (
		<>
			<ModalComponent showModal={showModal} setShowModal={setShowModal}/>
			{fetching ? (
				<Loading/>
			) : (
				<>
					<section className="py-5">
						<Container>
							<Row>
								<Form onSubmit={handleSubmit(onSubmit)} className="p-0">
									<Col xs={12}>
										<h2>Report privacy compliant on Grateex</h2>
										<p>* Required fields</p>
									</Col>
									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<p>You reported that someone:</p>
										<p>has <strong>violated my privacy</strong> by posting personal information <a
											href="#" onClick={handleShow}><i className="fa fa-pencil"/></a></p>
									</Col>

									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<h5>1. Complainant's information</h5>

										<Form.Group>
											<Form.Label>Full legal name (first name, last name)*</Form.Label>
											<Form.Control
												placeholder="John Q. Sample"
												className={errors.name && 'is-invalid'}
												{...register('name', {required: true})}
											/>
											{errors.name &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>

										<Form.Group className="mt-4">
											<Form.Label>Country*</Form.Label>
											<Form.Select
												style={{'textTransform': 'capitalize'}}
												{...register('country', {required: true})}
											>
												{countries.map(({country}) => {
													return (
														<option
															value={country.country_name}
															key={country.country_id}
														>{country.country_name.toLowerCase()}</option>
													)
												})}
											</Form.Select>
										</Form.Group>

										<Form.Group className="mt-4">
											<Form.Label>Email address *</Form.Label>
											<Form.Control
												placeholder="account@mail.com"
												className={errors.email && 'is-invalid'}
												{...register('email', {required: true})}
											/>
											{errors.name &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>
									</Col>

									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<h5>2. Work that reveal your privacy</h5>

										<Form.Group>
											<Form.Label>Grateex URL revealing your personal information *</Form.Label>
											<Form.Control
												placeholder="John Q. Sample"
												className={errors.url && 'is-invalid'}
												{...register('url', {required: true})}
											/>
											<Form.Text className="text-muted">The link provided should be a specific
												Grateex file URL where the infringing material is located. Note that
												Grateex cannot remove content based on general identifiers such as
												course, department, school, user profile URLs, and broad search
												keywords.</Form.Text>
											{errors.name &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>
										<Form.Group className="mt-4">
											<Form.Label className={errors.url && 'is-invalid'}>Please indicate the
												information you wish to report. Select at
												least one or more that apply: *</Form.Label>
											{indicateInfo.map((item, index) => {
												return (
													<label key={item} className="d-block">
														<input
															type="checkbox"
															value={item}
															name="indicateInfo"
															className="me-2"
															{...register('indicateInfoCheckboxes', {required: true})}/>
														{item}
													</label>
												)
											})}
											{errors.indicateInfoCheckboxes &&
											<p className={'invalid-feedback'}>This checkboxes are required</p>}
										</Form.Group>
									</Col>
									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<h5>3. Additional details (Optional)</h5>
										<Form.Group className="mt-4">
											<Form.Label>Describe in detail the nature of the personal information and
												the exact page(s) where it is located</Form.Label>
											<Form.Control
												as="textarea"
												placeholder="Describe your private information, ex. specific pages of the work where it voilated your privacy"
												className={errors.url && 'is-invalid'}
												{...register('private_information', {required: true})}
											/>
											{errors.private_information &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>
									</Col>

									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<h5>4. By checking the following boxes, I state that... *</h5>
										<Form.Group className="mt-4">
											<label
												className={'d-block' + errors.this_content_violates_my_privacy && 'is-invalid'}>
												<input type="checkbox" className="me-2"
													{...register('this_content_violates_my_privacy', {required: true})}
												/>
												I have a good faith belief that this content violates my privacy.
											</label>
											{errors.this_content_violates_my_privacy &&
											<p className={'invalid-feedback'}>This checkbox is required</p>}
											<hr/>
										</Form.Group>
										<Form.Group className="mt-4">
											<label
												className={'d-block' + errors.the_information_is_true && 'is-invalid'}>
												<input type="checkbox" className="me-2"
													{...register('the_information_is_true', {required: true})}
												/>
												I represent that the information in this notification is true and
												correct.
											</label>
											{errors.the_information_is_true &&
											<p className={'invalid-feedback'}>This checkbox is required</p>}
										</Form.Group>
									</Col>

									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<h5>5. Typing your full name in this box will act as your digital signature
											*</h5>
										<Form.Group className="mt-4">
											<Form.Label>Describe in detail the nature of the personal information and
												the exact page(s) where it is located</Form.Label>
											<Form.Control
												placeholder="First and Last Name"
												className={errors.url && 'is-invalid'}
												{...register('signature', {required: true})}
											/>
											{errors.signature &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>
									</Col>

									<Button className="mt-4" type="submit">Submit</Button>
								</Form>
							</Row>
						</Container>
					</section>
				</>
			)}
		</>
	);
};

export default PrivacyInfringement;
