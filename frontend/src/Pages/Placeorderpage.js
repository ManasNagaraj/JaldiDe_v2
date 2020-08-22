import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  removeAllFromCart,
} from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Row } from 'react-bootstrap';

export default function Placeorder(props) {
  const shopID = props.match.params.id;
  const productID = props.location.search
    ? String(props.location.search.split('=')[1])
    : 1;
  console.log(productID);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping } = cart;
  if (!shipping) {
    props.history.push('shipping');
  }

  const itemPrice = cartItems.reduce((a, c) => a + c.pprice, 0);
  const placeOrderHandler = () => {
    // create an order
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        itemPrice,
      })
    );
  };

  const clearCartHandler = () => {
    dispatch(removeAllFromCart());
    props.history.push('orderplaced');
  };

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <div>
      <div className='placeorder'>
        <div className='placeorder-info'>
          <div>
            <h3>Delivery Address</h3>
            <div style={{ marginTop: '1rem' }}>
              {cart.shipping.address},<br></br>
              {cart.shipping.city} - {cart.shipping.pincode},<br></br>
              {cart.shipping.country}
            </div>
          </div>

          <div>
            <ul className='cart-list-container'>
              <li>
                <h3>Shopping Cart</h3>
                <div>
                  <h4>Price</h4>
                </div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    <div className='cart-image'>
                      <img src={'item.image'} alt='product' />
                    </div>
                    <div className='cart-name'>
                      <div>
                        <Link to={'/product/' + item.product}>
                          {item.pname}
                        </Link>
                      </div>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className='cart-price'>Rs.{item.pprice}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className='placeorder-action'>
          <ul>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div style={{ flexDirection: 'row' }}>
                <div>
                  <h5>Total Price</h5>
                </div>
                <div className='cart-price'>Rs.{itemPrice}</div>
                Free shipping:)
              </div>
            </li>
            <li>
              <Button
                variant='contained'
                color='primary'
                className='margin'
                onClick={(placeOrderHandler, clearCartHandler)}
              >
                Place Order
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
