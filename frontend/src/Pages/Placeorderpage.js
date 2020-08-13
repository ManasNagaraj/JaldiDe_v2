import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    return () => {
      //
    };
  }, []);

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className='placeorder'>
        <div className='placeorder-info'>
          <div>
            <h3>Shipping</h3>
            <div>
              {cart.shipping.address}, {cart.shipping.city},
              {cart.shipping.pincode}, {cart.shipping.country},
            </div>
          </div>

          <div>
            <ul className='cart-list-container'>
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    {/* <div className='cart-image'>
                      <img src={item.image} alt='product' />
                    </div> */}
                    <div className='cart-name'>
                      <div>
                        <Link to={'/product/' + item.product}>
                          {item.pname}
                        </Link>
                      </div>
                      {/* <div>Qty: {item.qty}</div> */}
                    </div>
                    <div className='cart-price'>${item.pprice}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className='placeorder-action'>
          <ul>
            <li>
              <button
                className='button primary full-width'
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Total Price</div>
              <div>${itemPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
