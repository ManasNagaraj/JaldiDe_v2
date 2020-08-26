import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder, deleteOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import SellerRegisterpage from './SellerRegisterpage';
import Cookies from 'js-cookie';
import { orderListReducer } from '../reducers/orderReducers';

export default function OrderInfo(props) {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading: loadingOrders, order, error: errorOrders } = orderDetails;

  useEffect(() => {
    dispatch(detailsOrder(props.match.params.sellerid, props.match.params.id));
    return () => {};
  }, []);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };

  return loadingOrders ? (
    <div>Loading...</div>
  ) : (
    <div className='content content-margined'>
      <div className='order-header'>
        <h3>Orders</h3>
      </div>
      <div className='order-list'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(order._id, console.log(order))}</td>
              <td>{order._id}</td>
              <td>{order.time}</td>
              <td>{order.total}</td>
              {/* <td>{order.user.name}</td> */}
              <td>{order.isPaid}</td>
              {/* <td>{order.paidAt}</td> */}
              {/* <td>{order.isDelivered.toString()}</td> */}
              {/* <td>{order.deliveredAt}</td>  */}
              <td>
                <button
                  type='button'
                  onClick={() => deleteHandler(order)}
                  className='button secondary'
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
