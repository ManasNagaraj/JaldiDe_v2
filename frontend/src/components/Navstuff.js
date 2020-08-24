import React, { Component } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import image from '../img/logo_low_res.png';
import { useSelector } from 'react-redux';
import logout from '../actions/userActions';
import { Cart, User } from 'grommet-icons';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Cookie from 'js-cookie';

import IconButton from '@material-ui/core/IconButton';

export default function Navstuff(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const sellerSignin = useSelector((state) => state.sellerSignin);
  const { sellerInfo } = sellerSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logout = () => {
    Cookie.set('userInfo', null);
    Cookie.set('sellerInfo', null);
    Cookie.set('cartItems', null);
  };

  return (
    <div>

      <Navbar bg='white' variant='light' expand='lg'>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Brand href='/'>
          <img
            alt=''
            src={image}
            width='70'
            height='70'
            className='d-inline-block align-top'
          />
        </Navbar.Brand>
        JaldiDe
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/seller/register'>Sell</Nav.Link>

            <Nav.Link href='/howdoesitwork'>How does it Work!</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          <Link to='/cart'>
            <IconButton>
              <Badge badgeContent={cartItems.length} color='secondary'>
                {' '}
                <Cart></Cart>
              </Badge>
            </IconButton>
          </Link>
          {userInfo ? (
            console.log('hi')
          ) : (
            <Button>sign up</Button>

            // <Link to='/users/signin'>Sign In</Link>
          )}{' '}
          {userInfo ? (
            <IconButton onClick={logout} href='/'>
              <User></User>
            </IconButton>
          ) : (
            <Dropdown drop='left' margin='20'>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                Sign In
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='/seller/signin'>Seller</Dropdown.Item>
                <Dropdown.Item href='/user/signin'>User</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}{' '}
          {sellerInfo ? <div></div> : <div></div>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
