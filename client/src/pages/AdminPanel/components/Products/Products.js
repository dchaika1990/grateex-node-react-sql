import React, {useEffect, useState} from 'react';
import Loading from "@components/Loading";
import {Button, ButtonGroup, Col, Container, Row, Table, Form, Modal, Pagination} from "react-bootstrap";
import {deleteProduct, editProductsStatus, getProduct, getProductsAll, getProductsStatus} from "@services/productAPI";
import {toast} from "react-toastify";
import {useHistory, useRouteMatch} from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import {socket} from "@services/socket";
import {CSVLink} from "react-csv";

const Products = () => {
	const history = useHistory()
	const {url} = useRouteMatch();
	const [fetching, setFetching] = useState(true)
	const [products, setProducts] = useState([])
	const [productsInfoCSV, setProductsInfoCSV] = useState([])
	const [productsStatus, setProductsStatus] = useState([])
	const [deletedProduct, setDeletedProduct] = useState({
		id: null,
		title: ''
	});
	const [showModal, setShowModal] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [statusSelect, setStatusSelect] = useState([1, 2, 3]);
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');


	const [sort, setSort] = useState(null);
	const dateOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	};
	
	const limit = 10
	const [pageProducts, setPageProducts] = useState(1)
	const [totalCount, setTotalCount] = useState(0)

	const debouncedSearchTerm = useDebounce(searchInput, 500);

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	useEffect(() => {
		const effect = async () => {
			try {
				const allProducts = await getProductsAll(debouncedSearchTerm.toLowerCase(), statusSelect, fromDate, toDate, pageProducts, limit, sort)
				const allStatus = await getProductsStatus()
				setProducts(allProducts[0].rows)
				setTotalCount(allProducts[0].count)
				allProducts[1].forEach(product => {
					let productObj = {
						id: product.id,
						title: product.title,
						author: product.user.nickName,
						excerpt: product.excerpt,
						price: product.price,
						created: new Date(product.createdAt).toLocaleString("en-US", dateOptions),
						status: product.productStatus.name
					}
					setProductsInfoCSV(prevState => [...prevState, productObj])
				})
				setProductsStatus(allStatus)
			} catch (e) {
				toast.error(e.response?.data?.message)
			}
		}
		effect().then(() => {
			setFetching(false)
		});
	}, [debouncedSearchTerm, statusSelect, fromDate, toDate, pageProducts, sort])

	const changeStatus = (e, index) => {
		const productsClone = [...products]
		productsClone[index].productStatusId = e.target.value
		let statusForBeck = productsStatus.filter(item => +item.id === +e.target.value)
		editProductsStatus(productsClone[index].id, e.target.value, productsClone[index].user.email).then(res => {
			setProducts([...productsClone])
			toast.success(res)
			socket.emit('admin_change_status_to_product', {
				title: productsClone[index].title,
				status: statusForBeck[0].name,
				nickName: productsClone[index].user.nickName
			})
		}).catch(e => {
			toast.error(e.response?.data?.message)
		})

	}

	const deleteProductHandler = () => {
		const productsClone = [...products]
		setProducts([...productsClone.filter(item => item.id !== deletedProduct.id)])
		toast.info(`Product ${deletedProduct.title} deleted`)
		deleteProduct(deletedProduct.id).then(() => {
			handleClose()
		})

	}

	const editProduct = (id) => {
		getProduct(id, 1).then(prod => {
			history.push(url + `/${id}`, {prod})
		})
	}

	const pageProductsCount = Math.ceil(totalCount / limit)
	const pages = []

	for (let i = 0; i < pageProductsCount; i++) {
		pages.push(i + 1)
	}

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete the product {deletedProduct.title}</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>Close</Button>
					<Button variant="danger" onClick={deleteProductHandler}>Delete</Button>
				</Modal.Footer>
			</Modal>
			{fetching ? (
				<Loading/>
			) : (
				<section className="py-5">
					<Container>
						<Row>
							<Col lg={6}>
								<h3>All Products</h3>
							</Col>
							<Col className="text-lg-end mt-3 mt-lg-0" lg={6}>
								<CSVLink className="btn btn-mainColor" data={productsInfoCSV}>Export Information</CSVLink>
							</Col>
							<Col xs={12} className="mb-3 mt-3">
								<h4>Search Products</h4>
								<Form>
									<Row>
										<Col lg="4">
											<Form.Group>
												<Form.Control type="text"
															  placeholder="Search products by author/title"
															  onChange={(e) => setSearchInput(e.target.value)}/>
											</Form.Group>
										</Col>
										<Col lg="4">
											<Form.Group>
												<Form.Select defaultValue="Choose filter products..."
															 onChange={event => setStatusSelect(event.target.value)}>
													<option value={''}>Choose status</option>
													{productsStatus.map(item => {
														if (item.id === 1) return true
														return (
															<option key={item.id}
																	value={item.id}>{item.name}</option>
														)
													})}
												</Form.Select>
											</Form.Group>
										</Col>
										<Col lg="4">
											<Form.Group>
												<Form.Select
													defaultValue=""
													onChange={event => setSort(event.target.value)}>
													<option value={''}>Sort by upload date</option>
													<option value={'newest'}>Newest</option>
													<option value={'oldest'}>Oldest</option>
												</Form.Select>
											</Form.Group>
										</Col>
										{/*<Col lg="2">*/}
										{/*	<DatePicker*/}
										{/*		placeholderText="Please select from registration date"*/}
										{/*		selected={fromDate}*/}
										{/*		onChange={(date) => {*/}
										{/*			if (date === null) return setFromDate('')*/}
										{/*			setFromDate(date)*/}
										{/*		}}*/}
										{/*	/>*/}
										{/*</Col>*/}
										{/*<Col lg="2">*/}
										{/*	<DatePicker*/}
										{/*		placeholderText="Please select to registration date"*/}
										{/*		selected={toDate}*/}
										{/*		onChange={(date) => {*/}
										{/*			if (date === null) return setToDate('')*/}
										{/*			setToDate(date)*/}
										{/*		}}*/}
										{/*	/>*/}
										{/*</Col>*/}
									</Row>
								</Form>
							</Col>
							<Col xs={12}>
								<hr/>
								<div className="ls p-5 rounded shadow">
									<Table className="users_table" bordered hover responsive="sm">
										<thead>
										<tr>
											<th>#</th>
											<th>Title</th>
											<th>Author</th>
											<th>Price</th>
											<th className="date">Created</th>
											<th className="date">Updated</th>
											<th>Status</th>
											<th className="actions">Actions</th>
										</tr>
										</thead>
										<tbody>
										{!products.length && (
											<tr>
												<td colSpan="9">
													<p className="text-center">
														There are no products
													</p>
												</td>
											</tr>
										)}
										{
											products.map((product, i) => {
												let status = productsStatus.find(elem => elem.id === +product.productStatusId)

												return (
													<tr key={product.id}
														className={'status-' + status.name.toLowerCase()}>
														<td>{i + 1}</td>
														<td>{product.title}</td>
														<td>{product.user.nickName}</td>
														<td>{product.price}</td>
														<td>{new Date(product.createdAt).toLocaleString("en-US", dateOptions)}</td>
														<td>{new Date(product.updatedAt).toLocaleString("en-US", dateOptions)}</td>
														<td>
															<Form.Select
																defaultValue={product.productStatusId}
																aria-label="Default select example"
																onChange={e => changeStatus(e, i)}
															>
																{productsStatus.map(item => {
																	if (item.id === 1) return true
																	return (
																		<option key={item.id}
																				value={item.id}>{item.name}</option>
																	)
																})}
															</Form.Select>
														</td>
														<td className="actions-body">
															<ButtonGroup>
																<Button
																	onClick={() => editProduct(product.id)}>Edit</Button>
																<Button onClick={e => {
																	setDeletedProduct({
																		id: product.id,
																		title: product.title
																	})
																	handleShow();
																}} variant={"danger"}>Delete</Button>
															</ButtonGroup>
														</td>
													</tr>
												)
											})
										}
										</tbody>
									</Table>
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
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			)}
		</>
	);
};

export default Products;
