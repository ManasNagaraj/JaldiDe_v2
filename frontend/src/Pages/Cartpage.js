import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';

export default function Cartpage(props) {
  const shopID = props.match.params.id;
  const productID = props.location.search
    ? String(props.location.search.split('=')[1])
    : 1;
  console.log(productID);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => {
    props.history.push('/user/signin?redirect=shipping');
  };

  const removeFromCartHandler = (productID) => {
    dispatch(removeFromCart(productID));
  };

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(shopID, productID));
    }
    return () => {
      //
    };
  }, []);

  return (
    <div>
      <h2>Shoppping Cart</h2>
      {cartItems.length === 0 ? (
        <div>Cart is Empty</div>
      ) : (
        cartItems.map((item) => (
          <div>
            <h1>{item.pname}</h1>
            <h2>{item.pdesc}</h2>
            <button
              type='button'
              className='button'
              onClick={() => removeFromCartHandler(item.product)}
            >
              Delete
            </button>
          </div>
        ))
      )}
      <h3>Subtotal : Rs. {cartItems.reduce((a, c) => a + c.pprice, 0)}</h3>
      <button
        onClick={checkoutHandler}
        className='button primary full-width'
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </button>{' '}
    </div>
  );
}
