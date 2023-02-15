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
    <Modal
            show={showNTC}
            onHide={() => setShowNTC(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <h4 style={{ color: "red" }}>Your Travel Code is Wrong.</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button variant={"danger"} onClick={(e) => setShowNTC(false)}>
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
          {/* {JSON.stringify(booked_data.data)} */}
          <Container>
          <Row>
          <Col lg={12}>
          <div>
            <h4>Check Travel Code</h4>
            
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                onSearch(searchText);
              }}
            >
              <InputGroup style={{ maxWidth: 300 }}>
                <Form.Control
                  type="number"
                  placeholder="Travel Code"
                  className="searchfield"
                  value={searchText}
                  required
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <Button type="submit" onClick={() => onSearch(searchText)}>
                  Search <Search size={20} style={{ marginLeft: 3 }} />
                </Button>
              </InputGroup>
            </Form>
          </div>

          
          {/* {JSON.stringify(booked_data)} */}
          <div style={{ marginTop: 20 }}>
            <h4 style={{ marginTop: 15 }}>Check Code</h4>
            
            <Table striped responsive hover>
              <tbody>
                <tr>
                  <th>No</th>
                  <th>Travel Code</th>
                  <th>Package Name</th>
                  <th>Departure Date & Time</th>
                  <th>Cost</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Trip</th>
                </tr>
                {tcdata &&
                  booked_data.data &&
                  bookedata
                    .filter((item) => tcdata.includes(item.travelcode))
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.travelcode}</td>
                        <td>{item.package}</td>
                        <td>
                          {new Date(item.departuredt).toLocaleDateString() +
                            " " +
                            new Date(item.departuredt).toLocaleTimeString()}
                        </td>
                        <td>{nwc(item.cost)}</td>
                        <td>{nwc(item.paid)}</td>
                        <td>
                          {nwc(parseInt(item.cost) - parseInt(item.paid))}
                        </td>
                        <td style={{ color: item.is_finish ? "green" : "red" }}>
                          {item.is_finish ? "Complete" : "Not Complete"}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
            <h4 style={{ marginTop: 15 }}>Booked Reservation</h4>
            <Table striped responsive hover className="pkbuydetail">
              <tbody>
                <tr>
                  <th>No</th>
                  <th>Travel Code</th>
                  <th>Package Name</th>
                  <th>Departure Date & Time</th>
                  <th>Cost</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Trip</th>
                </tr>
                {booked_data.data &&
                  bookedata.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.travelcode}</td>
                      <td>{item.package}</td>
                      <td>
                        {new Date(item.departuredt).toLocaleDateString() +
                          " " +
                          new Date(item.departuredt).toLocaleTimeString()}
                      </td>
                      <td>{nwc(item.cost)}</td>
                      <td>{nwc(item.paid)}</td>
                      <td>{nwc(parseInt(item.cost) - parseInt(item.paid))}</td>
                      <td style={{ color: item.is_finish ? "green" : "red" }}>
                        {item.is_finish ? "Complete" : "Not Complete"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          </Col>
          </Row>
          
      </Container>
        </div>
    </div>
  );
};
export default Booking;

const isData = (d = []) => {
  return d.length >= 1;
};
