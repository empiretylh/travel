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
import {
  ArrowRightCircle,
  GeoAlt,
  Search,
  Telephone,
  Mailbox,
} from "react-bootstrap-icons";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PackageCard = ({ data }) => {
  return (
    <Col xs={12} sm={6} md={4} className="mb-3">
      <Card
        className="pkcard"
        onClick={() => {
          window.location.href = `#/packages/${data.id}`;
        }}
      >
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
          <h3>Beaches</h3>
          <p>You can explore famous beaches in Myanmar</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="hpimage" src={IMAGE.wall2} alt="Second slide" />

        <Carousel.Caption>
          <h3>Cities</h3>
          <p>You can travel famous cities</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="hpimage" src={IMAGE.wall3} alt="Third slide" />

        <Carousel.Caption>
          <h3>Pagodas</h3>
          <p>
           You can travel famous pagoda in myanmar
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
            {package_data.data ? (
              <>
                {isData(packagedata) ? (
                  packagedata.map((item, id) => (
                    <PackageCard data={item} key={id} />
                  ))
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <h4>No Packages To Show</h4>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={IMAGE.error} style={{ width: 300, height: 300 }} />
                <h3 style={{ fontFamily: "Roboto-Black" }}>
                  Cannot Connect To Server
                </h3>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className={"hshowmore"}
                onClick={() => {
                  window.location.href = "#/packages";
                }}
              >
                <div>Show More</div>{" "}
                <ArrowRightCircle size={18} style={{ marginLeft: 5 }} />
              </div>
            </div>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <h2 style={{ fontFamily: "Roboto-Bold" }}>Services</h2>
          <p>
            There are many services offer in our company. There are some popular
            services.
          </p>
          <Row style={{ marginTop: 10 }}>
            <Col>
              <div className="SerCard">
                <img src={IMAGE.bus} />
                <h4>Modem Express Bus</h4>
                <p>
                  Modern express bus services offer a comfortable, efficent, and
                  eco-friendly mode of transportation for travelers.
                </p>
              </div>
            </Col>
            <Col>
              <div className="SerCard">
                <img src={IMAGE.food} />
                <h4>Food</h4>
                <p>
                  Food is an integral part of any travel experience, and
                  traveler can choose from a variety of food services such as
                  restaurants, cafes, and fast food chains.
                </p>
              </div>
            </Col>
            <Col>
              <div className="SerCard">
                <img src={IMAGE.hotel} />
                <h4>Hotel</h4>
                <p>
                  Hotels provide travelers with a comfortable and convenient
                  place to stay, whether they're on a leisure trip or a business
                  trip. From budget-friendly options to luxury hotels.
                </p>
              </div>
            </Col>
            <Col>
              <div className="SerCard">
                <img src={IMAGE.fan} />
                <h4>AirCon Bus</h4>
                <p>
                  AirCon Bus is a luxury bus service that provides a comfortable
                  and convenient way to travel.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <h2 style={{ fontFamily: "Roboto-Bold" }}>Contact Us</h2>
          <Row>
            <Col
              lg={6}
              md={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {cinfo_data.data && (
                <div className="conantuswrap">
                  <h4>
                    <Telephone size={25} /> {infodata.phoneno}
                  </h4>
                  <h4>
                    <Mailbox size={25} /> {infodata.email}
                  </h4>
                  <h4>
                    <GeoAlt size={25} /> {infodata.companyaddress}
                  </h4>
                </div>
              )}
            </Col>
            <Col lg={6} md={12}>
              <div class="mapouter">
                <div class="gmap_canvas">
                  <iframe
                    src="https://maps.google.com/maps?q=university%20of%20computer%20studies%20dawei&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                    id="gmap_canvas"
                    style={{
                      width: "100%",
                      height: 300,
                    }}
                  ></iframe>
                  <a href="https://fnfmods.net">fnf mod</a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="lastelement">
        <h4>Company Info</h4>
        <Row>
        
            <Col>
              <a href="#/packages">Packages</a>
              <br />
              <a href="#/bookings">Booking</a>
              <br />
            
              <a href="#/about">About</a>
              <br />
              <a href="#/bookings">Check Code</a>
              <br />
            </Col>
            <Col>
              <a
                href={
                  infodata &&
                  "https://mail.google.com/mail/u/" +
                    infodata.email +
                    "/#compose"
                }
              >
                Email
              </a>
              <br />
              <a href={infodata && "tel:" + infodata.phoneno}>Phone Number</a>
              <br />
          
              <a href="#/admin">Admin</a>
              <br />
              <a href="#/login">Login</a>
              <br />
            </Col>
      
          <Col md={12} lg={4}>
            {cinfo_data.data && (
              <div className="conantuswrap">
                <h4>
                  <Telephone size={25} /> {infodata.phoneno}
                </h4>
                <h4>
                  <Mailbox size={25} /> {infodata.email}
                </h4>
                <h4>
                  <GeoAlt size={25} /> {infodata.companyaddress}
                </h4>
              </div>
            )}
          </Col>
        </Row>
      </section>
    </div>
  );
};
export default Home;

const isData = (d = []) => {
  return d.length >= 1;
};
