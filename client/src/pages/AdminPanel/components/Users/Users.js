import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Col, Container, Form, Modal, Pagination, Row, Table} from "react-bootstrap";
import {CSVLink} from "react-csv";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import {ADMIN_ROUTE, REGISTRATION_ROUTE} from "@/utils/consts";
import {activateUser, deActivateUser, deleteUser, getAllUsers, getOneUser} from "@services/userAPI";
import Loading from "@components/Loading";
import useDebounce from "@/hooks/useDebounce";
import "react-datepicker/dist/react-datepicker.css";


const Users = () => {
	const [fetching, setFetching] = useState(true)
	const [showModal, setShowModal] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [statusSelect, setStatusSelect] = useState([0, 1]);
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');

	const [sort, setSort] = useState(null);
	
	const limit = 10
	const [pageUsers, setPageUsers] = useState(1)
	const [totalCount, setTotalCount] = useState(0)
	
	const history = useHistory()
	const [deletedUser, setDeletedUser] = useState({
		activationLink: '',
		nickName: ''
	});
	const dateOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	};
	const [users, setUsers] = useState([])
	const [usersInfoCSV, setUsersInfoCSV] = useState([])

	const debouncedSearchTerm = useDebounce(searchInput, 500);

	useEffect(() => {
		const searchFetch = async () => {
			let allUsers = await getAllUsers(debouncedSearchTerm.toLowerCase(), statusSelect, fromDate, toDate, pageUsers, limit, sort)
			setUsers(allUsers[0].rows)
			setTotalCount(allUsers[0].count)
			setUsersInfoCSV(allUsers[1])
		}
		searchFetch().then(() => {
			setFetching(false)
		})
	}, [debouncedSearchTerm, statusSelect, fromDate, toDate, pageUsers, sort])


	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const activateUserHandler = (link, index) => {
		activateUser(link).then(res => {
			let newArr = [...users];
			newArr[index].isActivated = 1
			setUsers(newArr)
			toast.info(`User ${newArr[index].nickName} is activated`)
		})

	}

	const deactivateUserHandler = (link, index) => {
		deActivateUser(link).then(res => {
			let newArr = [...users];
			newArr[index].isActivated = 0
			setUsers(newArr)
			toast.info(`User ${newArr[index].nickName} is deactivated`)
		})
	}

	const editUserHandler = async (nickname) => {
		const user = await getOneUser(nickname)
		history.push(ADMIN_ROUTE + `/users/${nickname}/`, {user})
	}

	const deleteUserHandler = (link, nickname) => {
		setDeletedUser(prevState => ({
			...prevState,
			activationLink: link,
			nickName: nickname
		}));
		handleShow();
	}

	const deleteModalUserHandler = () => {
		deleteUser(deletedUser.activationLink).then(res => {
			const filteredUsers = users.filter(user => user.activationLink !== deletedUser.activationLink)
			setUsers(filteredUsers)
			handleClose()
			toast.info(`User ${deletedUser.nickName} is deleted`)
		})
	}
	
	const pageUsersCount = Math.ceil(totalCount / limit)
	const pages = []

	for (let i = 0; i < pageUsersCount; i++) {
		pages.push(i + 1)
	}

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete the
						user <strong>{deletedUser.nickName}</strong> ?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>Close</Button>
					<Button variant="danger" onClick={e => deleteModalUserHandler()}>Delete</Button>
				</Modal.Footer>
			</Modal>
			{fetching ? (
				<Loading/>
			) : (
				<>
					<section className="py-5">
						<Container>
							<Row>
								<Col lg={6}>
									<h3>All Users</h3>
								</Col>
								<Col className="text-lg-end mt-3 mt-lg-0" lg={6}>
									<CSVLink className="btn btn-mainColor" data={usersInfoCSV}>Export Information</CSVLink>
									<Button onClick={() => history.push(REGISTRATION_ROUTE)}>Add new user</Button>
								</Col>
								<Col className="mb-3 mt-3">
									<h4>Search Users</h4>
									<Form>
										<Row>
											<Col lg="4">
												<Form.Group>
													<Form.Control
														type="text"
														placeholder="Search users by email or username"
														onChange={(e) => setSearchInput(e.target.value)}/>
												</Form.Group>
											</Col>
											<Col lg="4">
												<Form.Group>
													<Form.Select
														defaultValue="Choose filter users..."
														onChange={event => setStatusSelect(event.target.value)}>
														<option value={''}>Choose status</option>
														<option value={1}>Approved</option>
														<option value={0}>Pending</option>
													</Form.Select>
												</Form.Group>
											</Col>
											<Col lg="4">
												<Form.Group>
													<Form.Select
														defaultValue=""
														onChange={event => setSort(event.target.value)}>
														<option value={''}>Sort by registration date</option>
														<option value={'newest'}>Newest</option>
														<option value={'oldest'}>Oldest</option>
													</Form.Select>
												</Form.Group>
											</Col>
											{/*<Col lg="2">*/}
											{/*	<DatePicker*/}
											{/*		placeholderText="From registration date"*/}
											{/*		selected={fromDate}*/}
											{/*		onChange={(date) => {*/}
											{/*			if (date === null) return setFromDate('')*/}
											{/*			setFromDate(date)*/}
											{/*		}}*/}
											{/*	/>*/}
											{/*</Col>*/}
											{/*<Col lg="2">*/}
											{/*	<DatePicker*/}
											{/*		placeholderText="To registration date"*/}
											{/*		selected={toDate}*/}
											{/*		onChange={(date) => {*/}
											{/*			if (date === null) return setToDate('')*/}
											{/*			setToDate(date)*/}
											{/*		}}*/}
											{/*	/>*/}
											{/*</Col>*/}
										</Row>
									</Form>
								</Col>
								<Col xs={12}>
									<hr/>
									<div className="ls p-5 rounded shadow">
										<Table className="users_table" bordered hover responsive>
											<thead>
											<tr>
												<th>#</th>
												<th className="date">Date of Registration</th>
												<th>Email</th>
												<th>Username</th>
												<th>First Name</th>
												<th>Last Name</th>
												<th>Status</th>
												<th className="actions">Actions</th>
											</tr>
											</thead>
											<tbody>
											{!users.length && (
												<tr>
													<td colSpan="9">
														<p className="text-center">
															You dont have Users
														</p>
													</td>
												</tr>
											)}
											{
												users.map((user, i) => (
													<tr key={user.activationLink}>
														<td>{i + 1}</td>
														<td>{new Date(user.createdAt).toLocaleString("en-US", dateOptions)}</td>
														<td>{user.email}</td>
														<td>{user.nickName}</td>
														<td>{user.firstName}</td>
														<td>{user.lastName}</td>
														<td>
															{user.isActivated ? (
																<><span className="approved"/>Approved</>
															) : (
																<><span className="pending"/>Pending</>
															)}
														</td>
														<td>
															<ButtonGroup>
																{user.isActivated ? (
																	<Button variant={''}
																			onClick={() => deactivateUserHandler(user.activationLink, i)}
																			className="btn-mainColor">
																		Deactivate
																	</Button>
																) : (
																	<Button
																		onClick={() => activateUserHandler(user.activationLink, i)}
																		variant={''} className="btn-mainColor">
																		Activate
																	</Button>
																)}
																<Button onClick={() => editUserHandler(user.nickName)}>
																	Edit
																</Button>
																<Button
																	onClick={() => deleteUserHandler(user.activationLink, user.nickName)}
																	variant={"danger"}>
																	Delete
																</Button>
															</ButtonGroup>
														</td>
													</tr>
												))
											}
											</tbody>
										</Table>
										<Pagination className="mt-3">
											{pages.length > 1 && pages.map(page =>
												<Pagination.Item
													active={pageUsers === page}
													key={page}
													onClick={() => setPageUsers(page)}
												>
													{page}
												</Pagination.Item>
											)}
										</Pagination>
									</div>
								</Col>
							</Row>
						</Container>
					</section>
				</>
			)}
		</>
	);
};

export default Users;
