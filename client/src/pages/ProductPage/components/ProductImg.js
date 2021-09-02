import React from 'react';

const ProductImg = ({product}) => {
	const src = product.productImg
		? process.env.REACT_APP_API_URL + product.productImg.name
		: process.env.REACT_APP_API_URL + 'placeholder.png'
	return (
		<div className="vertical-item">
			<img src={src} alt="title"/>
		</div>
	);
};

export default ProductImg;
