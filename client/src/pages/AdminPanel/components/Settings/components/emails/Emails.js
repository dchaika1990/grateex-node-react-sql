import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import {getAdminsEmails} from "@services/userAPI";
import Loading from "@components/Loading";
import EmailChangeComponent from "@pages/AdminPanel/components/Settings/components/emails/EmailChangeComponent";

const Emails = () => {
	const [emails, setEmails] = useState()
	const [fetching, setFetching] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAdminsEmails()
			setEmails(data[0])
		}

		fetchData().then(() => {
			setFetching(false)
		})
	}, [])

	return (
		<>
			{fetching ? (
				<Loading />
			) : (
				<Row>
					<Col className="mb-3" xs={12}>
						<h2>Setting up emails</h2>
					</Col>
					<Col lg={6} className="mb-3">
						<div className="rounded shadow p-3 p-xl-5">
							<EmailChangeComponent
								header="Email for abusive messages"
								registerKey="emailAbusive"
								oldEmail={emails.emailAbusive}
								setEmails={setEmails}
							/>
						</div>
					</Col>
					<Col lg={6} className="mb-3">
						<div className="rounded shadow p-3 p-xl-5">
							<EmailChangeComponent
								header="Email for new registered users"
								registerKey="emailRegistered"
								oldEmail={emails.emailRegistered}
								setEmails={setEmails}
							/>
						</div>
					</Col>
				</Row>
			)}
		</>
	);
};

export default Emails;
