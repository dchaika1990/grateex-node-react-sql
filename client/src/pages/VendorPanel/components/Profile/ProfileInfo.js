import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {VENDOR_PAGE} from "@/utils/consts";
import {useDispatch} from "react-redux";
import {isEditing} from "@/actions/user";

const ProfileInfo = ({user}) => {
	const dispatch = useDispatch()

	function createMarkup() {
		return {__html: user.userInfo.bio};
	}

	return (
		<section className="profile py-5">
			<Container>
				<Row>
					<Col xs={12} className="mb-5 text-end">
						<Button  onClick={() => {
							dispatch(isEditing(true))
						}}>
							Edit
						</Button>
						<Button as={Link} to={VENDOR_PAGE + '/' + user.nickName}  variant="primary">
							Preview my public profile
						</Button>
					</Col>
					<Col md={4} className="mb-5">
						<div className="profile-img">
							<img src={process.env.REACT_APP_API_URL + user.userInfo?.avatarImg}
								 alt="img"/>
						</div>
						<div className="profile-content mt-3 text-center">
							<h3><span>{user.firstName} {user.lastName}</span></h3>
							<h4><span>{user.nickName}</span></h4>
						</div>
					</Col>
					<Col md={8}>
						<div className="profile-content ls shadow rounded p-lg-5 p-3">
							{user.school && (
								<>
									<h4>School</h4>
									<p>
										{user.school.label}
									</p>
									<div className="mb-3"/>
								</>
							)}
                            {user.cats.length !== 0 && user.cats.length !== 'undefined' && (
								<>
									<h4>Subjects</h4>
									<ul>
										{user.cats.map((cat) => (
											<li key={cat.id}>
												{cat.label}
											</li>
										))}
									</ul>
									<div className="mb-3"/>
								</>
							)}

							{user.userInfo.education && (
								<>
									<h4>Education</h4>
									<p>
										{user.userInfo.education}
									</p>
									<div className="mb-3"/>
								</>
							)}
							{user.userInfo.work_experience && (
								<>
									<h4>Classes taught</h4>
									<p>
										{user.userInfo.work_experience}
									</p>
									<div className="mb-3"/>
								</>
							)}
							
							<h4>My contacts:</h4>
							<p>
								{user.userInfo.personal_web_site && (
									<>
										<span>My website: </span>
										<a rel="noreferrer" target="_blank" className="link-primary" href={user.userInfo.personal_web_site}>{user.userInfo.personal_web_site}</a>
									</>
								)}
							</p>
							
							<p>
								{user.userInfo.personal_email && (
									<>
										<span>My personal email: </span>
										<a rel="noreferrer" target="_blank" className="link-primary" href={user.userInfo.personal_email}>{user.userInfo.personal_email}</a>
									</>
								)}
							</p>
							<ul className="list-unstyled d-flex">
								{user.userInfo.git_hub && (
									<li>
										<a rel="noreferrer" target="_blank" href={user.userInfo.git_hub}><i className="fa fa-github fs-4"/></a>
									</li>
								)}
								{user.userInfo.twitter && (
									<li>
										<a rel="noreferrer"  target="_blank" className="ms-3" href={user.userInfo.twitter}><i className="fa fa-twitter-square fs-4"/></a>
									</li>
								)}
								{user.userInfo.linkedin && (
									<li>
										<a rel="noreferrer"  target="_blank" className=" ms-3" href={user.userInfo.linkedin}><i className="fa fa-linkedin-square fs-4"/></a>
									</li>
								)}
							</ul>
							{user.userInfo.bio && (
								<>
									<h4>Biography</h4>
									<div dangerouslySetInnerHTML={createMarkup()}/>
								</>
							)}
							{user.userInfo.awards && (
								<>
									<h4>Awards</h4>
									<p>
										{user.userInfo.awards}
									</p>
									<div className="mb-3"/>
								</>
							)}
						</div>
					</Col>
			
				</Row>

			</Container>
		</section>
	);
};

export default ProfileInfo;
