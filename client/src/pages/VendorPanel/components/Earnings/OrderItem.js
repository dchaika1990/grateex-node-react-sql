import React from 'react';

const OrderItem = ({order, i}) => {
    return (
        <tr >
            <td>{i+1}</td>
            <td>{order.date}</td>
            <td>{order.type}</td>
            <td>{order.nickName}</td>
            <td>{order.orderId}</td>
            {order.type=== 'Sale'? (<td>{order.amount} $</td>): <td className="refund">- {order.amount} $</td>}
            <td>{order.balance}</td>
        </tr>
    );
};

export default OrderItem;
