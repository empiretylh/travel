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
  Modal,
} from "react-bootstrap";
import NavBar from "../navbar";
import { Link, useParams } from "react-router-dom";

import services from "../../data/services";
import { TokenContext, BookedContext, CAContext } from "../../context/Context";
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

const Booking = () => {
  const { is_clientview, setClietView } = useContext(CAContext);

  const [searchText, setSearchText] = useState("");

  // const package_data = useQuery("package_data", services.getPackage);
  const [tcdata, setTcData] = useState(null);
  const { booked, setBooked } = useContext(BookedContext);
  const [showNTC, setShowNTC] = useState(false);

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
  });

  const onSearch = (travelcode) => {
    setTcData((old) => (old ? old.concat([travelcode]) : [travelcode]));
    booked_data.refetch();
    // setSearchText('')
  };

  return (
    <div className="home">
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
          <h2 style={{ fontFamily: "Roboto-Bold" }}>Founder</h2>
          <Container>
            <Row>
              <Col md={12} lg={4} style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                <img
                  src={IMAGE.tzp}
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: 160,
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col md={12} lg={8}>
                <div style={{ marginLeft: 10 }}>
                  <h4>Thwe Zin Phyo</h4>
                  <p>
                    Thwe Zin Phyo graduated from the University of Computer
                    Studies (Dawei) with a degree in computer science. She is
                    currently working as a software developer at a tech company
                    in Yangon, Myanmar. Her job involves designing and
                    implementing software applications for clients, as well as
                    troubleshooting and maintaining existing software systems.
                  </p>
                </div>
              </Col>
            </Row>
            <Row style={{marginTop:13}}>
              <Col md={12} lg={4} style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                <img
                  src={IMAGE.tmt}
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: 160,
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col md={12} lg={8} >
                <h4>Thin Myat Thazin Aye</h4>
                <p>
                  Thin Myat Thazin Aye graduated from the University of Computer
                  Studies (Dawei) with 
                  a degree in computer science. She is currently working as a
                  software developer at 
                  a tech company in Naypyi Taw, Myanmar. Her job involves
                  coding, debugging, and working on UI/UX design.
                 
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        <div
          style={{
            marginTop: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontFamily: "Roboto-Bold" }}>
            Programming Languages & Tools
          </h2>
          <Container style={{ marginTop: 30 }}>
            <Row>
              <Col>
                <img
                  src={IMAGE.pythonlogo}
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                />
                <div style={{ marginLeft: 10 }}>
                  <h4>Python</h4>
                </div>
              </Col>
              <Col>
                <img
                  src={IMAGE.jslogo}
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                />
                <div style={{ marginLeft: 10 }}>
                  <h4>JavaScript</h4>
                </div>
              </Col>
              <Col>
                <img
                  src={IMAGE.reactlogo}
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                />
                <div style={{ marginLeft: 10 }}>
                  <h4>React</h4>
                </div>
              </Col>
              <Col>
                <img
                  src={IMAGE.djangologo}
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                />
                <div style={{ marginLeft: 10 }}>
                  <h4>Django</h4>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};
export default Booking;

const isData = (d = []) => {
  return d.length >= 1;
};
