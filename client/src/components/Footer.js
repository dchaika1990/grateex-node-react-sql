import React from 'react';
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";

const Footer = () => {
    return (
        <>
            <footer className="page_footer ls py-3">
                <Container>
                    <Row>
                        <Col>
                            <Navbar>

                                <Navbar.Brand href="https://grateex.com/blog/">
                                    <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="logo"/>
                                </Navbar.Brand>
                                <Nav className="ms-auto me-auto">
                                    <Nav.Link href="https://grateex.com/blog/contacts/">Contact Us</Nav.Link>
                                    <Nav.Link href="https://grateex.com/blog/faq/">FAQ</Nav.Link>
                                    <Nav.Link href="https://grateex.com/blog/feedback/">Feedback</Nav.Link>
                                    <Nav.Link href="https://grateex.com/blog/copyright-policies/">Copyright
                                        Policies</Nav.Link>
                                    <Nav.Link href="https://grateex.com/blog/privacy-policy/">Privacy Policy</Nav.Link>
                                    <Nav.Link href="https://grateex.com/blog/terms-of-use/">Terms of Use</Nav.Link>
                                </Nav>
                                <div className="social-icons">
                                    <a href="http://twitter.com">
                                        <i className="fa fa-twitter"/>
                                    </a>
                                    <a className="ms-4" href="http://linkedin.com">
                                        <i className="fa fa-linkedin"/>
                                    </a>
                                </div>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
            </footer>
            <div className="page_copyright">

            </div>
        </>
    );
};

export default Footer;
