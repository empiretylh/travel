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
import { useParams } from "react-router-dom";

function nwc(x = 0) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" Ks");
}

const PackageDetail = () => {
  let params = useParams();
  const { is_clientview, setClietView } = useContext(CAContext);

  const [searchText, setSearchText] = useState("");

  const package_data = useQuery(
    ["package_data", params.pkid],
    services.getOnePackage
  );

  useEffect(() => {
    setClietView(true);
  });

  const packagedata = useMemo(() => {
    if (package_data.data) {
      const data = package_data.data.data;

      // console.log(search, searchText);
      return data;
    }
  }, [package_data.data]);

  if (package_data.data) {
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
          <Container>
            <Row>
              <div className="ponebar">
                <div>
                  <h3>{packagedata.destination}</h3>
                  <div className="includeplace">
                    <GeoAlt /> {">  "}
                    {packagedata.includeplace &&
                      packagedata.includeplace.map((data, id) => {
                        return <>{data.placename + " > "}</>;
                      })}
                    {packagedata.destination}
                  </div>
                </div>
                <h4
                  style={{
                    padding: 10,
                    backgroundColor: "#1d4a85",
                    color: "white",
                    borderRadius: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {nwc(packagedata.cost)}
                </h4>
              </div>
            </Row>
            <div className="divider" />
            <Row style={{ marginTop: 15 }}>
              <Row>
                <Col lg={6}>
                  <LazyLoadImage
                    src={axios.defaults.baseURL + packagedata.image}
                    className="pkimgshow"
                    // placeholder={({ imageProps, ref }) => (
                    //   <img ref={ref} src="../../assets/travel/travelimage.jpg" {...imageProps} />
                    // )}
                    placeholderSrc={IMAGE.simpleimage}
                  />
                </Col>
                <Col lg={6}>
                  <div>
                    <h1>Booking</h1>
                  </div>
                </Col>
              </Row>
              <Row>
                <div>
                  <h4>Include Places</h4>
                  <div className='includeplaceslide'>
                  {packagedata.includeplace &&
                    packagedata.includeplace.map((data, id) => {
                      return (
                        <div>
                          <LazyLoadImage
                            src={axios.defaults.baseURL + data.image}
                            
                            // placeholder={({ imageProps, ref }) => (
                            //   <img ref={ref} src="../../assets/travel/travelimage.jpg" {...imageProps} />
                            // )}
                            
                            placeholderSrc={IMAGE.simpleimage}

                          />
                          <h6>{JSON.stringify(data)}</h6>
                        </div>
                      );
                    })}
                 </div>
                </div>
              </Row>
            </Row>
            <Row style={{ marginTop: 13 }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: packagedata.description,
                }}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
  return <div>Loading</div>;
};
export default PackageDetail;

const isData = (d = []) => {
  return d.length >= 1;
};
