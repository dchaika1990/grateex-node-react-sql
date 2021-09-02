import React from 'react';

const OrderItem = ({order, i}) => {
    return (
        <tr >
            <td>{i+1}</td>
            <td>{order.date}</td>
            <td>{order.type}</td>
            <td>{order.product}</td>
            <td>{order.orderId}</td>
            {order.type=== 'Sale'? (<td>{order.amount} $</td>): <td className="refund">- {order.amount} $</td>}
        </tr>
    );
};

export default OrderItem;
