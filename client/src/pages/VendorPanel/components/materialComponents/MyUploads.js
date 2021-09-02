import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {endLoad, startLoad} from "@/actions/fetch";
import {getUploadsProducts} from "@/services/productAPI";
import {setProductsUploads} from "@/actions/products";
import Product from "./Product";


const MyUploads = () => {
	const dispatch = useDispatch();
	const {nickName} = useSelector(state => state.user.currentUser)
	const {productsUploads} = useSelector(state => state.product)

	useEffect(() => {
		dispatch(startLoad())
		getUploadsProducts(nickName).then(res => {
			dispatch(setProductsUploads(res))
		}).catch(e => {
			toast.error(e.response?.data?.message)
		})
		dispatch(endLoad())
	}, [])

	return (
		<>
			<div>
				<Product products={productsUploads} />
			</div>
		</>
	);
};

export default MyUploads;
