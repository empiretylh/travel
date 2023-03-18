/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useContext, useEffect, useMemo } from "react";

import {
  Col,
  Card,
  Carousel,
  InputGroup,
  Form,
  Button,
  Container,
  Row,
  Table,
  Image,
  Modal,
} from "react-bootstrap";
import NavBar from "../navbar";
import { Link, useParams } from "react-router-dom";

import services from "../../data/services";
import { TokenContext, BookedContext, CAContext,LoginContext,IsAdminContext } from "../../context/Context";
import { useMutation, useQuery } from "react-query";
import { IMAGE } from "../../../assets/assets";
import {
  ArrowRightCircle,
  GeoAlt,
  Search,
  Telephone,
  Mailbox,
} from "react-bootstrap-icons";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TravelCard = ({ data }) => {
  return (
    <div>
      <h3>{data.travelcode}</h3>
    </div>
  );
};

function nwc(x = 0) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" Ks");
}

const Profile = () => {
  const { is_clientview, setClietView } = useContext(CAContext);

   const {isLoginS,setIsLoginS} = useContext(LoginContext);


  const {isAdmin,setIsAdmin} = useContext(IsAdminContext);


  
   const { token, setToken } = useContext(TokenContext);


  const [searchText, setSearchText] = useState("");

  // const package_data = useQuery("package_data", services.getPackage);
  const [tcdata, setTcData] = useState(null);
  const { booked, setBooked } = useContext(BookedContext);
  const [showNTC, setShowNTC] = useState(false);

  const UserData = useQuery(['clientuser','one'],services.getClientUser)


  const currentUser = useMemo(()=>{
    if(UserData.data){
      console.log(UserData.data.data)
      return UserData.data.data
    }
  },[UserData.data])

  const booked_data = useQuery(
    ["bookeddata", booked.concat(tcdata)],
    services.getBooked,
    {
      onSuccess: (e) => {
        const data = e.data;

        const filter =
          data && data.filter((e) => searchText.includes(e.travelcode));

        if (tcdata) {
          if (filter.length <= 0) {
            setShowNTC(true);
          }
        }
      },
    }
  );

  const bookedata = useMemo(() => {
    if (booked_data.data) {
      return booked_data.data.data;
    }
    return [0];
  }, [booked_data.data]);

  useEffect(() => {
    setClietView(true);
     setIsLoginS(false);
  });

  const [showLogout,setShowLogout] = useState(false);

  const onSearch = (travelcode) => {
    setTcData((old) => (old ? old.concat([travelcode]) : [travelcode]));
    booked_data.refetch();
    // setSearchText('')
  };
  return (
    <div className="home">

      <Modal
        show={showLogout}
        onHide={() => setShowLogout(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "red" }}>Logout</h4>
          <p
            style={{
              color: "red",
              fontSize: 20,
              fontFamily: "Roboto-Regular",
            }}
          >
            Are you sure want to Logout?
          </p>
          
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={"danger"}
            onClick={(e) =>{
               setIsAdmin(false);
              setToken(false);
              services.logout();

              window.location.href='#/home'
              setShowLogout(false);
            }}
          >
            Yes, Logout
          </Button>
            <Button
            variant={"primary"}
            onClick={(e) => setShowLogout(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
          flexDirection: "column",
        }}
      >
        {/* {JSON.stringify(booked_data.data)} */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
       {UserData.data && <Container className="py-5">
             <Row>
               <Col md={3} className="d-flex align-items-center">
                 <Image src={IMAGE.logo} roundedCircle fluid />
               </Col>
               <Col md={9}>
                 <h2 className="mb-4">{currentUser.name}</h2>
                 <p className="mb-3 d-flex-row"><strong>Email:</strong> {currentUser.email}</p>
                 <p className="mb-3 d-flex-row"><strong>Phone:</strong> {currentUser.phoneno}</p>
                 <p className="mb-3 d-flex-row"><strong>Address:</strong> {currentUser.address}</p>
                <Button onClick={()=>setShowLogout(true)} className="mt-4">Update Profile</Button>  
                <Button onClick={()=>setShowLogout(true)} className="mt-4">Chage Information </Button>          
                 <Button onClick={()=>setShowLogout(true)} variant="danger" className="mt-4">Logout</Button>
               </Col>
             </Row>
           </Container>}
        </div>
      </div>
    </div>
  );
};
export default Profile;

const isData = (d = []) => {
  return d.length >= 1;
};
