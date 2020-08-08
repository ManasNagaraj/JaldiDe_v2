import React, { Component } from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image from '../cart.png';
import { useSelector } from 'react-redux';
import Cookie from 'js-cookie';

export default function Navstuff(props) {
  
      const userSignin = useSelector(state => state.userSignin);
      const { loading, userInfo, error } = userSignin;

      const sellerSignin = useSelector(state => state.sellerSignin);
      const {  sellerInfo } = sellerSignin;

        return (
            <div >
              <Navbar bg="light" variant="light" expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand href="/" >
                  <img
                    alt=""
                    src={image}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}
                  JaldiDe
                </Navbar.Brand>
              
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="#home">Sell</Nav.Link>
                    <Nav.Link href="#home">Manage Inventory</Nav.Link>
                    <Nav.Link href="#home">How does it Work!</Nav.Link>
                    <NavDropdown title="Account" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Admin</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">User</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>

                <Navbar.Text>
                  <a href="/cart"><h5>MyCart</h5></a>
                  {
                  userInfo ? <div>Signed in as: <a href="#login">{userInfo._id}</a> </div>:
                  <Link to="/users/signin">Sign In</Link>
                  }
                  {
                  sellerInfo ? <div>Signed in as Seller: <a href="#login">{sellerInfo._id}</a> </div>:
                  <Link to="/users/signin">Sign In</Link>
                  }
                </Navbar.Text>
        
              </Navbar>
            </div>
        )
}

