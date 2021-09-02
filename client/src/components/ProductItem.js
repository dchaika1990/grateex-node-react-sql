import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {PRODUCT_ROUTE, REGISTRATION_ROUTE, VENDOR_PAGE} from "@/utils/consts";
import {useSelector} from "react-redux";

const ProductItem = ({product, user}) => {
    if (!user) {
        user = product.user.nickName
    }
    
    const {isAuth} = useSelector(state => state.user)
    
    return (
        <div className=" ls vertical-item shadow rounded h-100">
            <div className="item-content h-100 d-flex flex-column">
                <h4 className="fw-bold">
                    {isAuth ?
                        <Link to={PRODUCT_ROUTE+ '/'+ product.id}>{product.title}</Link>
                        :
                        <Link to={REGISTRATION_ROUTE}>{product.title}</Link>
                    }
                </h4>
                <p>{product.excerpt.length > 80 ? product.excerpt.slice(0, 80) + '...' : product.excerpt}</p>
                <ul>
                    {product.resourceTypes.map(item =>
                        <li key={item.id}>{item.name}</li>
                    )}
                </ul>
                <hr className="mt-auto"/>
                <span>{ +product.price === 0 ? 'Free' : product.price + ' $'}</span>
                <div>
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
                <span>
                    <Link to={VENDOR_PAGE+ '/' + user}>by {user}</Link>
                </span>
            </div>
        </div>
    );
};

export default ProductItem;
