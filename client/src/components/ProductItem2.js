import React, {useState} from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {PRODUCT_ROUTE, REGISTRATION_ROUTE, VENDOR_PAGE} from "@/utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import WishListBtn from "@pages/ProductPage/components/WishListBtn";
import {addToCart} from "@services/cartAPI";
import {addToCartItem} from "@/actions/user";
import {toast} from "react-toastify";
import {downloadZip} from "@services/productAPI";
import b64ToBlob from "b64-to-blob";
import fileSaver from "file-saver";

const ProductItem2 = ({product, user}) => {
	if (!user) {
		user = product.user.nickName
	}
    
    const dispatch = useDispatch()
	
	const {isAuth} = useSelector(state => state.user)
    const [inOmMyPurchases, setInOmMyPurchases] = useState(false)
    const [isMyProduct, setIsMyProduct] = useState(false)
    const [isInCart, setIsInCart] = useState(false)
    
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
		<div className=" ls vertical-item layout2 shadow rounded h-100">
			<div className="item-content h-100 d-flex flex-column">
				<div className="item_header">
					<h4 className="fw-bold">
						{isAuth ?
							<Link to={PRODUCT_ROUTE + '/' + product.id}>{product.title}</Link>
       
							:
							<Link to={REGISTRATION_ROUTE}>{product.title}</Link>
						}
					</h4>
                    <span>
                         <Link to={VENDOR_PAGE + '/' + user}>by {user}</Link>
                    </span>
					{product.ratingLevel > 0 && (
						<>
							<ReactStars
								classNames="mt-2"
								count={5}
								isHalf={true}
								value={+product.ratingLevel}
								size={30}
								edit={false}
							/>
							<p className="mt-2">Based on {product.countReviews} review(s)</p>
						</>
					)}
				</div>
				<div className="item_body">
					<p>{product.excerpt.length > 80 ? product.excerpt.slice(0, 80) + '...' : product.excerpt}</p>
					<ul>
						{product.resourceTypes.map(item =>
							<li key={item.id}>{item.name}</li>
						)}
					</ul>
				</div>
				<div className="item_footer">
					<span>{+product.price === 0 ? 'Free' : product.price + ' $'}</span>
                  
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
			</div>
		</div>
	);
};

export default ProductItem2;
