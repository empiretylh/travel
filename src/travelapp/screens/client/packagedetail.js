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
  PencilFill,
  Telephone,
  Mailbox,
} from "react-bootstrap-icons";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import { ClockCircleOutlined, HomeOutlined } from "@ant-design/icons";

function nwc(x = 0) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" Ks");
}
const IPC = ({ data }) => {
  return (
    <div className="ipc">
      <LazyLoadImage
        src={axios.defaults.baseURL + data.image}
        className="ipcimage"
        // placeholder={({ imageProps, ref }) => (
        //   <img ref={ref} src="../../assets/travel/travelimage.jpg" {...imageProps} />
        // )}

        placeholderSrc={IMAGE.simpleimage}
      />
      <div style={{ marginTop: 8 }}>
        <h5 style={{ fontFamily: "Roboto-Bold" }}>{data.placename}</h5>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <HomeOutlined /> <span style={{ marginLeft: 5 }}>{data.hotels}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ClockCircleOutlined />{" "}
          <span style={{ marginLeft: 5 }}>
            {data.lengthofstay ? data.lengthofstay : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};
const PackageDetail = () => {
  let params = useParams();
  const { is_clientview, setClietView } = useContext(CAContext);

  const [ticketShow, setTicketShow] = useState(false);

  const [travelerInfo, setTravelerInfo] = useState({
    travelerName: "",
    phoneNo: "",
    email: "",
    nrcNo: "",
    address: "",
  });

  const handleChange = (event) => {
    setTravelerInfo({
      ...travelerInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(travelerInfo);
  };

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
        <Modal
          show={true}
          onHide={() => setTicketShow(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Container className="ticket-booking-form">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTravelerName">
                      <Form.Label>Traveler Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="travelerName"
                        value={travelerInfo.travelerName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNo">
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phoneNo"
                        value={travelerInfo.phoneNo}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={travelerInfo.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formNRCNo">
                      <Form.Label>NRC No</Form.Label>
                      <Form.Control
                        type="text"
                        name="nrcNo"
                        value={travelerInfo.nrcNo}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={travelerInfo.address}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Book Ticket
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant={"danger"}
              onClick={() => {
                // DeleteIncludePlace.mutate({
                //   id: selectIP.current.id,
                // });
                // setShowDeleteIP(false);
              }}
            >
              Delete Place
            </Button>
            <Button variant={"primary"} onClick={(e) => setTicketShow(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

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
              <Col>
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
              </Col>
              <Col style={{ display: "flex", flexDirection: "row-reverse" }}>
                <h5
                  style={{
                    padding: 10,
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {nwc(packagedata.cost)}
                </h5>
              </Col>
            </Row>
            <div className="divider" />
            <Row style={{ marginTop: 15 }}>
              <Row>
                <Col
                  lg={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
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
                    <h3 style={{ color: "#1d4a85" }}>
                      <GeoAlt style={{ marginRight: 5 }} />{" "}
                      {packagedata.destination}
                    </h3>
                    <div>
                      <Table striped responsive hover className="pkdetail">
                        <tbody>
                          <tr>
                            <td>Duration</td>
                            <th>{packagedata.duration}</th>
                          </tr>
                          <tr>
                            <td>Depature Date</td>
                            <th>
                              {new Date(
                                packagedata.travel_sdate
                              ).toLocaleDateString()}
                            </th>
                          </tr>
                          <tr>
                            <td>Depature Time</td>
                            <th>
                              {new Date(
                                packagedata.travel_sdate
                              ).toLocaleTimeString()}
                            </th>
                          </tr>
                          <tr>
                            <td>Include Places</td>
                            <th>
                              <p style={{ fontSize: 18 }}>
                                {packagedata.includeplace &&
                                  packagedata.includeplace.map((data, id) => {
                                    return <>{data.placename + ", "}</>;
                                  })}
                                {packagedata.destination}
                              </p>
                            </th>
                          </tr>
                          <tr>
                            <td>Price</td>
                            <th>{nwc(packagedata.cost)}</th>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="bookingbtn">
                      <PencilFill style={{ marginRight: 10 }} />
                      <div> Register Booking</div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <div className="divider" />
                <h6 style={{ margin: 5, fontFamily: "Roboto-Bold" }}>
                  {" "}
                  Include Places
                </h6>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    overflow: "auto",
                  }}
                >
                  {packagedata.includeplace &&
                    packagedata.includeplace.map((data, id) => (
                      <IPC data={data} key={id} />
                    ))}
                </Col>
              </Row>
            </Row>
            <Row style={{ marginTop: 13 }}>
              <div className="divider" />
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
