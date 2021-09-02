import React from 'react';
import {Button, ButtonGroup} from "react-bootstrap";

const SchoolItem = ({items, deleteItem, editHandler, isEdit, cancelEditHandler}) => {

	const tableRow = items.map(school => (
		<tr key={school.id}>
			<td>{school.label}</td>
			<td>
				<ButtonGroup aria-label="Basic example">
					{!isEdit ? (
						<Button onClick={() => editHandler(school)}>Edit</Button>
					) : (
						<Button variant="dark" onClick={cancelEditHandler}>Cancel</Button>
					)}
					<Button variant={"danger"} onClick={() => deleteItem(school.id, school.label)}>Delete</Button>
				</ButtonGroup>
			</td>
		</tr>
	))

	return (
		<>
			{!items.length ? (
				<tr>
					<td colSpan="2">No schools</td>
				</tr>
			) : (
				<>
					{tableRow}
				</>
			)}
		</>
	);
};

export default SchoolItem;
