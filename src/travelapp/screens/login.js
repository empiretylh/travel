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
const Login = () => {

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

  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState(
    "Username Or Password is incorrect. Please try agian. If you forgot your password contact your adminstatior."
  ); 

  const [phoneno,setPhoneno] = useState(false);


  const l_username = useRef(0);
  const l_password = useRef(0);

  const r_name = useRef(0);
  const r_username = useRef(0);
  const r_email = useRef(0);
  const r_phoneno = useRef(0);
  const r_password = useRef(0);
  const r_address = useRef(0);
  const Register = useMutation(services.register, {
    onSuccess: (e) => {
      // localStorage.setItem("user_token", e.data.token);
      // setToken(e.data.token);
      setIsLoading(false);
      setIsRegister(false);
      // setSsShow(true);
    },
    onMutate: (e) => {
      setIsLoading(true);
      // console.log('mutating')
    },
    onError: (e) => {
      setIsLoading(false);
      setModalText(
       "If your username already exists on our server, you cannot register with that username. Please choose a different username to complete the registration process."
      );
      setModalShow(true);
    },
  });

  const ONRegisterClick = () => {
    if (
      r_name.current.value &&
      l_username.current.value &&
      r_email.current.value &&
      r_phoneno.current.value &&
      r_password.current.value
    ) {
      Register.mutate({
        name: r_name.current.value,
        username: l_username.current.value,
        email: r_email.current.value,
        phoneno: r_phoneno.current.value,
        password: r_password.current.value,
        is_admin: false,
        address: r_address.current.value,
      });
    } else {
      alert("Please fill require fields.");
    }
    // console.log(r_name.current.value)
  };



  const LoginS = useMutation(services.login, {
    onSuccess: (e) => {
      localStorage.setItem("user_token", e.data.token);
      axios.defaults.headers.common = {
        Authorization: `Token ${e.data.token}`,
      };
      if (e.data.is_admin) {
        setIsAdmin(true);
        window.location.href = '#/admin'
        localStorage.setItem("user_isadmin", true)
      } else {
        setIsAdmin(false);
        window.location.href = '#/home'
        localStorage.setItem("user_isadmin", false)
      }


      // history.goBack()


      setToken(e.data.token);
      setIsLoading(false);
      console.log('data', e.data);

      if (params.gobackurl) {
        window.location.href = '#/packages/' + params.gobackurl;
      }


    },
    onMutate: (e) => {
      setIsLoading(true);
    },
    onError: (e) => {
      setModalText(
        "Username Or Password is incorrect. Please try agian. If you forgot your password contact your adminstatior."
      );
      setModalShow(true);
      setIsLoading(false);
    },
  });

  const onLoginClick = () => {
    LoginS.mutate({
      username: l_username.current.value,
      password: l_password.current.value,
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
          <Button variant={"danger"} onClick={(e) => setModalShow(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (IsRegister) {
            ONRegisterClick();
          } else {

            onLoginClick();
          }


        }}
        className={"loginForm"}
      >
        <h3 style={{ color: "#000", fontFamily: "Roboto-Light" }}>
          TMT Agency
        </h3>
        {IsRegister ?
          <Form.Group className="mb-3" controlId="login-control">
            <Form.Group className={"mb-3"}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Username"
                required
                ref={l_username}
              />
              <Form.Text>Username could not be space.</Form.Text>
            </Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              // type="username"
              className="mb-3"
              placeholder="Full Name"
              required
              ref={r_name}
            />
             <Form.Label>Email</Form.Label>
          <div className={'mb-3'} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Form.Control
              type="email"
              placeholder="mgmg@travel.com"
              required
              onChange={e=>setPhoneno(e.target.value)}
              ref={r_email}
            />
            <div style={{marginLeft:5}}>
           {checkEmail(r_email.current && r_email.current.value)?
                                          <CheckCircleFill size={18} color={'green'}/>:
                                          <XCircleFill size={18} color={'red'}/>}
                                          </div>
                                          </div>

            <Form.Label>Phone Number</Form.Label>
          <div className={'mb-3'} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Form.Control
              type="number"
              placeholder="09xxxxxxxxx"
              required
              maxLength={11}
              minLength={11}
              onChange={e=>setPhoneno(e.target.value)}
              ref={r_phoneno}
            />
            <div style={{marginLeft:5}}>
           {checkPhone(r_phoneno.current && r_phoneno.current.value)?
                                          <CheckCircleFill size={18} color={'green'}/>:
                                          <XCircleFill size={18} color={'red'}/>}
                                          </div>
                                          </div>
                   
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Address"
              required
              ref={r_address}
            />
            <Form.Group className={"mb-3"}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={sPassword  ? "text":"password"}
                placeholder="Password"
                required
                ref={r_password}
              />
              <Form.Text>Password must be contains letters and numbers</Form.Text>
            </Form.Group>
            <div onClick={() => setSPassword(prev => !prev)} className="mb-3">
              <Form.Check
                type="checkbox"
                value={sPassword}
                checked={sPassword}
                label="Show Password"
              />
            </div>
            <Button
              type="submit"
              className={"loginbtn mb-3"}
            >
              Register
            </Button>
            <Button
              type="submit"
              className={"loginbtn mb-3"}
              onClick={() => setIsRegister(false)}
            >
              Login
            </Button>
          </Form.Group>
          :
          <Form.Group className="mb-3" controlId="login-control">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              className="mb-3 loginfield"
              placeholder="Username"
              ref={l_username}
              required
            />

            <Form.Label>Password</Form.Label>
            <Form.Control
              type={sPassword?"text":"password"}
              className="loginfield"
              placeholder="Password"
              required
              ref={l_password}
            />
            <div onClick={() => setSPassword(prev => !prev)} className="mb-3">
              <Form.Check
                type="checkbox"
                value={sPassword}
                checked={sPassword}
                label="Show Password"

              />
            </div>
            <Button
              type="submit"
              className={"loginbtn mb-3"}

            >
              Login
            </Button>
            <Button
              className={"registerbtn"}

              onClick={() =>
                setIsRegister(true)}

            >
              Register
            </Button>

          </Form.Group>}
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

export default Login;




const checkPhone=(a)=>{
  console.log(a)
  const regex = /^\d{11}$/;
  return regex.test(a);
}

const checkEmail = (a)=>{
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(a);
}