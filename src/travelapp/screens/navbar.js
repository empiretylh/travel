import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { IMAGE } from "../../assets/assets";
import { LogoutContext, CAContext, TokenContext } from "../context/Context";

const NavigationBar = () => {
    const { is_clientview, setClietView } = useContext(CAContext);
    const { token, setToken } = useContext(TokenContext);

    return (
        <Navbar fixed="top" className="navbar">
            <Container>
                <Navbar.Brand style={{ fontFamily: "Roboto-Bold" }}>
                    TRAVEL
                </Navbar.Brand>
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
                            <Link
                                to="admin"
                                onClick={() => setClietView(false)}
                            >
                                Admin
                            </Link>
                        ) : (
                            <Link to="login">Login</Link>
                        )}
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default React.memo(NavigationBar);
