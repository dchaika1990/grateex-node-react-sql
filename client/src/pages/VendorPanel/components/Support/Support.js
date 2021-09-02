import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import ModalComponent from "@pages/VendorPanel/components/Support/ModalComponent";
import ContactForm from "@pages/VendorPanel/components/Support/ContactForm";

const Support = () => {
	const [showModal, setShowModal] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const handleShow = () => setShowModal(true);

	return (
		<>
			<ModalComponent showModal={showModal} setShowModal={setShowModal}/>
			<section className="py-5">
				<Container>
					<Row>
						<Col xs={12} className="mb-3">
							<p>Answers to most common questions can be found <a rel="noreferrer"
																				target="_blank"
																				href="https://grateex.com/blog/faq/"
																				className="link-primary">here</a>. If
								you have any
								additional questions or concerns please send us email directly to <a
									className="link-primary" href="mailto:contact@grateex.com">contact@grateex.com</a>.
								Our team reads all the emails and we will respond within 24 hours. Thank you!</p>
						</Col>
						<Col xs={12} className="mb-3">
							<h4>Submit a takedown notice</h4>
							<p>We are dedicated to protecting your intellectual property. If someone uploads
								copyright-infringing materials to Grateex, they are violating our <a rel="noreferrer"
																									 target="_blank"
																									 href="https://grateex.com/blog/terms-of-use/"
																									 className="link-primary">Terms
									of Use</a>. If you
								believe that someone has posted your copyright-protected work without your permission,
								please use this form to submit a DMCA-compliant takedown request.
							</p>
							<Button className="mt-3" onClick={handleShow} variant="success">Submit Takedown
								Notice</Button>
							<hr className="mt-5"/>
						</Col>
						<Col xs={12}>
							<h4>Contact us</h4>
							<p>If you have any questions please don’t hesitate to contact us and we will get back to you
								as soon as possible.
							</p>
							<Button
								onClick={() => setShowForm(!showForm)}
								className="mt-3"
								variant={!showForm ? 'success' : 'dark'}
							>{!showForm ? 'Contact Us' : 'Close form'}</Button>

							{showForm && <ContactForm setShowForm={setShowForm}/>}
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};

export default Support;
