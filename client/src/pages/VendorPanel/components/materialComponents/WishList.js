import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {endLoad, startLoad} from "@/actions/fetch";
import {getUploadsWishlist} from "@/services/productAPI";
import {setProductsWishList} from "@/actions/products";
import ProductLayout2 from "@pages/VendorPanel/components/materialComponents/ProductLayout2";

const WishList = () => {
	const dispatch = useDispatch();
	const {productsWishList} = useSelector(state => state.product)

	useEffect(() => {
		dispatch(startLoad())
		getUploadsWishlist().then(res => {
			dispatch(setProductsWishList(res))
		}).catch(e => {
			toast.error(e.response?.data?.message)
		})
		dispatch(endLoad())
	}, [])

	return (
		<div>
			<ProductLayout2 products={productsWishList} />
		</div>
	);
};

export default WishList;
