import React from 'react';
import OrderItem from "./OrderItem";

const Order = ({orders}) => {
    return (
        <>
            {orders.map((order, i)=>(<OrderItem key={i} i={i} order={order}/>))}
        </>
    );
};

export default Order;
