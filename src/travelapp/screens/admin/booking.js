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
  Coin,
} from "react-bootstrap-icons";

import services from "../../data/services";
import {
  LoadingContext,
  CAContext,
  NavigationContext,
  LoginContext,
  TableColContext,
} from "../../context/Context";
import { useMutation, useQuery } from "react-query";
import { IMAGE } from "../../../assets/assets";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TableDropDown from './DropDownCheck';
import LoadingScreen from '../../loading';

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



const PaymentInfo = ({ show, setShow, data }) => {


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
          <h1><Coin /> Payment Information</h1>
          <Table striped responsive hover className="persontable">
            <tbody>
              <tr>
                <td>Sender Name</td>
                <th>{data.SenderName}</th>
              </tr>
              <tr>
                <td>Sender Phone Number</td>
                <th>{data.SenderPhoneno}</th>
              </tr>
              <tr>
                <td>Receiver Name</td>
                <th>{data.ReceiverName}</th>
              </tr>
              <tr>
                <td>Receiver Phone Number</td>
                <th>{data.ReceiverPhoneno}</th>
              </tr>
              <tr>
                <td>Operator</td>
                <th>{data.Operator}</th>
              </tr>
              <tr>
                <td>Payment Amount</td>
                <th>{nwc(data.Amount)}</th>
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

  const { isLoginS, setIsLoginS } = useContext(LoginContext);
  useEffect(() => {
    setIsLoginS(false)
  })

  useEffect(() => {
    // console.log("You Entering.....");
    UpdateActive("bookings");
    setClietView(false);
  }, []);

  const { is_loading, setIsLoading } = useContext(LoadingContext);

  const [bookingid,setBookingId] = useState(null);

  const [searchText, setSearchText] = useState("");

  const [radioValue, setRadioValue] = useState("all");

  const [paymentshow, setPaymentShow] = useState(false);

  const [paymentdata, setPaymetData] = useState([]);

  const [showTI, setShowTI] = useState(false);
  const travelerid = useRef(0);
  const bookingdate = useRef(0);

  const [currencyShow, setCurrencyShow] = useState(false);

  const [colSelected,setColSelected] = useState([
    {"value":"Balance","label":"Balance"},{"value":"Paid","label":"Paid"},{"value":"Package","label":"Package"},{"value":"Cost","label":"Cost"},{"value":"Cancellation","label":"Cancellation"},{"value":"Code","label":"Travel Code"}
    ]);

  const ColValue = useMemo(()=>({colSelected,setColSelected}),[colSelected,setColSelected])

  const radios = [
    { name: "All", value: "alls" },
    { name: "UnComplete", value: "unfinish" },
    { name: "Complete", value: "finish" },
  ];

  const [placeSelect, setPlaceSelect] = useState("All");

  const booking_data = useQuery(["booking", radioValue], services.getBookings);

  const [showD,setShowD]= useState(false);


  const DeleteBooking = useMutation(services.deleteBooking, {
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
    <TableColContext.Provider value={ColValue}> 

      <Modal
        show={showD}
        onHide={() => setShowD(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "red" }}>Delete Booking</h4>
          <p
            style={{
              color: "red",
              fontSize: 20,
              fontFamily: "Roboto-Regular",
            }}
          >
            Are you sure want to Delete This Booking?
          </p>

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={"danger"}
            onClick={(e) => {
            DeleteBooking.mutate({
              bookingid:bookingid
            })
            setShowD(false);
            }}
          >
           Delete
          </Button>
          <Button
            variant={"primary"}
            onClick={(e) => setShowD(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

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
      <PaymentInfo show={paymentshow} setShow={setPaymentShow} data={paymentdata} />
      <div className={"booking_card"}>
      <Container fluid >

        <Row>
          <Col lg={3} style={{ display: 'flex', justifyContent: 'center',alignItems:'center' }} >
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
          </Col>
          <Col lg={6} style={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
            <InputGroup style={{ width: '100%' }}>
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
          </Col>
          <Col lg={3} style={{ display: 'flex', justifyContent: 'space-between',alignItems:'center' }}>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <div onClick={() => setCurrencyShow(prev => !prev)} style={{marginRight:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Form.Check
                type="checkbox"
                value={currencyShow}
                checked={currencyShow}
                label="Show Currency"

              />
            </div>
          <span style={{display:'flex',alignItems:'center',justifyContent:'center'}}> <strong style={{marginRight:5}}>Table Col : </strong>
            <TableDropDown/>
            </span>
            </div>
          </Col>
        </Row>
      </Container>
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
        <Table striped responsive hover breakpoint='md'>
          <thead>
            <tr>
              <th>#</th>
              {colSelected.some(selectedOption => selectedOption.value === 'No')&& <th>No</th>}
              {colSelected.some(selectedOption => selectedOption.value === 'Code')&& <th>Code</th>}
              <th>Customer</th>
              {colSelected.some(selectedOption => selectedOption.value === 'Package')&& <th>Package</th>}
              {colSelected.some(selectedOption => selectedOption.value === 'Cost')&& <th>Cost</th>}
              {colSelected.some(selectedOption => selectedOption.value === 'Paid')&& <th>Paid</th>}
           {colSelected.some(selectedOption => selectedOption.value === 'Balance')&& <th>Balance</th>}
            {colSelected.some(selectedOption => selectedOption.value === 'Cancellation')&& 
              <th>Cancellation %</th>}

              
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {booking_data.data &&
              BD.map((item, id) => (
                <tr>
                  <td style={{display:'flex',flexDirection:'row'}}>
                  
                 
                    <Button
                      style={{ margin: 2 }}
                      variant="primary"
                      onClick={() => {
                        setShowTI(true);
                        travelerid.current = item.travelerid;
                        bookingdate.current = item.booking_date;
                      }}
                    >
                      <Person />
                    </Button>
                    <Button
                      style={{ margin: 2 }}
                      variant="warning"
                      onClick={() => {
                        setPaymentShow(true)
                        setPaymetData(item.paymentinfo);
                      }}
                    >

                      <Coin />
                    </Button>
                   
                  </td>
                    {colSelected.some(selectedOption => selectedOption.value === 'No')&&   <td>{id + 1}</td>}
                {colSelected.some(selectedOption => selectedOption.value === 'Code')&&   <td>
                    {item.travelcode} {item.bookingdate}
                  </td>}
                
                  
                  <td
                    onClick={() => {
                      setShowTI(true);
                      travelerid.current = item.travelerid;
                      bookingdate.current = item.booking_date;
                    }}
                  >
                    {item.traveler}
                  </td>
                  {colSelected.some(selectedOption => selectedOption.value === 'Package')&&    <td>{item.package && item.package}</td>}
                      {colSelected.some(selectedOption => selectedOption.value === 'Cost')&&  <td style={{ textAlign: "right" }}>{nwc(item.cost,currencyShow)}</td>}
               
                     {colSelected.some(selectedOption => selectedOption.value === 'Paid')&&    <td style={{ textAlign: "right" }}>{nwc(item.paid,currencyShow)}</td>}
                     
                     {colSelected.some(selectedOption => selectedOption.value === 'Balance')&&    <td style={{ textAlign: "right" }}>
                    {nwc(item.cost - item.paid,currencyShow)}
                  </td>}
               
                
                
                  {colSelected.some(selectedOption => selectedOption.value === 'Cancellation')&&   <td style={{ textAlign: "right" }}>
                    {nwc(item.paid * 0.3,currencyShow)}
                  </td>}
                  
                 
                  <td
                    style={{
                     margin: '0 auto', textAlign: 'center' 
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
                  <td>
                  <Button variant="danger" onClick={() =>{setShowD(true); setBookingId(item.id)}}>
              <Trash />
            </Button>
        </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {booking_data.isFetching?
           <div style={{width:'100%',margin: '0 auto', textAlign: 'center' }}><LoadingScreen/>
          </div>
           :null

          }
      </div>
    </div>
    </TableColContext.Provider> 
  );
};

export default Bookings;

function nwc(x = 0,y=true) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(y ? " Ks":'');
}
