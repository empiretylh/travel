/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useContext , useEffect} from "react";

import {
  Col,
  Row,
  Container,
  Table,
  Form,
  InputGroup,
  Button,
  Modal,
  Card,
} from "react-bootstrap";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

import services from "../data/services";
import { TokenContext, VotingCodeContext,CAContext } from "../context/Context";
import { useMutation, useQuery } from "react-query";
import QRCode from "react-qr-code";
import { IMAGE } from "../../assets/assets";

const Home = () => {


  const {is_clientview,setClietView} = useContext(CAContext);

  useEffect(()=>{
    setClietView(true);
  })


  return (
    <div className="home">
      <Container className="home_container">
        <Row>
          <Col>
            <div style={{ backgroundColor: "whtie" }}>
              <h1>Travel Booking</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Home;
