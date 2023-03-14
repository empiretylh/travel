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
import { Link , useParams} from "react-router-dom";

import services from "../../data/services";
import {
  TokenContext,
  VotingCodeContext,
  CAContext,
} from "../../context/Context";
import { useMutation, useQuery } from "react-query";
import { IMAGE } from "../../../assets/assets";
import { ArrowRightCircle, GeoAlt, Search,Telephone,Mailbox } from "react-bootstrap-icons";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PackageCard = ({ data }) => {
  return (
    <Col xs={12} sm={6} md={4} className="mb-3">
      <Card className="pkcard" onClick={()=>{
        window.location.href = `#/packages/${data.id}`;
      }}>
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
              <s style={{color:'red',marginLeft:3}}>{data.discount !=='.'?data.discount:null}</s>
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
      return search;
    }
  }, [package_data.data, searchText]);

  

  return (
    <div className="home">
     
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
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
            </div>
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
