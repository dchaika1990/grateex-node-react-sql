import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {addProductToWishList, deleteProductFromWishList} from "@services/productAPI";
import {addProductsWishList, deleteProductWishList} from "@/actions/products";
import {toast} from "react-toastify";

const WishListBtn = ({product, isMyProduct}) => {
	const dispatch = useDispatch()
	const {productsWishList} = useSelector(state => state.product)
	const [isProductInWishlist, setIsProductInWishlist] = useState()

	useEffect(() => {
		setIsProductInWishlist(productsWishList.some(prod => +prod.id === +product.id))
	}, [product.id, dispatch])

	const addProductToWishListHandler = () => {
		addProductToWishList(product.id).then(() => {
			dispatch(addProductsWishList(product))
			setIsProductInWishlist(true)
			toast.info(`Product was added to wishlist`)
		})
	}

	const deleteProductFromWishListHandler = () => {
		deleteProductFromWishList(product.id).then(() => {
			dispatch(deleteProductWishList(product.id))
			setIsProductInWishlist(false)
			toast.info(`Product was deleted from wishlist`)
		})
	}

	return (
		<>
			{!isMyProduct && (
				<>
					{!isProductInWishlist ? (
						<Button onClick={addProductToWishListHandler} variant='primary'>Add to wishlist</Button>
					) : (
						<Button onClick={deleteProductFromWishListHandler}>Remove from wishlist</Button>
					)}
				</>
			)}
		</>
	);
};

export default WishListBtn;
