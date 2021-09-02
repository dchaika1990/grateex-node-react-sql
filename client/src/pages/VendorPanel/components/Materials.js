import React from 'react';
import NewProduct from "./materialComponents/newProduct";
import {useSelector} from "react-redux";
import TabsProducts from "@pages/VendorPanel/components/materialComponents/TabsProducts";

const Materials = () => {
	const {productIsEditing} = useSelector(state => state.product)

	return (
		<>
			{productIsEditing ? (
				<NewProduct />
			) : (
				<TabsProducts />
			)}
		</>
	);
};

export default Materials;
