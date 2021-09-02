import React from 'react';
import {separator} from "@/utils/helpers";

const ProductFilters = ({product}) => {
	return (
		<ul>
			{product.degreeLevels.length ? (
				<li><strong>Degree
					levels:</strong> {separator(product.degreeLevels, 'name')}</li>
			) : null}
			{product.resourceTypes.length ? (
				<li><strong>Resource
					types:</strong> {separator(product.resourceTypes, 'name')}</li>
			) : null}
			{product.productFormats.length ? (
				<li><strong>Formats:</strong> {separator(product.productFormats, 'name')}
				</li>
			) : null}
			{product.typeSellings.length ? (
				<li><strong>Settings:</strong> {separator(product.typeSellings, 'name')}
				</li>
			) : null}
			{product.productLanguages.length ? (
				<li>
					<strong>Languages:</strong> {separator(product.productLanguages, 'name')}
				</li>
			) : null}
			{product.cats.length ? (
				<li><strong>Categories:</strong> {separator(product.cats, 'label')}</li>
			) : null}
		</ul>
	);
};

export default ProductFilters;
