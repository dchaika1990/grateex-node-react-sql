import React, {useEffect, useState} from 'react';
import {Col, Container, Form, Pagination, Row} from "react-bootstrap";
import Products from "@components/Products";
import Loading from "@components/Loading";
import {getAllApprovedProducts} from "@services/productAPI";
import useDebounce from "@/hooks/useDebounce";
import {toast} from "react-toastify";
import TreeSelect from "@components/TreeSelect/TreeSelect";
import {useSelector} from "react-redux";

const Shop = () => {
	const catsReducer = useSelector(state => state.categories)
	const {categoriesList} = useSelector(state => state.categories)
	const filtersReducer = useSelector(state => state.product.filters)
	const productRedux = useSelector(state => state.product)

	const [fetching, setFetching] = useState(true)
	const [products, setProducts] = useState([])
	const [filters, setFilters] = useState([])
	const [searchInput, setSearchInput] = useState('');
	const [sort, setSort] = useState(null);

	const [productDegreeLevel, setProductDegreeLevel] = useState([]);
	const [productResourceType, setProductResourceType] = useState([]);
	const [productFormat, setProductFormat] = useState([]);
	const [productTypeSelling, setProductTypeSelling] = useState([]);
	const [productLanguage, setProductLanguage] = useState([]);

	//------------------------------------------------------//
	const [categories, setCategories] = useState([])
	const [checkedArr, setCheckedArr] = useState([])
	const [searchInputCat, setSearchInputCat] = useState('')
	//------------------------------------------------------/

	const debouncedSearchTerm = useDebounce(searchInput, 500);

	const [pageProducts, setPageProducts] = useState(1)
	const [totalCount, setTotalCount] = useState(0)
	const limit = 8

	const pageProductCount = Math.ceil(totalCount / limit)
	const pages = []

	for (let i = 0; i < pageProductCount; i++) {
		pages.push(i + 1)
	}

	useEffect(() => {
		setCategories(catsReducer.categories)
		const newData = filtersReducer.filter((item, i) => (Object.keys(item)[0]) !== 'productTypePrice')
		setFilters(newData)
	}, [productRedux, catsReducer])

	useEffect(() => {
		setFetching(true)
		const fetchData = async () => {
			const {count, rows} = await getAllApprovedProducts(
				debouncedSearchTerm.toLowerCase(),
				sort,
				productResourceType,
				productDegreeLevel,
				productFormat,
				productTypeSelling,
				productLanguage,
				pageProducts,
				limit,
				checkedArr
			)
			setProducts(rows)
			setTotalCount(count)
		}
		fetchData().then(() => {
			setFetching(false)
		})
	}, [debouncedSearchTerm, sort, productResourceType, productDegreeLevel, productFormat, productTypeSelling, productLanguage, pageProducts, checkedArr])

	const handleChange = (e, filter) => {
		let isChecked = e.target.checked
		switch (filter) {
			case 'productResourceType':
				if (isChecked) {
					setProductResourceType(prevState => [...prevState, e.target.value])
				} else {
					setProductResourceType(prevState => prevState.filter(value => value !== e.target.value))
				}
				break;
			case 'productDegreeLevel':
				if (isChecked) {
					setProductDegreeLevel(prevState => [...prevState, e.target.value])
				} else {
					setProductDegreeLevel(prevState => prevState.filter(value => value !== e.target.value))
				}
				break;
			case 'productFormat':
				if (isChecked) {
					setProductFormat(prevState => [...prevState, e.target.value])
				} else {
					setProductFormat(prevState => prevState.filter(value => value !== e.target.value))
				}
				break;
			case 'productTypeSelling':
				if (isChecked) {
					setProductTypeSelling(prevState => [...prevState, e.target.value])
				} else {
					setProductTypeSelling(prevState => prevState.filter(value => value !== e.target.value))
				}
				break;
			case 'productLanguage':
				if (isChecked) {
					setProductLanguage(prevState => [...prevState, e.target.value])
				} else {
					setProductLanguage(prevState => prevState.filter(value => value !== e.target.value))
				}
				break;
		}
	}

	return (
		<section className='py-5'>
			<Container>
				<Row>
					<Col lg={3} className="p-3 ls shadow rounded h-100">
						{filters.map((filter, index) => {
							return (
								<div className="filter mb-4" key={index + '_filter'}>
									{Object.keys(filter).map((key, index) => (
										<div className="widget-name" key={filter[key].name}>
											<h5 className="fw-bold">{filter[key].name}</h5>
											<hr/>
										</div>
									))}
									{Object.keys(filter).map(key => filter[key].options.map((option, index) => (
										<Form.Group key={option.id + option.name}>
											<Form.Check.Label className="d-flex">
												<Form.Check
													inline
													name={Object.keys(filter)[0]}
													type="checkbox"
													value={option.id}
													onChange={e => handleChange(e, Object.keys(filter)[0])}
													id={(Object.keys(filter)[0] + '_' + option.name.split(' ').join('_')).toLowerCase()}
												/>
												{option.name}
											</Form.Check.Label>
										</Form.Group>
									)))}
								</div>
							)
						})}
						<div className="filter">
							<div className="widget-name">
								<h5 className="fw-bold">Choose your teaching subject(s)</h5>
								<hr/>
							</div>
							<TreeSelect
								tags={true}
								multiple={true}
								checkedArr={checkedArr}
								setCheckedArr={setCheckedArr}
								arr={categories}
								list={categoriesList}
								setCategories={setCategories}
								searchInput={searchInputCat}
								setSearchInput={setSearchInputCat}/>
						</div>
					</Col>
					<Col lg={9} className="ps-4">
						<Row className="mb-3">
							<Col lg={9}>
								<Form.Group>
									<Form.Control type="text"
												  placeholder="Search"
												  onChange={(e) => setSearchInput(e.target.value)}/>
								</Form.Group>
							</Col>
							<Col lg={3}>
								<Form.Group>
									<Form.Select defaultValue="relevance"
												 onChange={event => setSort(event.target.value)}
									>
										<option value={'relevance'}>Relevance</option>
										<option value={'newly_added'}>Newly added</option>
										<option value={'best_selling'}>Best selling</option>
										<option value={'highly_rated'}>Highly rated</option>
										<option value={'price'}>Price (free appear as if the price were 0)</option>
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
						{fetching ? (
							<Loading/>
						) : (
							<>
								{products.length === 0 && (<p>No products</p>)}
								<Products search={debouncedSearchTerm} products={products}/>
								<Pagination className="mt-3">
									{pages.length > 1 && pages.map(page =>
										<Pagination.Item
											active={pageProducts === page}
											key={page}
											onClick={() => setPageProducts(page)}
										>
											{page}
										</Pagination.Item>
									)}
								</Pagination>
							</>
						)}
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Shop;
