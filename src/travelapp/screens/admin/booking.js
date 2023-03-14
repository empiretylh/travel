import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Form,
  InputGroup,
  Card,
  ButtonGroup,
  ToggleButton,
  Button,
  Modal,
} from "react-bootstrap";
import {
  PersonAdd,
  Search,
  PlusSquare,
  GeoAlt,
  LayoutTextSidebar,
  Pencil,
  Trash,
  Person,
  BookFill,
  ListColumns,
  List,
} from "react-bootstrap-icons";

import services from "../../data/services";
import {
  LoadingContext,
  CAContext,
  NavigationContext,
} from "../../context/Context";
import { useMutation, useQuery } from "react-query";
import { IMAGE } from "../../../assets/assets";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";

String.prototype.replaceAllTxt = function replaceAll(search, replace) {
  return this.split(search).join(replace);
};

const PersonDetail = ({ show, setShow, travelerid, bookingdate }) => {
  const persondata = useQuery(
    ["persondetail", travelerid],
    services.getTraveler
  );

  const data = persondata.data && persondata.data.data;

  if (data) {
    return (
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h1>{data.name}</h1>
          <Table striped responsive hover className="persontable">
            <tbody>
              <tr>
                <td>Name</td>
                <th>{data.name}</th>
              </tr>
              <tr>
                <td>Phone Number</td>
                <th>{data.phoneno}</th>
              </tr>
              <tr>
                <td>Email</td>
                <th>{data.email}</th>
              </tr>
              <tr>
                <td>NRC No</td>
                <th>{data.idcardno}</th>
              </tr>
              <tr>
                <td>Booking Date</td>
                <th>{new Date(bookingdate).toDateString()}</th>
              </tr>
              <tr>
                <td>Address</td>
                <th>{data.address}</th>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"primary"} onClick={(e) => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

const Bookings = () => {
  const { setClietView } = useContext(CAContext);
  const { active, UpdateActive } = useContext(NavigationContext);
  useEffect(() => {
    // console.log("You Entering.....");
    UpdateActive("bookings");
    setClietView(false);
  }, []);

  const { is_loading, setIsLoading } = useContext(LoadingContext);

  const [searchText, setSearchText] = useState("");

  const [radioValue, setRadioValue] = useState("all");

  const [showTI, setShowTI] = useState(false);
  const travelerid = useRef(0);
  const bookingdate = useRef(0);

  const radios = [
    { name: "All", value: "alls" },
    { name: "UnComplete", value: "unfinish" },
    { name: "Complete", value: "finish" },
  ];

  const [placeSelect, setPlaceSelect] = useState("All");

  const booking_data = useQuery(["booking", radioValue], services.getBookings);

  const StatusUpdate = useMutation(services.putBooking, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      booking_data.refetch();
    },
    onError: () => {
      setIsLoading(false);
      booking_data.refetch();
    },
  });

  const BD = useMemo(() => {
    if (booking_data.data) {
      const data = booking_data.data.data;
      const st = searchText.toLowerCase().replaceAllTxt(" ", "");
      const search = data.filter(
        (item) =>
          item.travelcode.includes(st) ||
          item.package.replaceAllTxt(" ", "").toLowerCase().includes(st) ||
          item.traveler.replaceAllTxt(" ", "").toLowerCase().includes(st)
      );
      if (placeSelect !== "All") {
        const filter = search.filter((item) => item.package === placeSelect);
        return filter;
      }

      return search.reverse();
    }
  }, [booking_data.data, searchText, placeSelect]);

  const onlyPlace = useMemo(() => {
    if (booking_data.data) {
      const data = booking_data.data.data;
      const sdate = [];

      data.map((item, id) => {
        sdate.push(item.package);
      });
      const final = sdate.filter(
        (item, index) => sdate.indexOf(item) === index
      );
      return final.sort();
    }
  }, [booking_data.data]);

  return (
    <div className={"pages bookingpage"}>
      <h3>
        <List /> Bookings
      </h3>
      <PersonDetail
        show={showTI}
        setShow={setShowTI}
        travelerid={travelerid.current}
        bookingdate={bookingdate.current}
      />
      <div className={"booking_card"}>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radios-${idx}`}
              type="radio"
              variant={"outline-dark"}
              name="radios"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {
                setRadioValue(e.currentTarget.value);
                console.log(e.currentTarget.value)
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <InputGroup style={{ width: 500 }}>
          <Form.Control
            type="text"
            placeholder="Search Bookings"
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
      <div className="booking_placeselect">
        <ToggleButton
          className="toogle"
          id={`toogle-$121`}
          type="radio"
          variant={"outline-dark"}
          name="toogle"
          value={placeSelect}
          checked={placeSelect === "All"}
          onChange={(e) => setPlaceSelect("All")}
        >
          All
        </ToggleButton>

        {booking_data &&
          onlyPlace &&
          onlyPlace.map((radio, idx) => (
            <ToggleButton
              key={idx}
              className="toogle"
              id={`toogle-${idx + 2}`}
              type="radio"
              variant={"outline-dark"}
              name="toogle"
              value={radio}
              checked={placeSelect === radio}
              onChange={(e) => {
                setPlaceSelect(e.currentTarget.value);
              }}
            >
              {radio}
            </ToggleButton>
          ))}
      </div>
      <div className={"booking_data"}>
        <Table striped responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>No</th>
              <th>Code</th>
              <th>Customer</th>
              <th>Package</th>
              <th>Cost</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {booking_data.data &&
              BD.map((item, id) => (
                <tr>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowTI(true);
                        travelerid.current = item.travelerid;
                        bookingdate.current = item.booking_date;
                      }}
                    >
                      <Person />
                    </Button>
                  </td>
                  <td>{id + 1}</td>
                  <td>
                    {item.travelcode} {item.bookingdate}
                  </td>
                  <td
                    onClick={() => {
                      setShowTI(true);
                      travelerid.current = item.travelerid;
                      bookingdate.current = item.booking_date;
                    }}
                  >
                    {item.traveler}
                  </td>
                  <td>{item.package && item.package}</td>
                  <td style={{ textAlign: "right" }}>{nwc(item.cost)}</td>
                  <td style={{ textAlign: "right" }}>{nwc(item.paid)}</td>
                  <td style={{ textAlign: "right" }}>
                    {nwc(item.cost - item.paid)}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ButtonGroup>
                      <ToggleButton
                        className="toogle"
                        disabled={item.is_fullpaid}
                        // id={`toogle-${id+100}`}
                        type="radio"
                        variant={"outline-danger"}
                        name={"toogleprepaid" + id}
                        defaultValue={item.is_halfpaid}
                        checked={item.is_halfpaid}
                        onClick={(e) => {
                          StatusUpdate.mutate({
                            bookingid: item.id,
                            prepaid: !item.is_halfpaid,
                          });
                        }}
                      >
                        Pre-Paid
                      </ToggleButton>
                      <ToggleButton
                        className="toogle"
                        disabled={!item.is_halfpaid || item.is_finish}
                        // id={`toogle-${id+100}`}
                        type="radio"
                        variant={"outline-success"}
                        name={"toogle-fullpaid" + id}
                        defaultValue={item.is_fullpaid}
                        checked={item.is_fullpaid}
                        onClick={(e) => {
                          StatusUpdate.mutate({
                            bookingid: item.id,
                            fullpaid: !item.is_fullpaid,
                          });
                        }}
                      >
                        Full-Paid
                      </ToggleButton>

                      <ToggleButton
                        className="toogle"
                        disabled={!item.is_fullpaid}
                        // id={`toogle-${id+100}`}
                        type="radio"
                        variant={"outline-primary"}
                        name={"toogle-complete" + id}
                        defaultValue={item.is_finish}
                        checked={item.is_finish}
                        onClick={(e) => {
                          StatusUpdate.mutate({
                            bookingid: item.id,
                            is_finish: !item.is_finish,
                          });
                        }}
                      >
                        Complete
                      </ToggleButton>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Bookings;

function nwc(x = 0) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" Ks");
}
