import React, {useState} from 'react';
import {Table, Button, Modal} from "react-bootstrap";
import {deleteProduct} from "@/services/productAPI";
import {useDispatch, useSelector} from "react-redux";
import {deleteProductsUploads, productIsEditingAction, productToEditId} from "@/actions/products";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "@/utils/consts";
import {socket} from "@services/socket";


const Product = ({products}) => {
	const dispatch = useDispatch();
	const {currentUser} = useSelector(state => state.user)
	const [showModal, setShowModal] = useState(false);
	const [deletedID, setDeletedID] = useState(null);
	const [deletedTitle, setDeletedTitle] = useState('');

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete the product {deletedTitle}?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>Close</Button>
					<Button variant="danger" onClick={e => {
						deleteProduct(deletedID).then(res => {
							dispatch(deleteProductsUploads(deletedID))
							toast.info(`Product ${deletedTitle} deleted`)
							socket.emit('vendor_delete_product', {nickName: currentUser.nickName, product: deletedTitle})
							handleClose()
						})
					}}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
			{!products.length ? (
				<p>There are no products</p>
			) : (
				<Table responsive >
					<thead>
					<tr>
						<th>#</th>
						{/*<th>Image</th>*/}
						<th>Title</th>
						<th>Subtitle</th>
						<th>Price</th>
						<th>Created</th>
						<th>Updated</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{products.map((product, index) => {
						const {id, title, excerpt, price, createdAt, updatedAt, productStatus} = product;
						// const src = productImg !== null  ? process.env.REACT_APP_API_URL + productImg.name
						// 	: process.env.REACT_APP_API_URL + 'placeholder.png'
						const dateOptions = {
							year: 'numeric',
							month: 'numeric',
							day: 'numeric',
						};

						return (
							<tr key={product.id}>
								<td>{index + 1}</td>
								{/*<td>*/}
								{/*	<img src={src} alt="product.title"/>*/}
								{/*</td>*/}
								<td>{title}</td>
								<td>{excerpt}</td>
								<td>{price}</td>
								<td>{new Date(createdAt).toLocaleString("en-US", dateOptions)}</td>
								<td>{new Date(updatedAt).toLocaleString("en-US", dateOptions)}</td>
								<td>{productStatus.name}</td>
								<td>
									<span className="d-flex">
										<Button variant="danger" onClick={e => {
											setDeletedID(id);
											setDeletedTitle(title);
											handleShow();
										}}>
											<i className="fa fa-close"/>
										</Button>
										<Button onClick={e => {
											dispatch(productIsEditingAction(true))
											dispatch(productToEditId(id))
										}} variant="info"><i className="fa fa-pencil"/></Button>
										<Button variant="success" as={Link} to={PRODUCT_ROUTE + '/' + id}><i className="fa fa-eye"/></Button>
									</span>
								</td>
							</tr>
						)
					})}
					</tbody>
				</Table>
			)}
		</>
	)
};

export default Product;
