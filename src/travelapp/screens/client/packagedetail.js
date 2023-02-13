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
import { TokenContext, LoadingContext, CAContext,BookedContext } from "../../context/Context";
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

const StarRating = ({rating,setRating}) => {
  // const [rating, setRating] = useState(0);

  const handleClick = (starindex) => {
    setRating(starindex + 1);
  };
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i >= rating) {
      stars.push(<Star style={{marginRight:5}}  onClick={() => handleClick(i)} size={20}/>);
    } else {
      stars.push(<StarFill style={{marginRight:5}} onClick={() => handleClick(i)} size={20} color={'yellow'}/>);
    }

  }
      
  return <div style={{display:'flex',flexDirection:'row'}}>{stars}</div>;
};

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

const nrcode = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const nrcType = [
  { en: "N", mm: "နိုင်" },
  { en: "E", mm: "ဧည့်" },
  { en: "P", mm: "ပြု" },
  { en: "T", mm: "သာသနာ" },
  { en: "R", mm: "ယာယီ" },
  { en: "S", mm: "စ" },
];

const PackageDetail = () => {
  let params = useParams();
  const { is_clientview, setClietView } = useContext(CAContext);

  const { is_loading, setIsLoading } = useContext(LoadingContext);

  const {booked,setBooked} =  useContext(BookedContext);

  const [ticketShow, setTicketShow] = useState(false);

  const [travelerInfo, setTravelerInfo] = useState({
    name: "",
    phoneno: "",
    email: "",
    address: "",
  });

  const [feedbackShow, setFeedbackShow] = useState(false);

  const [NRCCodeSelect, setNRCCodeSelect] = useState(1);
  const placen = useMemo(() => {
    const data = nrcdata;
    const result = data.filter((item) => item.nrc_code == NRCCodeSelect);
    return result;
  }, [NRCCodeSelect]);

  const [NRCPlaceSelect, setNRCPlaceSelect] = useState(placen[0].name_en);
  const [NRCTypeSelect, setNRCTypeSelect] = useState(nrcType[0].en);
  const [NRCCode, setNRCCode] = useState("");
  const [sdata, setSData] = useState([]);

  const [PLimitShow, setPLimitShow] = useState(false);

  const cinfo_data = useQuery(["cinfodata"], services.getCompanyInfo);

  const [rating, setRating] = useState(0);
  const [message,setMessage] = useState('');

  const [paidtype, setPaidtype] = useState(0);

  const infodata = useMemo(() => {
    if (cinfo_data.data) {
      return cinfo_data.data.data;
    }
  }, [cinfo_data.data]);

  const [successShow, setSuccessShow] = useState(false);

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

  
  const postBooking = useMutation(services.RegisterBooking, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (e) => {
      setIsLoading(false);
      setSuccessShow(true);
      setSData(e.data);
      package_data.refetch();
      setBooked((booked)=>booked.concat([{travelcode:e.data.travelcode}]))
      console.log(e.data.travelcode)
      localStorage.setItem('booked',JSON.stringify(booked.concat([{travelcode:e.data.travelcode}])));
      console.log(localStorage.getItem('booked'))
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const postFeedBack = useMutation(services.postFeedBack, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (e) => {
      setIsLoading(false);
      // setSuccessShow(true);
      // setSData(e.data);
      // package_data.refetch();
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const onSumbitBooking = (e) => {
    e.preventDefault();
    postBooking.mutate(
      Object.assign(travelerInfo, {
        paidtype,
        package_id: packagedata.id,
        idcardno:
          NRCCodeSelect +
          "/" +
          NRCPlaceSelect +
          "(" +
          NRCTypeSelect +
          ")" +
          NRCCode,
      })
    );
    setTicketShow(false);
  };

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
          show={feedbackShow}
          onHide={() => setFeedbackShow(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <h4 style={{ color: "black" }}>
              <Chat /> Write FeedBack
            </h4>
            <Form onSubmit={(e)=>{
              e.preventDefault();
              postFeedBack.mutate({
                star:rating,
                packageid:packagedata.id,
                message:message,
              })
              setFeedbackShow(false);
            }}>
              <Form.Group>
                <StarRating rating={rating} setRating={setRating} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Feedback</Form.Label>
                <Form.Control type="textarea" placeholder="your feedback" required disabled={rating===0} onChange={e=>setMessage(e.target.value)}/>
              </Form.Group>
              <Button
                type="submit"
                style={{
                  display: "flex",
                  width: "100%",
                  padding: 10,
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Send /> <div style={{ marginLeft: 5 }}> Submit Feedback</div>
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant={"danger"}
              onClick={(e) => setFeedbackShow(false)(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={PLimitShow}
          onHide={() => setPLimitShow(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <h4 style={{ color: "red" }}>
              Sorry, This package can not booking right now
            </h4>
            <p>
              We regret to inform you that {packagedata.destination} is
              currently fully booked and we are unable to accept any new
              reservations at this time. <br />
              Thank you for your interest and please check back with us for
              future avaliablity.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"danger"} onClick={(e) => setPLimitShow(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={ticketShow}
          onHide={() => setTicketShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Container>
              <Row>
                <Col
                  lg={5}
                  md={12}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LazyLoadImage
                    src={axios.defaults.baseURL + packagedata.image}
                    style={{
                      display: "flex",
                      width: "100%",

                      height: 200,
                      objectFit: "cover",
                      borderRadius: 15,
                      marginBottom: 10,
                    }}
                    // placeholder={({ imageProps, ref }) => (
                    //   <img ref={ref} src="../../assets/travel/travelimage.jpg" {...imageProps} />
                    // )}
                    placeholderSrc={IMAGE.simpleimage}
                  />
                  <Table striped responsive hover className="pkbuydetail">
                    <tbody>
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
                        <td>Price</td>
                        <th>{nwc(packagedata.cost)}</th>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col lg={7} md={12}>
                  <Form onSubmit={onSumbitBooking}>
                    <h4 style={{ fontFamily: "Roboto-Bold" }}>
                      {packagedata.destination}
                    </h4>
                    <Form.Group controlId="formTravelerName">
                      <Form.Label>Traveler Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={travelerInfo.travelerName}
                        onChange={handleChange}
                        placeholder={"Name"}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNo">
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phoneno"
                        value={travelerInfo.phoneNo}
                        placeholder={"09xxxxxxxxx"}
                        max={11}
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
                        placeholder={"travel@gmail.com"}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formNRCNo">
                      <Form.Label>NRC No</Form.Label>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Form.Select
                          value={NRCCodeSelect}
                          onChange={(e) => setNRCCodeSelect(e.target.value)}
                          style={{ maxWidth: 80, marginRight: 5 }}
                        >
                          {nrcode.map((item, index) => (
                            <option value={item}>{item}</option>
                          ))}
                        </Form.Select>

                        <Form.Select
                          value={NRCPlaceSelect}
                          onChange={(e) => setNRCPlaceSelect(e.target.value)}
                          style={{ maxWidth: 110, marginRight: 5 }}
                        >
                          {placen.map((item, index) => (
                            <option value={item.name_en}>
                              {item.name_en + " - " + item.name_mm}
                            </option>
                          ))}
                        </Form.Select>

                        <Form.Select
                          value={NRCTypeSelect}
                          onChange={(e) => setNRCTypeSelect(e.target.value)}
                          style={{ maxWidth: 100, marginRight: 5 }}
                        >
                          {nrcType.map((item, index) => (
                            <option value={item.en}>
                              {item.en + " - " + item.mm}
                            </option>
                          ))}
                        </Form.Select>

                        <Form.Control
                          type="number"
                          name="nrcNo"
                          placeHolder={"xxxxxxx"}
                          maxLength={6}
                          onChange={(e) => setNRCCode(e.target.value)}
                          required
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group controlId="formAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={travelerInfo.address}
                        onChange={handleChange}
                        placeHolder="St.0, Dawei, Computer University"
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Kpay, Wave : {infodata.phoneno}</Form.Label>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div onClick={() => setPaidtype("prepaid")}>
                          <Form.Check
                            type="checkbox"
                            name="address"
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
                            name="address"
                            value={paidtype === "fullpaid"}
                            checked={paidtype === "fullpaid"}
                            // value={travelerInfo.address}
                            // onChange={handleChange}
                            label="Full Paid"
                            required={paidtype === 0}
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Button
                      type="submit"
                      variant={"primary"}
                      style={{
                        marginTop: 10,
                        width: "100%",
                        padding: 10,
                      }}
                    >
                      Register
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={"danger"} onClick={(e) => setTicketShow(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

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
                        {travelerInfo.name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {sdata && sdata.idcardno}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {travelerInfo.phoneno}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {travelerInfo.email}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {travelerInfo.address}
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
                        {" "}
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
            <Button
              varinat={"success"}
              onClick={() => {
                window.location.href =
                  "tel:" + infodata.phoneno && infodata.phoneno;
              }}
            >
              <Telephone /> Call
            </Button>
            <Button variant={"primary"} onClick={(e) => setSuccessShow(false)}>
              Close
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
                    <div
                      className="bookingbtn"
                      onClick={() => {
                        if (packagedata.people_limit > 0) {
                          setTicketShow(true);
                        } else {
                          setPLimitShow(true);
                        }
                      }}
                    >
                      <PencilFill style={{ marginRight: 10 }} />
                      <div> Register Booking</div>
                    </div>
                    <div
                      className="bookingbtn"
                      style={{ marginTop: 10 }}
                      onClick={() => {
                       setFeedbackShow(true)
                      }}
                    >
                      <Chat style={{ marginRight: 10 }} />
                      <div> Write Feedback</div>
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
