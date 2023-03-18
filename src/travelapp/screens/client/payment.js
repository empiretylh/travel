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
  ToggleButtonGroup,
  ToggleButton,
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
  CAContext,
  RegisterPackageContext,
  BookedContext,
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
  PhoneFill,
  Chat,
  Send,
  Stars,
  StarFill,
  Star,
} from "react-bootstrap-icons";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";
import { ClockCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { nrcdata } from "../../data/data";
import { Icon } from "react-bootstrap-icons";

import { createBrowserHistory } from 'history';


function nwc(x = 0) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" Ks");
}

const Payment = () => {

  let params = useParams();

  const { is_clientview, setClietView } = useContext(CAContext);

  const { is_loading, setIsLoading } = useContext(LoadingContext);

  const { booked, setBooked } = useContext(BookedContext);


  useEffect(() => {
    setClietView(true);
  })

  const [paidtype, setPaidtype] = useState(0);

  const { token, setToken } = useContext(TokenContext);


  const { rpackageinfo, setRPackageInfo } = useContext(RegisterPackageContext);


  const [PaymentChoice, setPaymentChoice] = useState(null);

  const handlePaymentChoice = (val) => {
    setPaymentChoice(val);
  }

  const images = [
    { value: 'KBZ Pay', src: IMAGE.kbzpay },
    { value: 'Wave Pay', src: IMAGE.wavepay },
    { value: 'AYA Pay', src: IMAGE.ayapay },
    { value: 'Mytel Pay', src: IMAGE.mytelpay },
  ];

  const [travelerInfo, setTravelerInfo] = useState({
    name: "",
    phoneno: "",
    email: "",
    address: "",
  });


  const rnameRef = useRef(0);
  const rphoneRef = useRef(0);
  const snameRef = useRef(0);
  const sphoneRef = useRef(0);

  const [sdata, setSData] = useState([]);


  const cinfo_data = useQuery(["cinfodata"], services.getCompanyInfo);

  const infodata = useMemo(() => {
    if (cinfo_data.data) {
      return cinfo_data.data.data;
    }
  }, [cinfo_data.data]);

  const [successShow, setSuccessShow] = useState(false);

  const postBooking = useMutation(services.RegisterBooking, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (e) => {
      setIsLoading(false);
      setSuccessShow(true);
      setSData(e.data);
      package_data.refetch();
      setBooked((booked) => booked.concat([e.data.travelcode]));
      console.log(e.data.travelcode);
      localStorage.setItem(
        "booked",
        JSON.stringify(booked.concat([e.data.travelcode]))
      );
      console.log(localStorage.getItem("booked"));
    },
    onError: () => {
      setIsLoading(false);
    },
  });


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



  const paymentvalue = useMemo(() => {
    if (paidtype === 'prepaid') {
      return packagedata.cost / 2;
    } else if (paidtype === 'fullpaid') {
      return packagedata.cost
    } else {
      return 0;
    }
  }, [paidtype, setPaidtype, packagedata.cost])


  const onSubmitBooking = () => {
    if (PaymentChoice) {
      postBooking.mutate(
        Object.assign(rpackageinfo, {
          paidtype,
          receivername: rnameRef.current.value,
          receiverphoneno: rphoneRef.current.value,
          sendername: snameRef.current.value,
          senderphoneno: sphoneRef.current.value,
          amount: paymentvalue,
          operator: PaymentChoice
        })
      )
    } else {
      alert('Please Choose Payment Operator')
    }
  }


  if (package_data.data) {

    return (
      <div className="home">
        <Modal
          show={successShow}
          onHide={() => setSuccessShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div>
              <h5
                style={{
                  color: "green",
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Successfully Registered.
              </h5>
              <div className="divider" />
              <p>
                <strong>Dear {sdata && sdata.traveler},</strong> <br />
                Thank you for making a reservation with our company. We have
                sent your voucher to your email.{" "}
                <strong>{travelerInfo.email}</strong> <br />
              </p>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#1a2c44",
                  padding: 10,
                  color: "white",
                }}
              >
                <h4>Tavel Code : {sdata && sdata.travelcode}</h4>
              </div>
              <div>
                <h6 style={{ fontFamily: "Roboto-Bold", marginTop: 5 }}>
                  Person Details
                </h6>
                <Table striped responsive hover>
                  <tbody>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>NRC No</th>
                      <th>Phone No</th>
                      <th>Email</th>
                      <th>Address</th>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>1</td>
                      <td style={{ textAlign: "center" }}>
                        {rpackageinfo.name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {sdata && sdata.idcardno}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {rpackageinfo.phoneno}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {rpackageinfo.email}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {rpackageinfo.address}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <h6
                  style={{
                    display: "flex",
                    backgroundColor: "",
                    fontFamily: "Roboto-Bold",
                    marginTop: 10,
                  }}
                >
                  Package Details
                </h6>
                <Table striped responsive hover>
                  <tbody>
                    <tr>
                      <th>Destination</th>
                      <th>Departure Date</th>
                      <th>Departure Time</th>
                      <th>Include Places</th>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {sdata && sdata.package}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {new Date(packagedata.travel_sdate).toDateString()}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {new Date(packagedata.travel_sdate).toTimeString()}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {packagedata.includeplace &&
                          packagedata.includeplace.map((data, id) => {
                            return <>{data.placename + ", "}</>;
                          })}
                        {packagedata.destination}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <h6 style={{ fontFamily: "Roboto-Bold", marginTop: 10 }}>
                  Pricing Details
                </h6>
                <Table
                  striped
                  responsive
                  hover
                  style={{ position: "relative" }}
                >
                  <tbody>
                    <tr>
                      <th>Package Costs</th>
                      <th>Paid</th>
                      <th>Balance</th>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {sdata && nwc(sdata.cost)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {sdata && nwc(sdata.paid)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {sdata && nwc(sdata.cost - sdata.paid)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <a href={infodata.phoneno && "tel:" + infodata.phoneno}>
              <Button variant={"success"} onClick={(e) => {
                window.location.href = '#/bookings'
              }}>
                <Telephone /> Call
              </Button>
            </a>
            <Button variant={"primary"} onClick={(e) => {
              window.location.href = '#/bookings'
              setSuccessShow(false)
            }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 95,
            flexDirection: "column",
          }}
        >
          <Container>

            <Row>

              <Col sm={12} md={6} lg={4}>
                <img src={axios.defaults.baseURL + packagedata.image} style={{
                  display: "flex",
                  width: "100%",

                  height: 250,
                  objectFit: "cover",
                  borderRadius: 15,
                  marginBottom: 10,
                }} />
                <h3>{packagedata.destination}</h3>

              </Col>
              <Col sm={12} md={6} lg={4}>
                <Table striped responsive hover>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <th>{rpackageinfo.name}</th>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <th>{rpackageinfo.phoneno}</th>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <th>{rpackageinfo.email}</th>
                    </tr>
                    <tr>
                      <td></td>
                      <th></th>
                    </tr>
                    <tr>
                      <td>Destination</td>
                      <th>{packagedata.destination}</th>
                    </tr>

                    <tr>
                      <td width={120}>Duration</td>
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
                        <p>
                          {packagedata.includeplace &&
                            packagedata.includeplace.map((data, id) => {
                              return <>{data.placename + ", "}</>;
                            })}
                          {packagedata.destination}
                        </p>
                      </th>
                    </tr>
                    <tr>
                      <td>Hotels</td>
                      <th>
                        <p style={{ fontSize: 18 }}>
                          {packagedata.includeplace &&
                            packagedata.includeplace
                              .filter(
                                (obj, index) =>
                                  packagedata.includeplace.findIndex((item) =>
                                    item.hotels.includes(obj.hotels)
                                  ) == index
                              )
                              .filter((i) => i.hotels !== "No Hotel").length > 0
                            ? packagedata.includeplace
                              .filter(
                                (obj, index) =>
                                  packagedata.includeplace.findIndex(
                                    (item) =>
                                      item.hotels.includes(obj.hotels)
                                  ) == index
                              )
                              .filter((i) => i.hotels !== "No Hotel")
                              .map((data, id) => {
                                return (
                                  <>
                                    {data.hotels +
                                      (id + 1 ===
                                        packagedata.includeplace
                                          .filter(
                                            (obj, index) =>
                                              packagedata.includeplace.findIndex(
                                                (item) =>
                                                  item.hotels.includes(
                                                    obj.hotels
                                                  )
                                              ) == index
                                          )
                                          .filter(
                                            (i) => i.hotels !== "No Hotel"
                                          ).length
                                        ? ""
                                        : ", ")}
                                  </>
                                );
                              })
                            : "No Hotel"}
                        </p>
                      </th>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <th>{nwc(packagedata.cost)}</th>
                    </tr>
                  </tbody>

                </Table>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <div>
                  <h5>Choose Payment Operator</h5>
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitBooking();
                  }}>
                    <ToggleButtonGroup
                      type="radio"
                      name="options"
                      value={PaymentChoice}
                      onChange={handlePaymentChoice}

                    >
                      {images.map((image, idx) => (
                        <ToggleButton
                          key={idx}
                          className="toogle"
                          id={`toogle-${idx + 2}`}
                          type="radio"
                          variant={"outline-primary"}
                          name="toogle"

                          value={image.value}
                        >
                          <img src={image.src} alt={`Option ${image.value}`} style={{ width: 50, height: 50 }} />
                          <h6>{image.value}</h6>
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                    <div style={{ marginTop: 6, marginBottom: 6 }}>
                      <h5>Wallet Phone : {cinfo_data.data && infodata.phoneno}</h5>
                    </div>
                    <Form.Group controlId="formReceiverName">
                      <Form.Label>Receiver Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="rname"
                        ref={rnameRef}

                        // defaultValue={currentUser.name}
                        // value={travelerInfo.travelerName}

                        placeholder={"Receiver Name"}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNo">
                      <Form.Label>Receiver Phone No</Form.Label>
                      <Form.Control
                        type="tel"
                        name="rphoneno"
                        ref={rphoneRef}
                        defaultValue={cinfo_data.data && infodata.phoneno}
                        //  defaultValue={currentUser.phoneno}
                        // value={travelerInfo.phoneNo}
                        placeholder={"09xxxxxxxxx"}
                        minLength={11}
                        maxLength={11}

                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Sender Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="sname"
                        ref={snameRef}
                        defaultValue={rpackageinfo.name}
                        // defaultValue={currentUser.name}
                        // value={travelerInfo.travelerName}

                        placeholder={"Sender Name"}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNo">
                      <Form.Label>Sender Phone No</Form.Label>
                      <Form.Control
                        type="tel"
                        name="sphoneno"
                        defaultValue={rpackageinfo.phoneno}
                        ref={sphoneRef}
                        //  defaultValue={currentUser.phoneno}
                        // value={travelerInfo.phoneNo}
                        placeholder={"09xxxxxxxxx"}
                        minLength={11}
                        maxLength={11}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNo" className="mb-3">
                      <Form.Label>Payment Amount</Form.Label>

                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div onClick={() => setPaidtype("prepaid")}>
                          <Form.Check
                            type="checkbox"

                            // value={travelerInfo.address}
                            // onChange={handleChange}
                            value={paidtype === "prepaid"}
                            checked={paidtype === "prepaid"}
                            label="Pre Paid"
                            required={paidtype === 0}
                          />
                        </div>
                        <div
                          style={{ marginLeft: 10 }}
                          onClick={() => setPaidtype("fullpaid")}
                        >
                          <Form.Check
                            type="checkbox"
                            value={paidtype === "fullpaid"}
                            checked={paidtype === "fullpaid"}
                            // value={travelerInfo.address}
                            // onChange={handleChange}
                            label="Full Paid"
                            required={paidtype === 0}
                          />
                        </div>
                      </div>
                      <Form.Control
                        type="text"
                        name="amount"
                        placeholder={"Payment Amount"}
                        value={nwc(paymentvalue)}
                        //  defaultValue={currentUser.phoneno}
                        // value={travelerInfo.phoneNo}
                        contentEditable={false}
                        required
                      />
                    </Form.Group>
                    <Button type='submit' variant='primary' style={{
                      width: '100%',
                      padding: 10,

                    }}>
                      Register Booking
                    </Button>
                  </Form>

                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );

  }

  return <div>Loading</div>;
};
export default Payment;

const isData = (d = []) => {
  return d.length >= 1;
};
