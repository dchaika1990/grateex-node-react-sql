import React from 'react';
import {Col, Row} from "react-bootstrap";

const ProductFiles = ({product}) => {
	return (
		<>
			{(product.productPreviewFiles || product.productFiles) && (
				<Row>
					{product.productPreviewFiles && (
						<Col>
							<h6 className="mt-3 fw-bold">Preview files</h6>
							<ul>
								{product.productPreviewFiles.map(file => {
									return (
										<li key={file.id}>
											<a href={process.env.REACT_APP_API_URL + 'api/product/download?fileName=' + file.file_name + '&priceStatusId=1'}>
												{file.file_name.slice(file.file_name.lastIndexOf('/') + 1)}
											</a>
										</li>
									)
								})}
							</ul>
						</Col>
					)}
					{product.productFiles && (
						<Col>
							<h6 className="mt-3 fw-bold">Actual product files</h6>
							<ul>
								{product.productFiles.map(file => {
									return (
										<li key={file.id}>
											{file.file_name.slice(file.file_name.lastIndexOf('/') + 1)}
										</li>
									)
								})}
							</ul>
						</Col>
					)}
				</Row>
			)}
		</>
	);
};

export default ProductFiles;
