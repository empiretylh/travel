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
  People,
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
                <th>{data.Amount}</th>
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


const ManageUsers = () => {
  const { setClietView } = useContext(CAContext);
  const { active, UpdateActive } = useContext(NavigationContext);

  const { isLoginS, setIsLoginS } = useContext(LoginContext);
  useEffect(() => {
    setIsLoginS(false)
  })

  useEffect(() => {
    // console.log("You Entering.....");
    UpdateActive("users");
    setClietView(false);
  }, []);

  const { is_loading, setIsLoading } = useContext(LoadingContext);

  const [searchText, setSearchText] = useState("");

  const [radioValue, setRadioValue] = useState("all");

  const [showTI, setShowTI] = useState(false);
  const travelerid = useRef(0);
  const bookingdate = useRef(0);

  const [currencyShow, setCurrencyShow] = useState(false);

  const usersdata = useQuery(['userdata','all'],services.getClientUser);

  const [userid,setUserid] = useState()



  const DeleteUsers = useMutation(services.deleteUser, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      usersdata.refetch();
    },
    onError: () => {
      setIsLoading(false);
      usersdata.refetch();
    },
  });


  const udata = useMemo(()=>{
    if(usersdata.data){
      const data = usersdata.data.data;
      const st = searchText.toLowerCase().replaceAllTxt(" ", "");
      const search = data.filter(
        (item) =>
          item.username.includes(st) ||
          item.name.replaceAllTxt(" ", "").toLowerCase().includes(st)
      );

       if (radioValue !== "alls") {
        const filter = search.filter((item) => item.is_admin === (radioValue==='admin'?true:false));
        return filter;
      }

      return search;
    }
  },[usersdata.data,searchText,radioValue])




  const UserData = useQuery(['clientuser','one'],services.getClientUser)


  const currentUser = useMemo(()=>{
    if(UserData.data){
      const a = UserData.data.data
      return UserData.data.data
    }
  },[UserData.data])

  

  const radios = [
    { name: "All", value: "alls" },
    { name: "Admin", value: "admin" },
    { name: "Users", value: "users" },
  ];

  const [placeSelect, setPlaceSelect] = useState("All");



  const [showD,setShowD]= useState(false);



  return (
   <>
      <Modal
        show={showD}
        onHide={() => setShowD(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "red" }}>Delete User</h4>
          <p
            style={{
              color: "red",
              fontSize: 20,
              fontFamily: "Roboto-Regular",
            }}
          >
            Are you sure want to Delete This User?
          </p>

        </Modal.Body>
        <Modal.Footer>
          <Button
             variant={"danger"}
            onClick={(e) => {
            DeleteUsers.mutate({
              id:userid
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
        <People /> Manage Users
      </h3>
      <PersonDetail
        show={showTI}
        setShow={setShowTI}
        travelerid={travelerid.current}
        bookingdate={bookingdate.current}
      />

       <ButtonGroup className={"mb-3"}>
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
       <InputGroup style={{ width: '100%' }}>
              <Form.Control
                type="text"
                placeholder="Search Users"
                className="searchfield"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <Button>
                <Search size={20} style={{ marginLeft: 3 }} />
              </Button>
            </InputGroup>
   
      <div className={"booking_data"}>
        <Table striped responsive hover breakpoint='md'>
          <thead>
            <tr>
                        <th>No</th>
                    <th>Username</th>
                          <th>Full Name</th>
                          <th>Phone Number</th>
                                <th>Email</th>
                                <th>Address</th>
                                 <th>Admin</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {usersdata.data &&
              udata.map((item, id) => (
                <tr>
                 
                   <td>{id + 1}</td>
                    
                  <td>{item.username}</td>
                      <td>{item.name}</td>
                        <td>{item.phoneno}</td>
                          <td>{item.email}</td>
                         <td>{item.address}</td>
                          <td>{item.is_admin?'Yes':'No'}</td>                  
                  <td>{UserData.data && currentUser.username === item.username ? 'You' :
                                    <Button variant="danger" onClick={() =>{setShowD(true); setUserid(item.id)}}>
                                <Trash />
                              </Button>}
        </td>
                </tr>
              ))}
          </tbody>

         
        </Table>
         {usersdata.isFetching?
           <div style={{width:'100%',margin: '0 auto', textAlign: 'center' }}><LoadingScreen/>
          </div>
           :null

          }
      </div>
    </div>
    </>
  );
};

export default ManageUsers;

function nwc(x = 0,y=true) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(y ? " MMK":'');
}
