import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import Loading from "@components/Loading";
import Products from "@components/Products";
import {getUserPage, sendEmailToVendor} from "@services/userAPI";
import {useSelector} from "react-redux";

const VendorPage = () => {
	const {nickname} = useParams()
	const [currentUser, setCurrentUser] = useState()
	const user = useSelector(state => state.user)
	const [show, setShow] = useState(false);
	
	const [msg, setMsg] = useState('')
	
	const [fetch, setFetch] = useState(true)
	
	useEffect(() => {
		const effect = async () => {
			try {
				const user = await getUserPage(nickname)
				setCurrentUser(user)
			} catch (e) {
				toast.error(e.response?.data?.message)
			}
		}
		effect().then(() => {
			setFetch(false)
		})
	}, [])
	function createMarkup() {
		return {__html: currentUser.userInfo.bio};
	
	}
	
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	const sendEmailHandler = async () => {
		handleClose()
		const data = await sendEmailToVendor(currentUser.email, user.currentUser.email, user.currentUser.nickName, msg)
		toast.info(data)
	}

	return (
		<>
			{fetch ?
				(
					<Loading/>
				) : (
					<>
						<section className="profile py-5">
							<Container>
								<Row>
									<Col md={4} className="mb-5">
										<div className="profile-img">
											<img src={process.env.REACT_APP_API_URL + currentUser.userInfo?.avatarImg}
												 alt="img"/>
										</div>
										<div className="profile-content mt-3 text-center">
											{currentUser.isPublic && (
												<h3><span>{currentUser.firstName} {currentUser.lastName}</span></h3>
											)}
											<h4><span>{currentUser.nickName}</span></h4>
										</div>
										<Button variant="primary" onClick={handleShow}>
											Email {currentUser.nickName}
										</Button>
										<Modal show={show} onHide={handleClose}>
											<Modal.Header closeButton>
												<Modal.Title>Send Email to {currentUser.nickName}</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<Form>
													<Form.Group className="mb-3" controlId="formBasicEmail">
														<Form.Label>Your email address</Form.Label>
														<Form.Control defaultValue={user.currentUser.email} type="email" placeholder="Enter email" disabled/>
													</Form.Group>
													<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
														<Form.Label>Example textarea</Form.Label>
														<Form.Control as="textarea" rows={3} onChange={(e)=> setMsg(e.target.value)}/>
													</Form.Group>
												</Form>
											</Modal.Body>
											<Modal.Footer>
												<Button variant="secondary" onClick={handleClose}>
													Close
												</Button>
												<Button variant="primary" onClick={sendEmailHandler}>
													Send
												</Button>
											</Modal.Footer>
										</Modal>
									</Col>
									<Col md={8}>
										<div className="profile-content ls shadow rounded p-lg-5 p-3">
											{currentUser.school && (
												<>
													<h4>School</h4>
													<p>{currentUser.school.label}</p>
													<div className="mb-3"/>
												</>
											)}
											{currentUser.cats.length !== 0 && (
												<>
													<h4>Subjects</h4>
													<ul>
														{currentUser.cats.map((cat) => (
															<li key={cat.id}>{cat.label}</li>
														))}
													</ul>
													<div className="mb-3"/>
												</>
											)}
											<h4>My contacts:</h4>
											{currentUser.userInfo.personal_web_site && (
												<p>
													<span>My website: </span>
													<a rel="noreferrer" target="_blank" className="link-primary"
													   href={currentUser.userInfo.personal_web_site}>{currentUser.userInfo.personal_web_site}</a>
												</p>
											)}

											{currentUser.userInfo.personal_email && (
												<p>
													<span>My personal email: </span>
													<a rel="noreferrer" target="_blank" className="link-primary"
													   href={currentUser.userInfo.personal_email}>{currentUser.userInfo.personal_email}</a>
												</p>
											)}
											<ul className="list-unstyled d-flex">
												{currentUser.userInfo.git_hub && (
													<li>
														<a rel="noreferrer" target="_blank"
														   href={currentUser.userInfo.git_hub}><i
															className="fa fa-github fs-4"/></a>
													</li>
												)}
												{currentUser.userInfo.twitter && (
													<li>
														<a rel="noreferrer" target="_blank" className="ms-3"
														   href={currentUser.userInfo.twitter}><i
															className="fa fa-twitter-square fs-4"/></a>
													</li>
												)}
												{currentUser.userInfo.linkedin && (
													<li>
														<a rel="noreferrer" target="_blank" className=" ms-3"
														   href={currentUser.userInfo.linkedin}><i
															className="fa fa-linkedin-square fs-4"/></a>
													</li>
												)}
											</ul>
											{currentUser.userInfo.bio && (
												<>
													<h4>Biography</h4>
													<div dangerouslySetInnerHTML={createMarkup()}/>
												</>
											)}
										</div>
									</Col>
								</Row>
							</Container>
						</section>
						{currentUser.products.length > 0 && (
							<section className="ls py-5">
								<Container>
									<Row>
										<Col>
											<h3 className="text-center color-main">All Author's Course's</h3>
										</Col>
									</Row>
									<Products user={currentUser.nickName} products={currentUser.products}/>
								</Container>
							</section>
						)}
					</>
				)
			}
		</>
	);
};

export default VendorPage;
