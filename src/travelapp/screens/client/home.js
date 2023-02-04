/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useContext, useEffect, useMemo } from "react";

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
  Carousel,
} from "react-bootstrap";
import NavBar from "../navbar";
import { Link } from "react-router-dom";

import services from "../../data/services";
import {
  TokenContext,
  VotingCodeContext,
  CAContext,
} from "../../context/Context";
import { useMutation, useQuery } from "react-query";
import { IMAGE } from "../../../assets/assets";
import { ArrowRightCircle, GeoAlt, Search } from "react-bootstrap-icons";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PackageCard = ({ data }) => {
  return (
    <Col xs={12} sm={6} md={4} className="mb-3">
      <Card className="pkcard">
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 0,
            margin: 0,
          }}
        >
          <LazyLoadImage
            className={"packageImghome"}
            src={axios.defaults.baseURL + data.image}
            // placeholder={({ imageProps, ref }) => (
            //   <img ref={ref} src="../../assets/travel/travelimage.jpg" {...imageProps} />
            // )}
            placeholderSrc={IMAGE.simpleimage}
          />

          <div style={{ padding: 10 }}>
            <Card.Title>{data.destination}</Card.Title>
            <div className="includeplace">
              <GeoAlt /> {">  "}
              {data.includeplace &&
                data.includeplace.map((data, id) => {
                  return <>{data.placename + " > "}</>;
                })}
              {data.destination}
            </div>
            <div className="packageinfo">
              <p>{nwc(data.cost)}</p>
            </div>
          </div>
          <div className="divider" />
        </Card.Body>
      </Card>
    </Col>
  );
};

function nwc(x = 0) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" Ks");
}

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel>
      <Carousel.Item>
        <img className="hpimage" src={IMAGE.wall1} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="hpimage" src={IMAGE.wall2} alt="Second slide" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="hpimage" src={IMAGE.wall3} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const Home = () => {
  const { is_clientview, setClietView } = useContext(CAContext);

  const [searchText, setSearchText] = useState("");

  const package_data = useQuery("package_data", services.getPackage);

  useEffect(() => {
    setClietView(true);
  });

  const packagedata = useMemo(() => {
    if (package_data.data) {
      const data = package_data.data.data;
      const search = data.filter((d) =>
        d.destination
          .replaceAllTxt(" ", "")
          .toLowerCase()
          .includes(searchText.replaceAllTxt(" ", "").toLowerCase())
      );
      // console.log(search, searchText);
      return search.splice(0, search.length >= 6 ? 6 : search.length);
    }
  }, [package_data.data, searchText]);

  const cinfo_data = useQuery(["cinfodata"], services.getCompanyInfo);

  
  const infodata = useMemo(() => {
    if (cinfo_data.data) {
      return cinfo_data.data.data;
    }
  }, [cinfo_data.data]);

  return (
    <div className="home">
    <section>
      <ControlledCarousel />
      </section>
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontFamily: "Roboto-Bold" }}>Packages We Offer</h2>
          <InputGroup className="hsb">
            <Form.Control
              type="text"
              placeholder="Search Packages"
              className="searchfield"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <Button>
              <Search size={20} style={{ marginLeft: 3 }} />
            </Button>
          </InputGroup>
        </div>

        <Container className="PackageContainer">
          <Row>
            {package_data.data
              ? packagedata.map((item, id) => (
                  <PackageCard data={item} key={id} />
                ))
              : null}

            <div>
              <Button style={{padding:10,display:'flex',justifyContent:'center',alignItems:'center'}}>
                Show More <ArrowRightCircle style={{marginLeft:5}} size={18} />
              </Button>
            </div>
          </Row>
        </Container>
      </section>
      <section>
      <Container>
        <h3>Services</h3>
        <Row>
          {cinfo_data.data && JSON.stringify(infodata)}
        </Row>
        </Container>
      </section>
      <section>
      <Container>
        <h3>Contact Us</h3>
        <Row>
          {cinfo_data.data && JSON.stringify(infodata)}
        </Row>
        </Container>
      </section>
    </div>
  );
};
export default Home;
