import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import TextField from '@material-ui/core/TextField';
import { PromiseProvider } from 'mongoose';
import Button from '@material-ui/core/Button';

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
    <div style={{ alignContent: 'space-between' }}>
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
              <TextField
                required
                id='outlined-required'
                label='Address'
                defaultValue=''
                variant='outlined'
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>
            <li>
              <TextField
                required
                id='outlined-required'
                label='City'
                defaultValue=''
                variant='outlined'
                onChange={(e) => setCity(e.target.value)}
              />
            </li>
            <li>
              <TextField
                required
                id='outlined-required'
                label='Pincode'
                defaultValue=''
                variant='outlined'
                onChange={(e) => setPincode(e.target.value)}
              />
            </li>
            <li>
              <TextField
                required
                id='outlined-required'
                label='Country'
                defaultValue=''
                variant='outlined'
                onChange={(e) => setCountry(e.target.value)}
              />
            </li>

            <li>
              <Button variant='contained' type='submit' color='primary'>
                Continue
              </Button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
