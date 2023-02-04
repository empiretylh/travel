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
import { ArrowRightCircle, GeoAlt, Search,Phone } from "react-bootstrap-icons";
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
              <div className={"hshowmore"}>
                <div>Show More</div>{" "}
                <ArrowRightCircle
                  size={18}
                  style={{ marginLeft: 5 }}
                  size={18}
                />
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
                  We use modem express bus to traveler more comfortable to
                  travel.
                </p>
              </div>
            </Col>
            <Col>
              <div className="SerCard">
                <img src={IMAGE.food} />
                <h4>Food</h4>
                <p>
                  We use modem express bus to traveler more comfortable to
                  travel.
                </p>
              </div>
            </Col>
            <Col>
              <div className="SerCard">
                <img src={IMAGE.hotel} />
                <h4>Hotel</h4>
                <p>
                  We use modem express bus to traveler more comfortable to
                  travel.
                </p>
              </div>
            </Col>
            <Col>
              <div className="SerCard">
                <img src={IMAGE.fan} />
                <h4>AirCon Bus</h4>
                <p>
                  We use modem express bus to traveler more comfortable to
                  travel.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <h2 style={{fontFamily:'Roboto-Bold'}}>Contact Us</h2>
          <Row>
            <Col>{cinfo_data.data && 
            <div>
              <div>
                <Phone/>
              </div>
            </div>}</Col>
            <Col>
              <div class="mapouter">
                <div class="gmap_canvas">
                  <iframe
                    src="https://maps.google.com/maps?q=university%20of%20computer%20studies%20dawei&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                    id="gmap_canvas"
                  
                    style={{
                      width:'100%',
                      height:400,
                  
                    }}
                  ></iframe>
                  <a href="https://fnfmods.net">fnf mod</a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};
export default Home;

const isData = (d = []) => {
  return d.length >= 1;
};
