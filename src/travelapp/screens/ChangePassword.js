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
     axios.defaults.headers.common = {
        Authorization: `Token ${params.resttoken}`,
      };
      console.log(axios.defaults.headers.common)
    setIsLoginS(true)
  })

  const [isLoading, setIsLoading] = useState(false)
  const [smodalShow,setSModalShow] = useState(false); 
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState(
    ""
  ); 



  const r_email = useRef(0);

  const newRef = useRef(0);
  const conRef = useRef(0);


  const ChangePassword = useMutation(services.changepassword, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (e) => {
      setIsLoading(false);
      alert("Password Changed Successful")
      window.location.href = '#/login'

    },
    onError: (e) => {
      setIsLoading(false);
      alert("Invalid Old Password")
    },
  });

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

  const onRese = () => {
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
          <h4 style={{ color: "black" }}>Password Reset</h4>
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
      <Form  className={"loginForm"} onSubmit={e => {
            e.preventDefault();
            if (newRef.current.value === conRef.current.value) {
              ChangePassword.mutate({
               // old_password: oldRef.current.value,
                new_password: conRef.current.value,
              })
            } else {
              alert("Passwords didn't match")
            }
          }}>
          <h3>Change Password</h3>  
            <Form.Group controlId="formName">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type={sPassword ? "text" : "password"}
                ref={newRef}

                // defaultValue={currentUser.name}
                // value={travelerInfo.travelerName}

                placeholder={"New Password"}
                required
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type={sPassword ? "text" : "password"}

                ref={conRef}

                // defaultValue={currentUser.name}
                // value={travelerInfo.travelerName}

                placeholder={"Confirm New Password"}
                required
              />
            </Form.Group>
            <div className ='mb-3' onClick={() => setSPassword(prev => !prev)}>
              <Form.Check
                type="checkbox"
                value={sPassword}
                checked={sPassword}
                label="Show Passwords"

              />
            </div>
            <Button
              style={{
                width: '100%',
                padding: 5,
              }}
              type="submit"
              variant={"primary"}

            >
              Change
            </Button>
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