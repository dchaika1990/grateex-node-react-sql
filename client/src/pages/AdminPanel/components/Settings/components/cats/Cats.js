import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {addCategory, deleteCategory, editCategory, getCategories, getCategoriesByList} from "@services/categoryAPI";
import {toast} from "react-toastify";
import Loading from "@components/Loading";
import {Col, Modal, Row} from "react-bootstrap";
import TableCats from "@pages/AdminPanel/components/Settings/components/cats/TableCats";
import FormAddCat from "@pages/AdminPanel/components/Settings/components/cats/FormAddCat";
import ModalDelete from "@pages/AdminPanel/components/Settings/components/cats/ModalDelete";
import ModalEdit from "@pages/AdminPanel/components/Settings/components/cats/ModalEdit";

const Cats = () => {
	const {register, handleSubmit, formState: {errors}, reset} = useForm();
	const {
		register: register2,
		handleSubmit: handleSubmit2,
		formState: {errors: errors2},
		setValue: setValue2
	} = useForm();

	const [fetching, setFetching] = useState(true)
	const [categories, setCategories] = useState([])
	const [categoriesList, setCategoriesList] = useState([])
	const [categoriesListToEdit, setCategoriesListToEdit] = useState([])
	const [showModal, setShowModal] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [catEditId, setCatEditId] = useState(null);
	const [deletedCat, setDeletedCat] = useState({id: '', label: ''});
	const [checkedArr, setCheckedArr] = useState([])
	const [checkedArrEdit, setCheckedArrEdit] = useState([])
	const [searchInput, setSearchInput] = useState('')
	const [searchInputEdit, setSearchInputEdit] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			const dataCategories = await getCategories()
			const dataCategoriesList = await getCategoriesByList()
			setCategories(dataCategories)
			setCategoriesList(dataCategoriesList)
		}
		fetchData().then(() => {
			setFetching(false)
		})
	}, [])

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const addNewCategoryHandler = async (data) => {
		try {
			data.parentCategories = checkedArr.join(',')
			const res = await addCategory(data)
			const dataCategories = await getCategories(searchInput)
			const dataCategoriesList = await getCategoriesByList()
			setCategories(dataCategories)
			setCategoriesList(dataCategoriesList)
			toast.info(res)
			reset({catName: '', parentCategories: ''})
		} catch (e) {
			toast.error(e.response.data?.message)
		}
	}

	const deleteModalHandler = (id, label) => {
		setIsEdit(false)
		setDeletedCat({id, label})
		handleShow()
	}

	const editModalHandler = (id) => {
		setIsEdit(true)
		setCatEditId(id)
		setCheckedArrEdit([...checkedArrEdit, id])
		const cat = categoriesList.find(cat => cat.id === id)
		setCategoriesListToEdit(categoriesList.filter(cat => cat.id !== id))
		setValue2('catNameEdit', cat.label)
		setValue2('parentCategoriesEdit', cat.parent_id)
		handleShow()
	}

	const editCat = async (data) => {
		data.parentCategoriesEdit = checkedArrEdit.join(',')
		await editCategory(catEditId, data)
		const dataCategories = await getCategories(searchInput)
		const dataCategoriesList = await getCategoriesByList()
		setCategories(dataCategories)
		setCategoriesList(dataCategoriesList)
		toast.info(`Category ${data.catNameEdit} is edit`)
		handleClose()
	}

	const deleteCat = async () => {
		await deleteCategory(deletedCat.id)
		const dataCategories = await getCategories(searchInput)
		const dataCategoriesList = await getCategoriesByList()
		setCategories(dataCategories)
		setCategoriesList(dataCategoriesList)
		handleClose()
		toast.info(`Category ${deletedCat.label} is deleted`)
	}

	return (
		<>
			{fetching ? (
				<Loading/>
			) : (
				<>
					<Modal show={showModal} onHide={handleClose}>
						{isEdit ? (
							<ModalEdit handleSubmit2={handleSubmit2} editCat={editCat} errors2={errors2}
									   register2={register2} categoriesListToEdit={categoriesListToEdit}
									   handleClose={handleClose} checkedArrEdit={checkedArrEdit}
									   setCheckedArrEdit={setCheckedArrEdit}
									   categoriesList={categoriesList} searchInput={searchInputEdit}
									   setSearchInput={setSearchInputEdit}/>
						) : (
							<ModalDelete deletedCat={deletedCat} handleClose={handleClose} deleteCat={deleteCat}/>
						)}
					</Modal>
					<Row>
						<Col md={4} className="mb-3">
							<div className="sticky-md-top ls rounded shadow p-3 p-xl-5">
								<h2>Add New Category</h2>
								<FormAddCat categories={categories} checkedArr={checkedArr}
											setCheckedArr={setCheckedArr} handleSubmit={handleSubmit}
											addNewCategoryHandler={addNewCategoryHandler}
											errors={errors} register={register} categoriesList={categoriesList}
											setCategories={setCategories} searchInput={searchInput}
											setSearchInput={setSearchInput}/>
							</div>
						</Col>
						<Col md={8}>
							<TableCats categories={categories} editModalHandler={editModalHandler}
									   deleteModalHandler={deleteModalHandler}/>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default Cats;
