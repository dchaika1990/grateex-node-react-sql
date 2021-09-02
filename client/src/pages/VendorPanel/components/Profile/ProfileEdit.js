import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import {saveUserSettings} from "@/services/userAPI";
import {isEditing, updateUser} from "@/actions/user";
import {useDispatch, useSelector} from "react-redux";
import 'react-dropdown-tree-select/dist/styles.css'
import {toast} from "react-toastify";
import {ADMIN_ROUTE, VENDOR_PANEL} from "@/utils/consts";
import {useHistory} from "react-router-dom";
import {Editor} from "react-draft-wysiwyg";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import Loading from "@components/Loading";
import TreeSelect from "@components/TreeSelect/TreeSelect";

const ProfileEdit = ({user, location}) => {
	const dispatch = useDispatch();
	const history = useHistory()
	const isEditingUser = useSelector(state => state.user.isEditing)
	const {schools} = useSelector(state => state.user)
	const catsReducer = useSelector(state => state.categories)
	const {categoriesList} = useSelector(state => state.categories)

	if (location) {
		user = location.state.user
	}

	/////////////////FOR AVATAR
	const [avatar, setAvatar] = useState()
	const [featured, setFeatured] = useState()
	const [avatarURL, setavatarURL] = useState(process.env.REACT_APP_API_URL + user.userInfo.avatarImg)
	const [featuredURL, setFeaturedURL] = useState(process.env.REACT_APP_API_URL + user.userInfo.featuredImg)
	//------------------------------------------------------//
	const [categories, setCategories] = useState([])
	const [checkedArr, setCheckedArr] = useState([])
	const [searchInput, setSearchInput] = useState('')
	//------------------------------------------------------/
	const [fetch, setFetch] = useState(true)
	const [cleanAvatar, setCleanAvatar] = useState(false)

	const [settings, setSettings] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		nickName: user.nickName,
		schoolId: +user.schoolId,
		education: user.userInfo.education,
		personal_email: user.userInfo.personal_email,
		personal_web_site: user.userInfo.personal_web_site,
		linkedin: user.userInfo.linkedin,
		git_hub: user.userInfo.git_hub,
		twitter: user.userInfo.twitter,
		awards: user.userInfo.awards,
		publications: user.userInfo.publications,
		work_experience: user.userInfo.work_experience,
		bio: EditorState.createWithContent(
			ContentState.createFromBlockArray(
				convertFromHTML(user.userInfo.bio)
			)),
		cats: '',
		isTrusted: user.isTrusted
	})

	useEffect(() => {
		return () => {
			if (history.action === "POP") {
				location
					? history.push(ADMIN_ROUTE + '/users')
					: history.push(VENDOR_PANEL + '/profile')
				dispatch(isEditing(false))
			}
		};
	}, [history])

	useEffect(() => {
		const effect = async () => {
			try {
				setCategories(catsReducer.categories)

				if (user.cats.length) {
					user.cats.forEach(cat => {
						setCheckedArr(prevState => ([...prevState, cat.id]))
					})
				}
			} catch (e) {
				toast.error(e.response?.data?.message)
			}
		}

		effect().then(() => {
			setFetch(false)
		})

	}, [user])

	const saveAvatar = async (e) => {
		setAvatar(e.target.files[0]);
		setavatarURL(URL.createObjectURL(e.target.files[0]))
	};

	// ////////for checkbox onChange
	const saveFeatured = async (e) => {
		setFeatured(e.target.files[0]);
		setFeaturedURL(URL.createObjectURL(e.target.files[0]))
	};
	//////////END for checkbox onChange

	const clearAvatar = () => {
		setCleanAvatar(true)
		setavatarURL(process.env.REACT_APP_API_URL + 'placeholder.png')
	}

	////////for multiselect
	const onChange = (currentNode, selectedNodes) => {
		settings.cats = ''
		let str = ''
		selectedNodes.forEach((item, i) => {
			str += selectedNodes.length - 1 === i ? item.id : item.id + ','
		})
		settings.cats = str
	}
	////////END for multiselect

	const selectChange = (e) => {
		setSettings(prevState => ({
			...prevState,
			schoolId: +e.target.value
		}))
	}

	const saveChangesHandler = async (e) => {
		const formData = new FormData();
		if (avatar) {
			formData.append("file", avatar);
		}
		if (featured) {
			formData.append("featured", featured);
		}
		formData.append('cleanAvatar', String(cleanAvatar))
		settings.cats = checkedArr.join(',')

		Object.keys(settings).forEach(data => {
			if (data === 'bio') {
				return formData.append(data, draftToHtml(convertToRaw(settings[data].getCurrentContent())));
			}
			formData.append(data, settings[data]);
		})
		if (location) {
			formData.append('isAdmin', String(true))
			formData.append('userID', user.id)
		}

		saveUserSettings(formData).then(res => {
			dispatch(updateUser({...res}))
			toast.success('Changes saved');
			if (location) {
				history.push(ADMIN_ROUTE + '/users/')
			}
		}).catch(e => {
			toast.error('Changes not saved');
		})
		dispatch(isEditing(false))
	}

	const cancelEdit = () => {
		if (isEditingUser) {
			dispatch(isEditing(false))
		} else {
			history.push(ADMIN_ROUTE + '/users/')
		}
	}

	return (
		<>
			{fetch ? (
				<Loading/>
			) : (
				<>
					<section className="py-5 vendor-settings">
						<Container>
							<Row>
								<Col lg={4}>
									<div className="shadow p-5 rounded ls text-center">
										<h5>Choose a picture</h5>
										<div className="avatar avatar-with-clear mx-auto">
											<i onClick={e => clearAvatar()} className="fa fa-close"/>
											<Image src={avatarURL}/>
										</div>
										<Form className="mt-4">
											<Form.Group as={Row} controlId="file" className="mb-3">
												<Col>
													<Form.Control type="file" name="file" onChange={saveAvatar}/>
												</Col>
											</Form.Group>
										</Form>
									</div>
								</Col>
								{/*<Col lg={4}>*/}
								{/*	<div className="shadow p-5 rounded">*/}
								{/*		<h5>Change Featured Image</h5>*/}
								{/*		<div className="avatar">*/}
								{/*			<Image src={featuredURL}/>*/}
								{/*		</div>*/}
								{/*		<Form>*/}
								{/*			<Form.Group as={Row} controlId="featured" className="mb-3">*/}
								{/*				<Col>*/}
								{/*					<Form.Label>Choose your featured Image</Form.Label>*/}
								{/*					<Form.Control type="file" name="featured" onChange={saveFeatured}/>*/}
								{/*				</Col>*/}
								{/*			</Form.Group>*/}
								{/*		</Form>*/}
								{/*	</div>*/}
								{/*</Col>*/}
								<Col lg={8}>
									<div className="shadow p-5 rounded ls">
										<h5>First name</h5>
										<Form.Group as={Row} controlId="firstName" className="mb-3">
											<Col>
												<Form.Control
													type="text"
													name="firstName"
													defaultValue={settings.firstName}
													onChange={(e) => setSettings(prevState => ({
														...prevState,
														firstName: e.target.value
													}))}/>
											</Col>
										</Form.Group>
										<h5>Last Name</h5>
										<Form.Group as={Row} controlId="lastname" className="mb-3">
											<Col>
												<Form.Control
													type="text"
													name="lastname"
													defaultValue={settings.lastName}
													onChange={(e) => setSettings(prevState => ({
														...prevState,
														lastName: e.target.value
													}))}/>
											</Col>
										</Form.Group>
										<h5>Username</h5>
										<Form.Group as={Row} controlId="email" className="mb-3">
											<Col>
												<Form.Control
													type="email"
													name="email"
													defaultValue={settings.nickName}
													onChange={(e) => setSettings(prevState => ({
														...prevState,
														nickName: e.target.value
													}))
													}/>
											</Col>
										</Form.Group>
										<Form.Group className="mb-3">
											<h5>Choose your teaching subject(s)</h5>
											<TreeSelect
												tags={true}
												multiple={true}
												checkedArr={checkedArr}
												setCheckedArr={setCheckedArr}
												arr={categories}
												list={categoriesList}
												setCategories={setCategories}
												searchInput={searchInput}
												setSearchInput={setSearchInput}/>
										</Form.Group>
										<Form.Group className="mb-3">
											<h5>Schools</h5>
											<Form.Select
												aria-label="school"
												defaultValue={settings.schoolId}
												onChange={selectChange}
											>
												{schools.map(school => {
													return (<option key={school.id}
																	value={school.id}>{school.label}</option>)
												})}
											</Form.Select>
										</Form.Group>
										<Form.Group as={Row} className="mb-3">
											<Col>
												<h5>My  personal web site</h5>
												<Form.Control
													type="text"
													name="personal_web_site"
													defaultValue={settings.personal_web_site}
													onChange={(e) => setSettings(prevState => ({
														...prevState,
														personal_web_site: e.target.value
													}))
													}/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} className="mb-3">
											<Col>
												<h5>My  personal email</h5>
												<Form.Control
													type="text"
													name="personal_web_site"
													defaultValue={settings.personal_email}
													onChange={(e) => setSettings(prevState => ({
														...prevState,
														personal_email: e.target.value
													}))
													}/>
							
											</Col>
										</Form.Group>
										<Form.Group as={Row} className="mb-3">
											<Col>
												<h5>My github account</h5>
												<Form.Control
													type="text"
													name="personal_web_site"
													defaultValue={settings.git_hub}
													onChange={(e) => setSettings(prevState => ({
														...prevState,
														git_hub: e.target.value
													}))
													}/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} className="mb-3">
											<Col>
												<h5>My twitter account</h5>
												<Form.Control
													type="text"
													name="personal_web_site"
													defaultValue={settings.twitter}
													onChange={(e) => setSettings(prevState => ({
														...prevState,
														twitter: e.target.value
													}))
													}/>
											</Col>
										</Form.Group>
										<Form.Group as={Row} className="mb-3">
											<Col>
												<h5>My linkedin account</h5>
												<Form.Control
													type="text"
													name="personal_web_site"
													defaultValue={settings.linkedin}
													onChange={(e) => setSettings(prevState => ({
														...prevState,
														linkedin: e.target.value
													}))
													}/>
											</Col>
										</Form.Group>
										{location && (
											<Form.Group>
												<Form.Check type="checkbox">
													<Form.Check.Input
														id="terms"
														checked={settings.isTrusted}
														className="me-2"
														type="checkbox"
														onChange={e => {
															setSettings(prevState => (
																{
																	...prevState,
																	isTrusted: !prevState.isTrusted
																}
															))
														}}
													/>
													<Form.Check.Label htmlFor="terms">Trusted user</Form.Check.Label>
												</Form.Check>
											</Form.Group>
										)}
									</div>
								</Col>
								{/*<Col lg={6} className="mt-5">*/}
								{/*	<div className="shadow p-5 rounded">*/}
								{/*		<h5>Change Your Educations</h5>*/}
								{/*		<Form.Control*/}
								{/*			as="textarea"*/}
								{/*			rows={3}*/}
								{/*			defaultValue={settings.education}*/}
								{/*			onChange={(e) => setSettings(prevState => ({*/}
								{/*				...prevState,*/}
								{/*				education: e.target.value*/}
								{/*			}))}/>*/}
								{/*	</div>*/}
								{/*</Col>*/}
								{/*<Col lg={6} className="mt-5">*/}
								{/*	<div className="shadow p-5 rounded">*/}
								{/*		<h5>Change Your Awards</h5>*/}
								{/*		<Form.Control*/}
								{/*			as="textarea"*/}
								{/*			rows={3}*/}
								{/*			defaultValue={settings.awards}*/}
								{/*			onChange={(e) => setSettings(prevState => ({*/}
								{/*				...prevState,*/}
								{/*				awards: e.target.value*/}
								{/*			}))}/>*/}
								{/*	</div>*/}
								{/*</Col>*/}
								{/*<Col lg={6} className="mt-5">*/}
								{/*	<div className="shadow p-5 rounded">*/}
								{/*		<h5>Change Your Publications</h5>*/}
								{/*		<Form.Control*/}
								{/*			as="textarea"*/}
								{/*			rows={3}*/}
								{/*			defaultValue={settings.publications}*/}
								{/*			onChange={(e) => setSettings(prevState => ({*/}
								{/*				...prevState,*/}
								{/*				publications: e.target.value*/}
								{/*			}))}/>*/}
								{/*	</div>*/}
								{/*</Col>*/}
								{/*<Col lg={6} className="mt-5">*/}
								{/*	<div className="shadow p-5 rounded">*/}
								{/*		<h5>Change Your Work Experience</h5>*/}
								{/*		<Form.Control*/}
								{/*			as="textarea"*/}
								{/*			rows={3}*/}
								{/*			defaultValue={settings.work_experience}*/}
								{/*			onChange={(e) => setSettings(prevState => ({*/}
								{/*				...prevState,*/}
								{/*				work_experience: e.target.value*/}
								{/*			}))}/>*/}
								{/*	</div>*/}
								{/*</Col>*/}
								<Col lg={12} className="mt-5">
									<div className="shadow p-5 rounded ls">
										<h5>Change Your Biography</h5>
										<Form.Group className="mt-3">
											<Editor
												initialEditorState={settings.bio}
												editorState={settings.bio}
												onEditorStateChange={(data) => {
													setSettings(prevState => ({...prevState, bio: data}))
												}}

											/>
										</Form.Group>
									</div>
								</Col>
								<Col className="mt-5" sm={12}>
									<Button onClick={saveChangesHandler}>
										Save
									</Button>

									<Button onClick={cancelEdit}>
										Cancel
									</Button>
								</Col>
							</Row>
						</Container>
					</section>
				</>
			)}
		</>
	);
};

export default ProfileEdit;
