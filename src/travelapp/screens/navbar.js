import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav,Offcanvas } from "react-bootstrap";
import { IMAGE } from "../../assets/assets";
import { LogoutContext, CAContext, TokenContext } from "../context/Context";

const NavigationBar = () => {
  const { is_clientview, setClietView } = useContext(CAContext);
  const { token, setToken } = useContext(TokenContext);

  return (
    <Navbar collapseOnSelect expand='lg' fixed="top" className="navbar">
      <Container>
        <Navbar.Brand style={{ fontFamily: "Roboto-Bold" }}>
          <img
            src={IMAGE.logo}
            style={{ width: 60, height: 60, objectFit: "contain" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg}`} />
           <Navbar.Offcanvas>
           <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  TMT
                </Offcanvas.Title>
              </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="home">Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="packages">Packages</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="bookings">Booking</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="about">About</Link>
          </Nav.Link>
          <Nav.Link>
            {token ? (
              <Link to="admin" onClick={() => setClietView(false)}>
                Admin
              </Link>
            ) : (
              <Link to="login">Login</Link>
            )}
          </Nav.Link>
        </Nav>
        </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default React.memo(NavigationBar);
