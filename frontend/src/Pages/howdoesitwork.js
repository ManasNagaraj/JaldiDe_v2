// Code for how does it work

import React from "react";
import "../css/faqs.css";
import style from "../css/faqs.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function HowdoesitWork() {
  return (
    <divs>
      <Card
        className="text-center"
        style={{ width: "45rem", alignItem: "center" }}
        className="mb-2"
      >
        <Card.Header>How Does It Work!</Card.Header>
        <Card.Body>
          <Card.Title> Step 1 </Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Title> Step 2 </Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Title> Step 3 </Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Card.Text>
        </Card.Body>
      </Card>
    </divs>
  );
}
