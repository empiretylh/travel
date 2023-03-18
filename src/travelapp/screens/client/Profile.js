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
import { TokenContext, BookedContext, CAContext, LoginContext, LoadingContext, IsAdminContext } from "../../context/Context";
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

  const { isLoginS, setIsLoginS } = useContext(LoginContext);


  const { is_loading, setIsLoading } = useContext(LoadingContext);

  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);



  const { token, setToken } = useContext(TokenContext);


  const UserData = useQuery(['clientuser', 'one'], services.getClientUser)

  const [showCP, setShowCP] = useState(false);


  const nameRef = useRef(0);
  const phoneRef = useRef(0);
  const addressRef = useRef(0);
  const emailRef = useRef(0);

  const oldRef = useRef(0);
  const newRef = useRef(0);
  const conRef = useRef(0);

  const currentUser = useMemo(() => {
    if (UserData.data) {
      console.log(UserData.data.data)
      return UserData.data.data
    }
  }, [UserData.data])


  useEffect(() => {
    setClietView(true);
    setIsLoginS(false);
  });



  const editUser = useMutation(services.editUser, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (e) => {
      setIsLoading(false);

      UserData.refetch();

    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const [showLogout, setShowLogout] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

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
            onClick={(e) => {
              setIsAdmin(false);
              setToken(false);
              services.logout();

              window.location.href = '#/home'
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

      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h3>Edit User</h3>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="rname"
              ref={nameRef}
              defaultValue={nameRef.current}

              // defaultValue={currentUser.name}
              // value={travelerInfo.travelerName}

              placeholder={"Name"}
              required
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="remail"
              ref={emailRef}
              defaultValue={emailRef.current}
              // defaultValue={currentUser.name}
              // value={travelerInfo.travelerName}

              placeholder={"Email"}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNo">
            <Form.Label>Phone No</Form.Label>
            <Form.Control
              type="tel"
              name="rphoneno"
              ref={phoneRef}
              placeholder={"09xxxxxxxxx"}
              defaultValue={phoneRef.current}
              maxLength={11}
              minLength={11}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNo">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="textarea"
              name="address"
              ref={addressRef}
              placeholder={"Addresss"}
              defaultValue={addressRef.current}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={"primary"}
            onClick={(e) => {

              editUser.mutate({
                name: nameRef.current.value,
                email: emailRef.current.value,
                phoneno: phoneRef.current.value,
                address: addressRef.current.value
              })

              setShowEdit(false)
            }}
          >
            Change
          </Button>
          <Button
            variant={"danger"}
            onClick={(e) => setShowEdit(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showCP}
        onHide={() => setShowCP(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h3>Change Password</h3>
          <Form.Group controlId="formName">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"

              ref={oldRef}
              defaultValue={nameRef.current}

              // defaultValue={currentUser.name}
              // value={travelerInfo.travelerName}

              placeholder={"Name"}
              required
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"

              ref={newRef}
            
              // defaultValue={currentUser.name}
              // value={travelerInfo.travelerName}

              placeholder={"Email"}
              required
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"

              ref={conRef}
             
              // defaultValue={currentUser.name}
              // value={travelerInfo.travelerName}

              placeholder={"Email"}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={"primary"}
            onClick={(e) => {

              setShowCP(false)
            }}
          >
            Change
          </Button>
          <Button
            variant={"danger"}
            onClick={(e) => setShowCP(false)}
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

                <Button onClick={() => {
                  setShowEdit(true);
                  nameRef.current = currentUser.name
                  emailRef.current = currentUser.email
                  addressRef.current = currentUser.address
                  phoneRef.current = currentUser.phoneno


                }} className="mt-4 mr-3" style={{ marginRight: 3 }}>Update Profile</Button>
                <Button onClick={() => setShowCP(true)} className="mt-4 mr-3" style={{ marginRight: 3 }}>Change Password </Button>
                <Button onClick={() => setShowLogout(true)} variant="danger" className="mt-4 mr-3">Logout</Button>
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
