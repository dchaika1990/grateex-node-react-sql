import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {downloadZip, getProduct} from "@services/productAPI";
import Loading from "@components/Loading";
import ProductFilters from "@pages/ProductPage/components/ProductFilters";
import ProductFiles from "@pages/ProductPage/components/ProductFiles";
import Author from "@pages/ProductPage/components/Author";
import WishListBtn from "@pages/ProductPage/components/WishListBtn";
import Report from "@pages/ProductPage/components/Report";
import {useSelector} from "react-redux";
import Comments from "@pages/ProductPage/components/comments/Comments";
import {addToCart} from "@services/cartAPI";
import {useDispatch} from "react-redux";
import {addToCartItem} from "@/actions/user";
import Reviews from "@pages/ProductPage/components/reviews/Reviews";
import b64ToBlob from "b64-to-blob";
import fileSaver from "file-saver";

const ProductPage = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const {currentUser} = useSelector(state => state.user)
	const {productsUploads, productsPurchases} = useSelector(state => state.product)
	const [product, setProduct] = useState({})
	const [fetching, setFetching] = useState(true)
	const [isMyProduct, setIsMyProduct] = useState(false)
	const [isInCart, setIsInCart] = useState(false)
	const [inOmMyPurchases, setInOmMyPurchases] = useState(false)

	function createDescription(html) {
		return {__html: html};
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const product = await getProduct(id)
				setProduct(product)
				toast.info('Fetching product ' + (product.title.length > 10 ? product.title.slice(0, 10) + '...' : product.title))
			} catch (e) {
				toast.error(e.response?.data?.message)
			}
		}
		fetchData().then(() => {
			setFetching(false)
		})
	}, [id])

	useEffect(() => {
		setInOmMyPurchases(productsPurchases.some(item => item.productLink === product.productLink))
		setIsMyProduct(productsUploads.some(prod => +prod.id === +id))
	}, [productsUploads, productsPurchases, product])

	useEffect(() => {
		setIsInCart(currentUser.carts?.some(item => item.productId === +id))
	}, [currentUser])

	const addToCartHandler = async (id, title, price) => {
		const data = await addToCart(id)
		dispatch(addToCartItem({productId: id, product: {id, title, price}}))
		setIsInCart(true)
		toast.info(data)
	}
	
	const handleDownloadZip = async (productLink, productTitle) => {
		const data = await downloadZip(productLink)
		const blob = b64ToBlob(data, "application/zip");
		fileSaver.saveAs(blob, productTitle);
	};
	
	
	return (
		<>
			{fetching ? (
				<Loading/>
			) : (
				<section className="py-5">
					<Container>
						<Row>
							<Col lg={8}>
								<h2 className="mb-4">{product.title}</h2>
								{product.excerpt && (<p className="fw-bold">{product.excerpt}</p>)}

								{/*ProductFilters Start*/}
								<ProductFilters product={product}/>
								{/*ProductFilters End*/}

								<h4 className="fw-bold">Price: {product.productTypePrice.id === 1 ? product.productTypePrice.name : '$' + product.price}</h4>

								<hr/>
								{/*ProductFiles Start*/}
								<ProductFiles product={product}/>
								{/*ProductFiles End*/}

								<hr className="my-4 d-block"/>

								{/*Author Start*/}
								<Author product={product}/>
								{/*Author End*/}

								<hr className="my-4 d-block"/>

								<div className="mt-4"
									 dangerouslySetInnerHTML={createDescription(product.description)}/>

								<hr className="my-4 d-block"/>

								{/*Report Start*/}
								<Report product={product}/>
								{/*Report End*/}

								{/*Review Start*/}
								<Reviews product={product} isMyProduct={isMyProduct} inOmMyPurchases={inOmMyPurchases}/>
								{/*Review End*/}

								<hr className="my-4 d-block"/>

								{/*Comments Start*/}
								<Comments product={product} isMyProduct={isMyProduct}/>
								{/*Comments End*/}

							</Col>
							<Col lg={4}>
								<div style={{zIndex: 1}} className="sticky-md-top shadow ls rounded p-3 p-xl-5 text-center">
									<WishListBtn product={product} isMyProduct={isMyProduct}/>
									{inOmMyPurchases ? (
										<Button
											className="mt-3" variant="success"
											onClick={()=> handleDownloadZip(product.productLink, product.title)}
										>Download Zip
										</Button>
									) : (
										<Button
											className="mt-3" variant="success"
											onClick={() => addToCartHandler(product.id, product.title, product.price)}
										>{isInCart ? "In cart" : "Add to cart"}
										</Button>
									)}
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			)
			}
		</>
	);
};

export default ProductPage;
