import React, { useState, useRef, useContext } from "react";
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

import services from "../data/services";
import { TokenContext } from "../context/Context";
import { useMutation } from "react-query";
import { IMAGE } from "../../assets/assets";
const Login = () => {
  const loginSubmit = () => {
    console.log("Login Submit");
  };

  const { token, setToken } = useContext(TokenContext);

  const [isLoading, setIsLoading] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState(
    "Username Or Password is incorrect. Please try agian. If you forgot your password contact your adminstatior."
  );


  const l_username = useRef(0);
  const l_password = useRef(0);

  const LoginS = useMutation(services.login, {
    onSuccess: (e) => {
      localStorage.setItem("user_token", e.data.token);
      window.location.href = 'home'
      setToken(e.data.token);
      setIsLoading(false);

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
                  onLoginClick();
                }}
                className={"loginForm"}
              >
                <h3 style={{ color: "#fff", fontFamily: "Roboto-Light" }}>
               Travel Admin
                </h3>
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
                    type="password"
                    className="mb-3 loginfield"
                    placeholder="Password"
                    required
                    ref={l_password}
                  />

                  <Button
                    type="submit"
                    className={"loginbtn"}
                   
                  >
                    Login
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

export default Login;
