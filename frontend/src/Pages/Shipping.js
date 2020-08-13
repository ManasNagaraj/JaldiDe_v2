import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { PromiseProvider } from 'mongoose';

export default function Shippingpage(props) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, pincode, country }));
    props.history.push('placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h2>Shipping</h2>
            </li>
            {/* <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li> */}
            <li>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                name='address'
                id='address'
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                name='city'
                id='city'
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                name='country'
                id='country'
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor='pincode'>Pincode</label>
              <input
                type='text'
                name='pincode'
                id='pinncode'
                onChange={(e) => setPincode(e.target.value)}
              ></input>
            </li>

            <li>
              <button type='submit' className='button primary'>
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
