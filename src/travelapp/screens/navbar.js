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
                        <Link to="login">Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="login">Booking</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="login">Places</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="login">Maps</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="login">About</Link>
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
