import React from 'react';
import CategoryItem from "@pages/AdminPanel/components/Settings/components/cats/CategoryItem";
import {Table} from "react-bootstrap";

const TableCats = ({categories, editModalHandler, deleteModalHandler}) => {
	return (
		<Table
			bordered
			hover
			responsive
			className="category-table"
		>
			<thead>
			<tr>
				<th>Category Name</th>
				<th>Actions</th>
			</tr>
			</thead>
			<tbody>
			{categories.map((cat, index) => (
				<CategoryItem
					editCat={editModalHandler}
					deleteCat={deleteModalHandler}
					key={index} cat={cat}
					index={0}
					className={"lvl-0"}
				/>
			))}
			</tbody>
		</Table>
	);
};

export default TableCats;
