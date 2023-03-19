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
  Accordion,
  Modal,
  Card,
  Carousel,
} from "react-bootstrap";
import NavBar from "../navbar";
import { Link } from "react-router-dom";

import services from "../../data/services";
import {
  TokenContext,
  LoadingContext,
  LoginContext,
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
              <s style={{ color: "red", marginLeft: 3 }}>
                {data.discount !== "." ? data.discount : null}
              </s>
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
        <img className="hpimage" src={IMAGE.dawei} alt="First slide" />
        <Carousel.Caption>
          <h3>Dawei</h3>
          <p>
            Dawei is the capital of Tanintharyi Region, the southern part of
            Myanmar. Historically, it has been an important trading port. Dawei
            is dotted with islands, beautiful beaches and famous historical
            pagodas.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="hpimage" src={IMAGE.maungmakan} alt="Second slide" />

        <Carousel.Caption>
          <h3>Maungmagan</h3>
          <p>
            Maungmagan is one of the most popular beaches and a village located
            near Dawei, in southern Myanmar. It is the second oldest beach after
            Ngapali and is among the top tourist attractions for people looking
            for a beach holiday in the country.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="hpimage" src={IMAGE.myawyit} alt="Third slide" />

        <Carousel.Caption>
          <h3>Myaw Yit Pagoda</h3>
          <p>
            Myaw Yit Pagoda is a Buddhist pagoda located in Dawei off the coast
            of Maungmagan Beach. It is situated on a small island surrounded by
            the sea, and that makes it worth visiting as the temple isn't
            otherwise unique. A wooden bridge connects the pagoda with the
            shore, and there are a few viewpoints near the temple which are
            hotspots among the tourists for witnessing gorgeous sunsets.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="hpimage" src={IMAGE.paradisebeach} alt="Fouth slide" />

        <Carousel.Caption>
          <h3>Paridase Beach</h3>
          <p>
            Paradise Beach is one of the most popular beaches located close to
            the city of Dawei in Myanmar. It is a white sand beach surrounded by
            dense jungle, and is cleaner and scenic compared to others close to
            the town, making it a famous hangout place for the locals during the
            weekends and holidays. Tourists can enjoy swimming and snorkelling
            on Paradise beach.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="hpimage" src={IMAGE.grandbeach} alt="Fouth slide" />

        <Carousel.Caption>
          <h3>Grandfather Beach</h3>
          <p>
            Grandfather Beach is located close to the town of Dawei in Myanmar.
            It is one of the cleanest and most beautiful beaches in the region
            with clear turquoise waters. The beach is vast and clean, and also
            receives fewer visitors compared to others in southern Myanmar,
            making it a recommended attraction for tourists to enjoy a quiet
            beach holiday
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


  const { isLoginS, setIsLoginS } = useContext(LoginContext);
  useEffect(() => {
    setIsLoginS(false)
  })

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
            <Col sm={12} md={6} lg={3} >
              <div className="SerCard">
                <img src={IMAGE.bus} />
                <h4>Modern Express Bus</h4>
                <p style={{ textAlign: "justify" }}>
                  Modern express bus services offer a comfortable, efficent, and
                  eco-friendly mode of transportation for travelers.
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <div className="SerCard">
                <img src={IMAGE.telephone} />
                <h4>Call</h4>
                <p style={{ textAlign: "justify" }}>
                  Call services are a critical component of the traveling system, providing travelers with a quick and easy way to access support and assistance.
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <div className="SerCard">
                <img src={IMAGE.hotel} />
                <h4>Hotel</h4>
                <p style={{ textAlign: "justify" }}>
                  Hotels provide travelers with a comfortable and convenient
                  place to stay, whether they're on a leisure trip or a business
                  trip.
                </p>
              </div>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <div className="SerCard">
                <img src={IMAGE.fan} />
                <h4>AirCon Bus</h4>
                <p style={{ textAlign: "justify" }}>
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
      <section>
        <Container>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Booking Cancellation Policy</Accordion.Header>
              <Accordion.Body>
                {/* <p className={'tmtcpolicy'}>
          At TMT Agency, we understand that plans can change and we strive to be flexible while also ensuring the smooth running of our operations. However, cancellations can cause inconvenience and financial losses for our company. Therefore, we have put in place the following policy regarding booking cancellations:

Cancellation Requests: If you need to cancel your booking, please notify us as soon as possible by contacting our customer service team. You can do so by phone, email or through our website. We will confirm the cancellation and send you an email detailing the cancellation.

Cancellation Fees: If you cancel your booking, you may be charged a cancellation fee. The amount of the fee will depend on the specific circumstances of your booking and will be determined at the time of cancellation.

Refunds: If you cancel your booking, we may not be able to offer you a refund. However, we will try our best to offer you an alternative service or reschedule your booking if possible. Refunds will only be issued in exceptional circumstances and at the discretion of TMT Agency.

No-Show Policy: If you fail to show up for your booking without notifying us in advance, you will be charged the full amount of the booking.

Changes to Bookings: If you need to make changes to your booking, please contact us as soon as possible. We will do our best to accommodate your request, but changes may be subject to availability and additional fees.

Force Majeure: In the event of unforeseen circumstances beyond our control, such as natural disasters or pandemics, TMT Agency reserves the right to cancel bookings without penalty or refund.

We appreciate your understanding of our cancellation policy. By making a booking with TMT Agency, you agree to comply with this policy. If you have any questions or concerns, please do not hesitate to contact us.
          </p> */}
                <h3>TMT Agency Booking Cancellation Policy</h3>
                <p>At TMT Agency, we understand that plans can change and sometimes it becomes necessary to cancel a booking. However, we have certain policies in place to ensure that our business runs smoothly and our clients receive the best possible service.</p>
                <h4>Cancellation Policy</h4>
                <p>If you need to cancel your booking with TMT Agency, please do so as soon as possible. We require a minimum of 48 hours' notice prior to the scheduled booking time. If you cancel within 48 hours of the scheduled booking time, you will not be eligible for a refund.</p>
                <h4>No Refunds for Cancellations</h4>
                <p>Please note that we do not offer refunds for cancelled bookings. If you cancel a booking, we will not be able to pay your money back to you. We appreciate your understanding in this matter.</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

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
            <a href="#/profile">Profile</a>
            <br />
          </Col>
          <Col>
            <a
              href={
                infodata &&
                "mailto:" + infodata.email}
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
