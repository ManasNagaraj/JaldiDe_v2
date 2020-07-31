import React, { Component } from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import image from '../cart.png';

export class Navstuff extends Component {
    render() {
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
                  {/* Signed in as: <a href="#login">Harsh</a> */}
                  <a href="/cart"><h5>MyCart</h5></a>
                </Navbar.Text>
        
              </Navbar>
            </div>
        )
    }
}

export default Navstuff
