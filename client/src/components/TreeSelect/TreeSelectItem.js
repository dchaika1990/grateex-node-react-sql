import React, {useState} from 'react';
import {Form} from "react-bootstrap";

const TreeSelectItem = (
	{
		multiple,
		deleteFoo,
		recFoo,
		checker,
		item,
		checkedArr,
		setCheckedArr,
		isCheckItem = false
	}
) => {
	const [show, setShow] = useState(false)

	const addElement = (elem) => {
		if (multiple) {
			if (checkedArr.some(el => el === elem.id)) {
				setCheckedArr((prev) => [...prev.filter(el => el !== item.id)])
				deleteFoo(item)
			} else {
				setCheckedArr((prev) => [...prev, item.id])
				if (!checkedArr.some(el => el === elem.parent_id)) {
					if (item.parent_id) recFoo(item.parent_id)
				}
			}
		} else {
			setCheckedArr([elem.id])
		}
	}

	// const classNameIsCheckedChildren = isChecked ? 'children-active' : ''
	const classNameIsCheckedElem = checkedArr.some(el => el === item.id) ? 'hide-active' : ''

	return (
		<>
			<div className="tree-select-item">
				<div className="d-flex py-2">
					{multiple ? (
						<Form.Check
							className={"tree-select-check me-2 " + ' ' + classNameIsCheckedElem}
							type="checkbox"
							onChange={() => addElement(item)}
							name={item.id}
							checked={checkedArr.some(el => el === item.id)}
						/>
					) : (
						<Form.Check
							className={"tree-select-check me-2 " + ' ' + classNameIsCheckedElem}
							type="radio"
							onChange={() => addElement(item)}
							name="category"
							checked={checkedArr.some(el => el === item.id)}
						/>
					)}
					<div
						className="tree-select-label flex-grow-1 d-flex align-items-center"
						onClick={() => setShow(!show)}
					>
						{item.label}
						{item.children?.length > 0 && (
							!show
								? <i className="fa fa-chevron-down ms-auto"/>
								: <i className="fa fa-chevron-up ms-auto"/>
						)}
					</div>
				</div>
				{(show && item.hasOwnProperty('children')) ? (
					item.children?.length > 0 && item.children.map((item2, i) => {
						return (
							<TreeSelectItem multiple={multiple} deleteFoo={deleteFoo} recFoo={recFoo} checker={checker}
											item={item2} key={'_' + i + '_' + item2.id}
											checkedArr={checkedArr} setCheckedArr={setCheckedArr}
											isCheckItem={checkedArr.some(el => el === item.id)}/>
						)
					})
				) : ''}
			</div>
		</>
	);
};

export default TreeSelectItem;
