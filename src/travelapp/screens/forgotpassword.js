import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Form,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap";

import {
  ArrowRightCircle,
  GeoAlt,
  Search,
  PencilFill,
  Telephone,
  Mailbox,
  CheckCircleFill,
  XCircleFill,
  PhoneFill,
  Chat,
  Send,
  Stars,
  StarFill,
  Star,
} from "react-bootstrap-icons";

import services from "../data/services";
import { TokenContext, LoginContext, IsAdminContext } from "../context/Context";
import { useMutation } from "react-query";
import { IMAGE } from "../../assets/assets";

import { createBrowserHistory } from 'history';


import { useParams } from "react-router-dom";

import axios from "axios";
const ForgotPassword = () => {

  let params = useParams();

  const loginSubmit = () => {
    console.log("Login Submit");
  };



  const { token, setToken } = useContext(TokenContext);
  const { isLoginS, setIsLoginS } = useContext(LoginContext);
  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);


  const [IsRegister, setIsRegister] = useState(false)

  const [sPassword,setSPassword] = useState(false);

  useEffect(() => {
    setIsLoginS(true)
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [smodalShow,setSModalShow] = useState(false); 
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState(
    ""
  ); 



  const r_email = useRef(0);


  const ResetPassword = useMutation(services.resetPassword, {
    onSuccess: (e) => {
      setIsLoading(false);
      setSModalShow(true);
    },
    onMutate: (e) => {
      setIsLoading(true);
    },
    onError: (e) => {
      setModalText("Your email address is not valid for password reset. Please ensure that the email address you entered is correct.");
      setModalShow(true);
      setIsLoading(false);
    },
  });

  const onReset = () => {
    ResetPassword.mutate({
      email:r_email.current.value,
    });
    // console.log(r_name.current.value)
  };

  return (
    <div className="login">
      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "red" }}>Error</h4>
          <p style={{ color: "red", fontFamily: "Roboto-Regular" }}>
            {modalText}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"danger"} onClick={(e) => {
            setModalShow(false)
          }}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={smodalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "black" }}>Password Rest</h4>
          <p style={{ color: "black", fontFamily: "Roboto-Regular" }}>
          A password reset link has been sent to your email address <strong>{r_email.current.value}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"primary"} onClick={(e) => {setSModalShow(false);
            window.location.href='#/login'}}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
         onReset();

        }}
        className={"loginForm"}
      >
        <h3 style={{ color: "#000", fontFamily: "Roboto-Light",textAlign:'center' }}>
        <img src={IMAGE.logo} style={{width:60,height:60}}/>
        </h3>
        <p>Enter the email address associated with your account and we'll send you a link to reset your password</p>
          <Form.Group className="mb-3" controlId="login-control">
            <Form.Label>Email</Form.Label>
        
            <Form.Control
              type="email"
              className="mb-3 loginfield"
              placeholder="Your Account Email"
              ref={r_email}
              required
            />

            <Button
              type="submit"
              className={"loginbtn mb-3"}

            >
              Rest Password
            </Button>
          </Form.Group>
      </Form>


      {isLoading && (
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: 10,
              backgroundColor: "white",
              borderRadius: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={IMAGE.loading}
              style={{ width: 50, height: 50 }}
              alt={"loading"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;




const checkPhone=(a)=>{
  console.log(a)
  const regex = /^\d{11}$/;
  return regex.test(a);
}

const checkEmail = (a)=>{
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(a);
}