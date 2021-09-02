import React, {useEffect, useState} from 'react';
import b64ToBlob from "b64-to-blob";
import fileSaver from "file-saver";
import {useDispatch, useSelector} from "react-redux";
import {downloadZip, getPurchases} from "@services/productAPI";
import {setProductsPurchases} from "@/actions/products";
import {Button, Table} from "react-bootstrap";

const MyPurchases = () => {
	const {productsPurchases} = useSelector(state => state.product)
	const [downloading, setDownloading] = useState(false);
	const dispatch = useDispatch()
	
	useEffect(() => {
		const fetchData = async () =>{
			const data = await getPurchases()
			dispatch(setProductsPurchases(data))
		}
		fetchData()
	}, [])
	
	const handleDownloadZip = async (productLink, productTitle) => {
		setDownloading(true);
		const data = await downloadZip(productLink)
		const blob = b64ToBlob(data, "application/zip");
		fileSaver.saveAs(blob, productTitle);
		setDownloading(false);
	};

	return (
		<div>
			<Table responsive className="table_purchases">
				<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Excerpt</th>
					<th>Price</th>
					<th>Purchase Date</th>
					<th>Actions</th>
				</tr>
				</thead>
				<tbody>
				{productsPurchases.map((product, i) =>
					<tr key={product.id}>
						<td>
							{i+1}
						</td>
						<td>
							{product.title}
						</td>
						<td>
							{product.excerpt}
						</td>
						<td>
							{product.price}
						</td>
						<td>
							{product.createdAt}
						</td>
						<td>
							<Button
								disabled={downloading}
								onClick={()=> handleDownloadZip(product.productLink, product.title)}
							>
								{downloading ? "Downloading..." : "Download Zip"}
							</Button>
						</td>
					</tr>
				)}
				</tbody>
			</Table>
		</div>
	);
};

export default MyPurchases;
