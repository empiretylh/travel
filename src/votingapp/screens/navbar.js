import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { IMAGE } from "../../assets/assets";
import { LogoutContext } from "../context/Context";

const NavigationBar = () => {
  return (
    <Navbar fixed="top" className="navbar">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Booking</Nav.Link>
          <Nav.Link href="#pricing">Maps</Nav.Link>
          <Nav.Link href="#pricing">About</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default React.memo(NavigationBar);
