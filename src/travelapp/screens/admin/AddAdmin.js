import React, { useState, useContext, useRef, useEffect } from "react";

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
import { PersonAdd } from "react-bootstrap-icons";

import services from "../../data/services";
import {
  TokenContext,
  LoadingContext,
  NavigationContext,
  LoginContext,
  CAContext,
} from "../../context/Context";
import { useMutation } from "react-query";
import { IMAGE } from "../../../assets/assets";

const AddAdmin = () => {
  const r_name = useRef(0);
  const r_username = useRef(0);
  const r_email = useRef(0);
  const r_phoneno = useRef(0);
  const r_password = useRef(0);
  const r_address = useRef(0);

  const { setClietView } = useContext(CAContext);
  const { active, UpdateActive } = useContext(NavigationContext);


  
   const {isLoginS,setIsLoginS} = useContext(LoginContext);
   useEffect(()=>{
    setIsLoginS(false)
   })


  useEffect(() => {
    // console.log("You Entering.....");
    UpdateActive("admin");
    setClietView(false);
  }, []);

  const [modalShow, setModalShow] = useState(false);

  const [ssShow, setSsShow] = useState(false);
  const { is_loading, setIsLoading } = useContext(LoadingContext);
  const Register = useMutation(services.register, {
    onSuccess: (e) => {
      // localStorage.setItem("user_token", e.data.token);
      // setToken(e.data.token);
      setIsLoading(false);
      setSsShow(true);
    },
    onMutate: (e) => {
      setIsLoading(true);
      // console.log('mutating')
    },
    onError: (e) => {
      setIsLoading(false);
      // setModalText(
      // 	"Register Error, When your username is exisiting in our server, You cannot not register, So change your username to register."
      // );
      setModalShow(true);
    },
  });

  const ONRegisterClick = () => {
    if (
      r_name.current.value &&
      r_username.current.value &&
      r_email.current.value &&
      r_phoneno.current.value &&
      r_password.current.value
    ) {
      Register.mutate({
        name: r_name.current.value,
        username: r_username.current.value,
        email: r_email.current.value,
        phoneno: r_phoneno.current.value,
        password: r_password.current.value,
        address : r_address.current.value,
        is_admin:true
      });
    } else {
      alert("Please fill require fields.");
    }
    // console.log(r_name.current.value)
  };

  return (
    <div className={"pages addadmin"}>
      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "red" }}>Error</h4>
          <p style={{ color: "red", fontFamily: "Roboto-Regular" }}>
            {
              "Register Error, When your username is exisiting in our server, You cannot not register, So change your username to register."
            }
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"danger"} onClick={(e) => setModalShow(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={ssShow}
        onHide={() => setSsShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "black" }}>Register Success</h4>
          <p
            style={{
              color: "black",
              fontSize: 20,
              fontFamily: "Roboto-Regular",
            }}
          >
            Successfully Registerd New Admin.
          </p>
          <p style={{}}>
            New Admin can control like you. This New Admin can add, delete and
            edit packages and booking.{" "}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"primary"} onClick={(e) => setSsShow(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={"registerform"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PersonAdd size={30} />
          <h3 style={{ color: "#000" }}>Register New Admin</h3>
        </div>

        <Form.Group className="mb-3" controlId="register-control">
          <Form.Label>New Admin Name</Form.Label>
          <Form.Control
            type="username"
            className="mb-3"
            placeholder="Admin Name"
            required
            ref={r_name}
          />
          <Form.Group className={"mb-3"}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Username"
              required
              ref={r_username}
            />
            <Form.Text>Username cannot be space.</Form.Text>
          </Form.Group>

          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            className="mb-3"
            placeholder="mgmg@travel.com"
            required
            ref={r_email}
          />

          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            className="mb-3"
            placeholder="09xxxxxxxxx"
            maxLength={11}
            minLength={11}
            required
            ref={r_phoneno}
          />

          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            className="mb-3"
            placeholder="Address"
            required
            ref={r_address}
          />
          <Form.Group className={"mb-3"}>
            <Form.Label>New Admin Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              ref={r_password}
            />
            <Form.Text>Password must be contains letters and numbers</Form.Text>
          </Form.Group>
          <Button
            type="submit"
            variant="success"
            style={{ width: "100%", marginBottom: 10 }}
            onClick={ONRegisterClick}
          >
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddAdmin;
