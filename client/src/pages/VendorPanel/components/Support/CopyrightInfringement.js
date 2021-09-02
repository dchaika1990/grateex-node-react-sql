import React, {useEffect, useState} from 'react';
import ModalComponent from "@pages/VendorPanel/components/Support/ModalComponent";
import {Col, Container, Row, Form, Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import ModalNotice from "@pages/VendorPanel/components/Support/ModalNotice";
import {getAllCountries} from "@services/countryApi";
import Loading from "@components/Loading";
import {sendCopyrightInfringement} from "@services/userAPI";
import {toast} from "react-toastify";
import {socket} from "@services/socket";
import {VENDOR_PANEL} from "@/utils/consts";
import {useHistory} from "react-router-dom";

const CopyrightInfringement = () => {
	const history = useHistory()
	const {register, handleSubmit, formState: {errors}} = useForm()
	const [showModal, setShowModal] = useState(false);
	const [showModalNotice, setShowModalNotice] = useState(false);
	const [radioChoose, setRadioChoose] = useState(0);
	const [countries, setCountries] = useState([])
	const [fetching, setFetching] = useState(true);
	const typeOfContent = ['Note', 'Assessment', 'Homework', 'Lecture', 'Essay', 'Other']

	useEffect(async () => {
		setCountries(await getAllCountries())
		setFetching(false)
	}, [])

	const handleShow = () => setShowModal(true);

	const handleShowNotice = () => setShowModalNotice(true);

	const onSubmit = (data) => {
		sendCopyrightInfringement(data).then(res => {
			toast.success(res)
			socket.emit('vendor_send_report_copyright_infringement', {nickName: data.email})
			history.push(VENDOR_PANEL + '/support')
		}).catch(e => {
			toast.error(e.response?.data?.message)
		})
	}

	return (
		<>
			<ModalNotice showModalNotice={showModalNotice} setRadioChoose={setRadioChoose}
						 setShowModalNotice={setShowModalNotice}/>
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
										<h2>Report copyright infringement on Grateex</h2>
										<p>* Required fields</p>
									</Col>
									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<p>You reported that someone:</p>
										<p>has <strong>violated my privacy</strong> by posting personal information <a
											href="#"
											onClick={handleShow}><i
											className="fa fa-pencil"/></a></p>
									</Col>
									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<h5>1. Who is impacted?</h5>
										<Form.Group className={"mt-4" + errors.url && 'is-invalid'}>
											<label className="d-block">
												<input
													type="radio"
													className="me-2"
													name="who"
													value={1}
													defaultChecked={radioChoose === 1}
													onClick={() => setRadioChoose(1)}
													{...register('who', {required: true})}
												/>
												I am
											</label>
											{radioChoose === 1 && (
												<>
													<Form.Group className="mt-4">
														<Form.Label>Your legal name (first name, last name)
															*</Form.Label>
														<Form.Control
															placeholder="John Q. Sample"
															className={errors.name && 'is-invalid'}
															{...register('name', {required: true})}
														/>
														{errors.name &&
														<p className={'invalid-feedback'}>This field is required</p>}
													</Form.Group>
													<Form.Group className="mt-4">
														<Form.Label>Your University/Institution/Organization affliation
															*</Form.Label>
														<Form.Control
															placeholder="ex. University of California, Grateex"
															className={errors.university && 'is-invalid'}
															{...register('university', {required: true})}
														/>
														{errors.university &&
														<p className={'invalid-feedback'}>This field is required</p>}
													</Form.Group>
													<Form.Group className="my-4">
														<Form.Label>Your job or responsibility *</Form.Label>
														<Form.Control
															placeholder="Associate Professor"
															className={errors.job && 'is-invalid'}
															{...register('job', {required: true})}
														/>
														{errors.job &&
														<p className={'invalid-feedback'}>This field is required</p>}
													</Form.Group>
												</>
											)}
											<hr/>
											<label className="d-block">
												<input
													type="radio"
													className="me-2"
													name="who"
													value={2}
													defaultChecked={radioChoose === 2}
													onClick={() => setRadioChoose(2)}
													{...register('who', {required: true})}
												/>
												My Company, organization, or client
											</label>
											{radioChoose === 2 && (
												<>
													<Form.Group className="mt-4">
														<Form.Label>Your legal name (first name, last name)
															*</Form.Label>
														<Form.Control
															placeholder="John Q. Sample"
															className={errors.name && 'is-invalid'}
															{...register('name', {required: true})}
														/>
														{errors.name &&
														<p className={'invalid-feedback'}>This field is required</p>}
													</Form.Group>
													<Form.Group className="mt-4">
														<Form.Label>Your University/Institution/Organization affliation
															*</Form.Label>
														<Form.Control
															placeholder="ex. University of California, Grateex"
															className={errors.university && 'is-invalid'}
															{...register('university', {required: true})}
														/>
														{errors.university &&
														<p className={'invalid-feedback'}>This field is required</p>}
													</Form.Group>
													<Form.Group className="my-4">
														<Form.Label>Your relationship with your company, organization,
															or client
															*</Form.Label>
														<Form.Control
															placeholder="Associate Professor"
															className={errors.job && 'is-invalid'}
															{...register('job', {required: true})}
														/>
														{errors.job &&
														<p className={'invalid-feedback'}>This field is required</p>}
													</Form.Group>
												</>
											)}
											<hr/>
											<label className="d-block" onClick={handleShowNotice}>
												<input type="radio" className="me-2" name="who"/>
												Another copyright owner
											</label>
										</Form.Group>
										{errors.who &&
										<p className={'invalid-feedback'}>This radio is required</p>}
									</Col>
									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<h5>2. Description of the infringed work</h5>
										<Form.Group>
											<Form.Label>Grateex URL of infringing material *</Form.Label>
											<Form.Control
												placeholder="https://www.grateex.com/app/#####/TITLE-OF-DOCUMENT/"
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
											<Form.Label>Official/original titles of the copyrighted material
												*</Form.Label>
											<Form.Control
												placeholder="e.g. ECON 101 or TITLE OF THE CONTENT"
												className={errors.titles && 'is-invalid'}
												{...register('titles', {required: true})}
											/>
											{errors.titles &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>
										<Form.Group className="mt-4">
											<Form.Label className={errors.type_of_content && 'is-invalid'}>Type of
												content *</Form.Label>
											<Form.Select
												{...register('type_of_content', {required: true})}
											>
												{typeOfContent.map((type) => {
													return (
														<option value={type} key={type}>{type}</option>
													)
												})}
											</Form.Select>
										</Form.Group>
									</Col>
									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<h5>3. Provide your contact information</h5>
										<p>Your information is kept strictly confidential (except under a subpoena) and
											is required to process your claim.
											Please note, under a counter-notification, your request and the information
											including your full legal name and email address may be provided to the
											uploader.</p>
										<hr/>
										<h5>Address</h5>
										<Form.Group className="mt-4">
											<Form.Label>Street *</Form.Label>
											<Form.Control
												placeholder="123 Main St."
												className={errors.street && 'is-invalid'}
												{...register('street', {required: true})}
											/>
											{errors.street &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>
										<Form.Group className="mt-4">
											<Form.Label>City *</Form.Label>
											<Form.Control
												placeholder="San Francisco"
												className={errors.city && 'is-invalid'}
												{...register('city', {required: true})}
											/>
											{errors.city &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>
										<Form.Group className="mt-4">
											<Form.Label>State or Province *</Form.Label>
											<Form.Control
												placeholder="CA"
												className={errors.state && 'is-invalid'}
												{...register('state', {required: true})}
											/>
											{errors.state &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>
										<Form.Group className="mt-4">
											<Form.Label>Zipcode *</Form.Label>
											<Form.Control
												placeholder="94110"
												className={errors.zipcode && 'is-invalid'}
												{...register('zipcode', {required: true})}
											/>
											{errors.zipcode &&
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
											<h5>Phone number *</h5>
											<Form.Control
												placeholder="555-555-5555"
												className={errors.phone && 'is-invalid'}
												{...register('phone', {required: true})}
											/>
											{errors.phone &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>
										<Form.Group className="mt-4">
											<h5>Email address *</h5>
											<Form.Control
												placeholder="account@mail.com"
												className={errors.email && 'is-invalid'}
												{...register('email', {required: true})}
											/>
											{errors.email &&
											<p className={'invalid-feedback'}>This field is required</p>}
										</Form.Group>
									</Col>
									<Col xs={12} className="mt-4 border p-3 p-xl-5 ls">
										<h5>4. By checking the following boxes, I state that... *</h5>
										<Form.Group className="mt-4">
											<label className={'d-block' + errors.believe_1 && 'is-invalid'}>
												<input type="checkbox" className="me-2"
													   {...register('believe_1', {required: true})}
												/>
												I have a good faith belief that use of the material in the manner
												complained of is not authorized by the copyright owner, its agent, or
												the law.
											</label>
											{errors.believe_1 &&
											<p className={'invalid-feedback'}>This checkbox is required</p>}
											<hr/>
										</Form.Group>
										<Form.Group className="mt-4">
											<label className={'d-block' + errors.believe_2 && 'is-invalid'}>
												<input type="checkbox" className="me-2"
													{...register('believe_2', {required: true})}
												/>
												This notification is accurate.
											</label>
											{errors.believe_2 &&
											<p className={'invalid-feedback'}>This checkbox is required</p>}
											<hr/>
										</Form.Group>
										<Form.Group className="mt-4">
											<label className={'d-block' + errors.believe_3 && 'is-invalid'}>
												<input type="checkbox" className="me-2"
													{...register('believe_3', {required: true})}
												/>
												Under Penalty of Perjury, I am authorized to act on behalf of the owner
												of an exclusive right that is allegedly infringed.
											</label>
											{errors.believe_3 &&
											<p className={'invalid-feedback'}>This checkbox is required</p>}
											<hr/>
										</Form.Group>
										<Form.Group className="mt-4">
											<label className={'d-block' + errors.believe_4 && 'is-invalid'}>
												<input type="checkbox" className="me-2"
													{...register('believe_4', {required: true})}
												/>
												I acknowledge that under Section 512(f) of the DMCA any person who
												knowingly materially misrepresents that material or activity is
												infringing may be subject to liability for damages.
											</label>
											{errors.believe_4 &&
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

export default CopyrightInfringement;
