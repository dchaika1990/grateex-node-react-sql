import React from 'react';
import ProductItem from "./ProductItem";
import ProductItem2 from "./ProductItem2";
import {Col, Row} from "react-bootstrap";

const Products = ({search, products, user}) => {
    
    return (
        <Row>
            {search && products.map(product=> (<Col className="mb-3" key={product.id} lg={12}><ProductItem2 user={user} product={product}/></Col>))}
            {!search && products.map(product=> (<Col className="mb-3" key={product.id} lg={3}><ProductItem user={user} product={product}/></Col>))}
        </Row>
    );
};

export default Products;
