import React, { useContext,useState,useMemo } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav,Offcanvas } from "react-bootstrap";
import { IMAGE } from "../../assets/assets";
import services from "../data/services";
import { LogoutContext, CAContext, TokenContext,IsAdminContext } from "../context/Context";
import {useQuery} from 'react-query';
const NavigationBar = () => {
  const { is_clientview, setClietView } = useContext(CAContext);
  const { token, setToken } = useContext(TokenContext);
  const [shown,setShow] = useState(false);


  const {isAdmin,setIsAdmin} = useContext(IsAdminContext);
  const UserData = useQuery(['clientuser', 'one'], services.getClientUser)

  const currentUser = useMemo(() => {
    if (UserData.data) {
      console.log(UserData.data.data)
      return UserData.data.data
    }
  }, [UserData.data])

  return (
    <Navbar collapseOnSelect expand='lg' fixed="top" className="navbar">
      <Container style={{marginTop:-8}}>
        <Navbar.Brand style={{ fontFamily: "Roboto-Bold" }}>
          <img
            src={IMAGE.logo}
            style={{ width: 60, height: 60, objectFit: "contain" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg}`} onClick={()=>setShow(true)} />
           <Navbar.Offcanvas show={shown} onHide={()=>setShow(false)}>
           <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  TMT
                </Offcanvas.Title>
              </Offcanvas.Header>
        <Offcanvas.Body>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="home" onClick={()=>setShow(false)}>Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="packages"  onClick={()=>setShow(false)}>Packages</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="bookings"  onClick={()=>setShow(false)}>Booking</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="about"  onClick={()=>setShow(false)}>About</Link>
          </Nav.Link>
         
          <Nav.Link  onClick={()=>setShow(false)}>
            {token ? (<>
               {isAdmin?
              <Link to="admin" onClick={() => setClietView(false)}>
                Admin
              </Link>:
              <Link to="profile">
              {currentUser.name}
              </Link>
            }
            </>
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
