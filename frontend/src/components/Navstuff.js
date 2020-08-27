import React, { Component } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import image from '../img/logo2.png';
import { useSelector } from 'react-redux';
import logout from '../actions/userActions';
import { Cart, Power } from 'grommet-icons';
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

  const login = () => {
    if (sellerInfo || userInfo) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {/* <Nav direction="row" background="brand" pad="">
          <h5>2 Hours Delivery</h5>
          <h5>Contact Us: +91 7878787878</h5>
          <h5>Email: contact@jaldide.com</h5>
      </Nav> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '2vw',

          justifyContent: 'space-around',
          backgroundColor: '#ffce7f',
          alignContent: 'center',
          fontWeight: '200',
        }}
      >
        <div style={{ fontSize: '1.5vw' }}>2 Hours Delivery</div>
        <div style={{ fontSize: '1.5vw' }}>Contact Us: +91 7878787878</div>
        <div style={{ fontSize: '1.5vw' }}>Email:contact@jaldide.com</div>
      </div>
      <Navbar bg='white' variant='light' expand='lg'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Brand href='/'>
          <img
            alt=''
            src={image}
            width='175'
            height='70'
            className='d-inline-block align-top'
          />
        </Navbar.Brand>

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {'  '}
            {sellerInfo ? (
              <>
                <Nav.Link href='/seller/register'>Manage Inventory</Nav.Link>
                <Nav.Link href='/seller/register'>Manage Orders</Nav.Link>
              </>
            ) : (
              <Nav.Link href='/seller/register'>Create Your Own Shop</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          {userInfo || sellerInfo ? (
            console.log('hi')
          ) : (
            <Button href='/user/register'>sign up</Button>

            // <Link to='/users/signin'>Sign In</Link>
          )}{' '}
          {userInfo || sellerInfo ? (
            <>
              <h5>
                {' '}
                Hi,{!sellerInfo ? <>{userInfo.name}</> : <>{sellerInfo.name}</>}
              </h5>
              <Button
                onClick={logout}
                href='/'
                variant='outlined'
                style={{ margin: 20 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Dropdown drop='down' margin='20'>
              <Dropdown.Toggle variant='success' id='collasible-nav-dropdown'>
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
        <Link to='/cart'>
          <IconButton>
            <Badge badgeContent={cartItems.length} color='secondary'>
              {' '}
              <Cart></Cart>
            </Badge>
          </IconButton>
        </Link>
      </Navbar>
    </div>
  );
}
