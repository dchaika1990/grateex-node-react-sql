import React from 'react';
import {Button, Form} from "react-bootstrap";
import TreeSelect from "@components/TreeSelect/TreeSelect";

const FormAddCat = (
	{
		checkedArr,
		setCheckedArr,
		categories,
		handleSubmit,
		addNewCategoryHandler,
		errors,
		register,
		categoriesList,
		setCategories,
		searchInput,
		setSearchInput
	}
) => {
	return (
		<Form onSubmit={handleSubmit(addNewCategoryHandler)}>
			<Form.Group className="mb-3">
				<Form.Control
					className={errors.catName && 'is-invalid'}
					type="cat-name"
					placeholder="Enter new Category"
					{...register('catName', {required: true})}
				/>
				{errors?.catName?.type === "required" &&
				<p className='invalid-feedback'>This field is required</p>}
			</Form.Group>
			<Form.Group className="mb-3">
				<TreeSelect
					multiple={false}
					checkedArr={checkedArr}
					setCheckedArr={setCheckedArr}
					arr={categories}
					list={categoriesList}
					setCategories={setCategories}
					searchInput={searchInput}
					setSearchInput={setSearchInput}/>
			</Form.Group>
			<Button variant="success" type="submit">Add</Button>
			<Button variant="secondary">Clean</Button>
		</Form>
	);
};

export default FormAddCat;
