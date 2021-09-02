import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {addSchool, deleteSchool, editSchool, getSchools} from "@services/schoolAPI";
import Loading from "@components/Loading";
import SchoolItem from "@pages/AdminPanel/components/Settings/components/schools/schoolItem";
import {toast} from "react-toastify";

const Schools = () => {
	const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm();
	const [fetching, setFetching] = useState(true)
	const [items, setItems] = useState([])
	const [editItem, setEditItem] = useState(null)
	const [isEdit, setIsEdit] = useState(false)
	const [showModal, setShowModal] = useState(false);

	const [deletedItem, setDeletedItem] = useState({id: '', label: ''});


	useEffect(() => {
		const fetchData = async () => {
			const schools = await getSchools()
			setItems(schools)
		}

		fetchData().then(() => {
			setFetching(false)
		})
	}, [])


	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const deleteItem = () => {
		try {
			deleteSchool(deletedItem.id).then(res => {
				setItems(res)
				toast.success('School deleted')
				handleClose()
			})
		} catch (e) {
			toast.error(e.response?.data?.message)
		}
	}

	const deleteModalHandler = (id, label) => {
		setDeletedItem({id, label})
		handleShow()
	}

	const editHandler = (item) => {
		setValue('schoolLabel', item.label)
		setIsEdit(true)
		setEditItem(item.id)
	}

	const cancelEditHandler = () => {
		setEditItem(null)
		setIsEdit(false)
		reset({schoolLabel: ''})
	}

	const addNewSchool = (data) => {
		try {
			if (isEdit) {
				return editSchool({id: editItem, label: data.schoolLabel}).then(res => {
					setItems(res)
					setIsEdit(false)
					setEditItem(null)
					reset({schoolLabel: ''})
					toast.success('School edited')
				})
			}

			addSchool(data).then(res => {
				setItems(res)
				reset({schoolLabel: ''})
				toast.success('School added')
			})
		} catch (e) {
			toast.error(e.response?.data?.message)
		}
	}

	return (
		<>
			{fetching ? (
				<Loading />
			) : (
				<>
					<Modal show={showModal} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Are you sure you want to delete the
								school <strong>{deletedItem.label}</strong> ?</Modal.Title>
						</Modal.Header>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="danger" onClick={deleteItem}>
								Delete
							</Button>
						</Modal.Footer>
					</Modal>
					<Row>
						<Col md={4} className="mb-3">
							<div className="sticky-md-top ls rounded shadow p-3 p-xl-5">
								<h2>Add New School</h2>
								<Form onSubmit={handleSubmit(addNewSchool)}>
									<Form.Group className="mb-3">
										<Form.Control
											className={errors.schoolLabel && 'is-invalid'}
											type="text"
											placeholder="Enter new School" {...register('schoolLabel', {required: true, min: 5})}/>
										{errors?.schoolLabel?.type === "required" &&
										<p className='invalid-feedback'>This field is required</p>}
										{errors?.schoolLabel?.type === "min" &&
										<p className='invalid-feedback'>Length must be more than 5 letters</p>}
									</Form.Group>
									<Button variant="primary" type="submit">
										{isEdit ? 'Edit the school' : 'Add new school'}
									</Button>
								</Form>
							</div>
						</Col>
						<Col md={8}>
							<Table bordered hover responsive className="category-table">
								<thead>
								<tr>
									<th>Name</th>
									<th className="max-width-300">Actions</th>
								</tr>
								</thead>
								<tbody>
								<SchoolItem
									editHandler={editHandler}
									isEdit={isEdit}
									deleteItem={deleteModalHandler}
									items={items}
									cancelEditHandler={cancelEditHandler}
								/>
								</tbody>
							</Table>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default Schools;
