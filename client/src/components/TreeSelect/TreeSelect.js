import React, {useEffect, useState} from 'react';
import TreeSelectItem from "@components/TreeSelect/TreeSelectItem";
import {Form} from "react-bootstrap";
import useDebounce from "@/hooks/useDebounce";
import {getCategories} from "@services/categoryAPI";
import Loading from "@components/Loading";
import Tags from "@components/TreeSelect/Tags";

const TreeSelect = ({tags = false, searchInput, setSearchInput, checkedArr, setCheckedArr, multiple, arr, list, setCategories }) => {
	const [fetching, setFetching] = useState(true)
	const [isFirstLoad, setIsFirstLoad] = useState(true)
	const debouncedSearchTInput = useDebounce(searchInput.trim().toLowerCase(), 500);
	const checker = (arr, target) => target.some(v => arr.includes(v.id));

	const recFoo = (parentId) => {
		if (!checkedArr.includes(parentId)) setCheckedArr((prev) => [...prev, parentId])
		let needElem = list.find(elem => elem.id === parentId)
		if (needElem.parent_id !== null) {
			recFoo(needElem.parent_id)
		}
	}

	const deleteFoo = (item) => {
		if (item.hasOwnProperty('children')) {
			item.children.forEach(elem => {
				setCheckedArr((prev) => [...prev.filter(el => el !== elem.id)])
				deleteFoo(elem)
			})
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			if (debouncedSearchTInput.length > 0 || !isFirstLoad) {
				const dataCategories = await getCategories(debouncedSearchTInput)
				setCategories(dataCategories)
			}
			setIsFirstLoad(false)
		}
		fetchData().then(() => {
			setFetching(false)
		})
	}, [debouncedSearchTInput])

	return (
		<>
			{fetching ? (
				<Loading />
			) : (
				<>
					{tags && <Tags ids={checkedArr} setIds={setCheckedArr} list={list}/>}
					<div className="tree-select-wrap">
						<Form.Control
							value={searchInput}
							onChange={event => setSearchInput(event.target.value)}
							placeholder="Search..."
							className="mb-3"
						/>
						<div className="tree-select">
							{arr.map((item, i) => {
								return (
									<TreeSelectItem  multiple={multiple} deleteFoo={deleteFoo} recFoo={recFoo} checker={checker} checkedArr={checkedArr}
													 setCheckedArr={setCheckedArr} item={item} childrenLength={item.children.length}
													 key={item.id + '_' + i}/>
								)
							})}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default TreeSelect;
