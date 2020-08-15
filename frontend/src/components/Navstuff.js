import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import image from "../cart.png";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";

export default function Navstuff(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const sellerSignin = useSelector((state) => state.sellerSignin);
  const { sellerInfo } = sellerSignin;

  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand href="/">
          <img
            alt=""
            src={image}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          JaldiDe
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Sell</Nav.Link>
            <Nav.Link href="manageinventory">Manage Inventory</Nav.Link>
            <Nav.Link href="howdoesitwork">How does it Work!</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Admin</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">User</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        {/* prev code for showing whose signed in */}
        {/* <Navbar.Text>
          {userInfo ? (
            <div>
              Signed in as: <a href="#login">{userInfo._id}</a>{" "}
            </div>
          ) : (
            <Link to="/users/signin">Sign In As a User</Link>
          )}
          {sellerInfo ? (
            <div>
              Signed in as Seller: <a href="#login">{sellerInfo._id}</a>{" "}
            </div>
          ) : (
            <Link to="/users/signin">Sign In as a Seller</Link>
          )}
        </Navbar.Text> */}

        <Nav>
          <Nav.Link href="/cart">My Cart</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            {userInfo || sellerInfo ? (
              <div>Signed In</div>
            ) : (
              <Link to="/users/signin">Sign In</Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}
