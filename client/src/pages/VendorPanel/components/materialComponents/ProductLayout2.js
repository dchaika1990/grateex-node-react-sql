import React, {useState} from 'react';
import {Table, Button, Modal} from "react-bootstrap";
import {deleteProductFromWishList} from "@/services/productAPI";
import {useDispatch} from "react-redux";
import {deleteProductWishList} from "@/actions/products";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "@/utils/consts";


const ProductLayout2 = ({products}) => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [deletedID, setDeletedID] = useState(null);
	const [deletedTitle, setDeletedTitle] = useState('');

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to delete the product {deletedTitle} from wishlist?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>Close</Button>
					<Button variant="danger" onClick={e => {
						deleteProductFromWishList(deletedID).then(res => {
							dispatch(deleteProductWishList(deletedID))
							toast.info(`Product ${deletedTitle} deleted`)
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
						<th>Title</th>
						<th>Excerpt</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{products.map((product, index) => {
						const {id, title, excerpt, price} = product;


						return (
							<tr key={id}>
								<td>{index + 1}</td>
								<td>{title}</td>
								<td>{excerpt}</td>
								<td>{price}</td>
								<td>
									<span className="d-flex">
										<Button variant="danger" onClick={e => {
											setDeletedID(id);
											setDeletedTitle(title);
											handleShow();
										}}>
											<i className="fa fa-close"/>
										</Button>
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

export default ProductLayout2;
