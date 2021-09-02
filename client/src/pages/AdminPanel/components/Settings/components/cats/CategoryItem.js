import React from 'react';
import {Button, ButtonGroup} from "react-bootstrap";

const CategoryItem = ({cat, index, className, deleteCat, editCat}) => {
	return (
		<>
			<tr className={className}>
				<td>
					{cat.label}
				</td>
				<td>
					<ButtonGroup aria-label="Basic example">
						<Button onClick={() => editCat(cat.id)}>Edit</Button>
						<Button variant={"danger"} onClick={() => deleteCat(cat.id, cat.label)}>Delete</Button>
					</ButtonGroup>
				</td>
			</tr>
			{cat.children && cat.children.length ? cat.children.map((children, indexChild) => {
				return (
					<CategoryItem
						editCat={editCat}
						deleteCat={deleteCat}
						key={indexChild}
						className={"lvl-" + (+index + 1)}
						cat={children}
						index={index + 1}
					/>
				)
			}) : null}
		</>
	);
};

export default CategoryItem;
