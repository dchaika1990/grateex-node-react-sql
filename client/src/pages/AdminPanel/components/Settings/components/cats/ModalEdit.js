import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import TreeSelect from "@components/TreeSelect/TreeSelect";

const ModalEdit = ({handleSubmit2, editCat, errors2, register2, categoriesListToEdit, handleClose, checkedArrEdit, setCheckedArrEdit, categoriesList, searchInput, setSearchInput}) => {
	const [categories, setCategories] = useState([])

	return (

		<Form onSubmit={handleSubmit2(editCat)}>
			<Modal.Body>
				<Form.Group className="mb-3">
					<Form.Control
						className={errors2.catNameEdit && 'is-invalid'}
						type="cat-name-edit"
						placeholder="Enter new Category"
						{...register2('catNameEdit', {required: true})}
					/>
					{errors2?.catName?.type === "required" &&
					<p className='invalid-feedback'>This field is required</p>}
				</Form.Group>
				<Form.Group className="mb-3">
					<TreeSelect
						multiple={false}
						checkedArr={checkedArrEdit}
						setCheckedArr={setCheckedArrEdit}
						arr={categories}
						list={categoriesList}
						setCategories={setCategories}
						searchInput={searchInput}
						setSearchInput={setSearchInput}/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="success" type="submit">Edit category</Button>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
			</Modal.Footer>
		</Form>

	);
};

export default ModalEdit;
