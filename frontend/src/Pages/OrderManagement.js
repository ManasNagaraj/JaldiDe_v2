import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function OrderManagement(props) {
  const dispatch = useDispatch();

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  const sellerSignin = useSelector((state) => state.sellerSignin);
  const { loading, sellerInfo, error } = sellerSignin;

  useEffect(() => {
    dispatch(listMyOrders(props.match.params.id));
    return () => {};
  }, []);

  return (
    <div className='profile-orders content-margined'>
      {loadingOrders ? (
        <div>Loading...</div>
      ) : errorOrders ? (
        <div>{errorOrders} </div>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.time}</td>
                <td>{order.total}</td>
                <td>{order.isPaid.toString}</td>
                <td>
                  <Link
                    to={
                      '/seller/orderdetails/' + sellerInfo._id + '/' + order._id
                    }
                  >
                    DETAILS
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
