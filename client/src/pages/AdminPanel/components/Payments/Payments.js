import React, {useMemo, useRef, useState} from 'react';
import {Col, Container, Row, Button, Modal, Form, ModalBody} from "react-bootstrap";
import {toast} from "react-toastify";
import TableOrders from "@pages/AdminPanel/components/Payments/TableOrders";
import 'react-select-me/lib/ReactSelectMe.css';
import {useForm} from "react-hook-form";


const Payments = () => {
	const [orders, setOrders] = useState([
		{
			date: '7/29/2021',
			type: 'Sale',
			nickName: 'MrsNathan',
			orderId: 'asdasd5asd46as5d6as4d6a4sd6',
			amount: '423',
			balance: '4182',
		},
		{
			date: '8/29/2021',
			type: 'Refund',
			nickName: 'Joey Udovich',
			orderId: '7c6vx8c6vfsklfmdsfs54',
			amount: '7985',
			balance: '4605',
		},
		{
			date: '8/29/2021',
			type: 'Sale',
			nickName: 'Exploring Fifth',
			orderId: 'c78v6bc78v6bcv876',
			amount: '120',
			balance: '3380',
		},
		{
			date: '7/22/2021',
			type: 'Sale',
			nickName: 'Chalk and Apples',
			orderId: '56fd7s6f7s56f78',
			amount: '3270',
			balance: '3500',
		},
		{
			date: '7/25/2021',
			type: 'Refund',
			nickName: 'Sense of Wonder',
			orderId: 'ad6sf856sf75s7sd6',
			amount: '270',
			balance: '500',
		}
	])
	const [users, setUsers] = useState([
		{id: 1, nickName: 'MrsNathan',},
		{id: 2, nickName: 'Joey Udovich',},
		{id: 3, nickName: 'Exploring Fifth',},
		{id: 4, nickName: 'Chalk and Apples',},
		{id: 5, nickName: 'Lense of Wonder',},
		{id: 6, nickName: 'Lense of Kionder',},
	])
	const [usersFilter, setUsersFilter] = useState('')
	const [customValue, setCustomValue] = useState({id: '', nickName: ''})
	const [customValueShow, setCustomValueShow] = useState(false)
	const [showModal, setShowModal] = useState(false);

	const filterUser = useMemo(() => {
		if (usersFilter.length > 0) {
			return [...users].filter(o => o.nickName.toLowerCase().indexOf(usersFilter) > -1)
		}
		return users
	}, [users, usersFilter])

	const dateOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	};
	const [payment, setPayment] = useState({
		date: new Date().toLocaleString("en-US", dateOptions),
		type: "Refund",
		nickName: '',
		orderId: '',
		amount: '',
		balance: ''
	})

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const changeAmount = (e) => {
		setPayment(prevState => {
			return {
				...prevState,
				amount: e.target.value,
				balance: +orders[0].balance - +e.target.value
			}
		})
	}

	const chooseOption = (e) => {
		setCustomValue({
			id: e.target.getAttribute('data-value'),
			nickName: e.target.innerText
		})
		setPayment(prevState => {
			return {
				...prevState,
				nickName: e.target.innerText,
				orderId: String(Date.now())
			}
		})
		setUsersFilter('')
		setCustomValueShow(false)
	}

	const makePayment = () => {
		setOrders([payment, ...orders])
		setTimeout(() => {
			setPayment(prevState => {
				return {...prevState, amount: '', nickName: ''}
			})
		}, 500)
		toast.success('The transaction was successful')
		handleClose()
	}

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Form className="m-0">
					<Modal.Header closeButton>
						<Modal.Title>Make a payment</Modal.Title>
					</Modal.Header>
					<ModalBody>
						<Form.Group>
							<div className="custom-select">
								<div className="position-relative">
									<Form.Control
										autoComplete='off'
										placeholder='Choose school'
										value={customValue.nickName}
										onChange={event => {}}
										onClick={e => setCustomValueShow(true)}
									/>
									{customValueShow && (
										<div className="custom-select-input">
											<Form.Control
												placeholder="Search school..."
												className="mb-2"
												onChange={e => {
													setUsersFilter(e.target.value)
												}}
											/>
											<div className="custom-select-options">
												{filterUser.map(user => {
													return (<span onClick={chooseOption} data-value={user.id}
																  key={user.id}>{user.nickName}</span>)
												})}
											</div>
										</div>
									)}
								</div>

								<Form.Text className="text-muted">Choose Your school.</Form.Text>
							</div>
						</Form.Group>
						<Form.Group className="mt-3">
							<Form.Control
								type="number"
								name="price"
								placeholder="Write down amount"
								onChange={changeAmount}
							/>
						</Form.Group>
					</ModalBody>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>Close</Button>
						<Button
							disabled={!payment.nickName || !payment.amount}
							variant="success" onClick={makePayment}>Make</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			<section className="py-5">
				<Container>
					<Row>
						<Col lg={6}>
							<h3 className="mb-3">Payments</h3>
						</Col>
						<Col className="text-md-end" lg={6}>
							<Button className="pull-right" onClick={handleShow} variant="success">Make payment</Button>
						</Col>
						<Col xs={12}>
							<div className="ls p-5 rounded shadow">
								<TableOrders orders={orders}/>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};

export default Payments;
