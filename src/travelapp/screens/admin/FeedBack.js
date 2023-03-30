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
  Chat,
  Star,
  StarFill,
} from "react-bootstrap-icons";

import services from "../../data/services";
import { LoadingContext, CAContext,NavigationContext,LoginContext } from "../../context/Context";
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
                <th>{new Date(bookingdate).toUTCString()}</th>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant={"danger"}>
            Update Description
          </Button>
          <Button variant={"primary"} onClick={(e) => setShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

const FeedBackItem = ({ data, onDelete }) => {
  const ChangeToStar = (d) => {
    let star = [];

    for (var i = 0; i < d; i++) {
      star.push(<Star />);
    }
    return star;
  };

  return (
    <div className="booking_data fbitem">
      <div>
        <div>
          {[...Array(parseInt(data.star))].map((x, i) => (
            <StarFill key={i} color="yellow" style={{ marginRight: 5 }} />
          ))}
        </div>

        <h5>{data.package}</h5>
        <p>{data.message}</p>
      </div>
      <Button style={{position:'absolute',bottom:10,right:10}} variant="danger" onClick={() => onDelete(data)}>
        <Trash />
      </Button>
    </div>
  );
};

const FeedBack = () => {
  const { setClietView } = useContext(CAContext);
  const {active,UpdateActive} = useContext(NavigationContext)
  useEffect(() => {
    // console.log("You Entering.....");
    UpdateActive('feedbacks');
    setClietView(false);
  }, []);



   const {isLoginS,setIsLoginS} = useContext(LoginContext);
   useEffect(()=>{
    setIsLoginS(false)
   })


  const { is_loading, setIsLoading } = useContext(LoadingContext);

  const [radioValue, setRadioValue] = useState("all");

  const [showDelete, setShowDelete] = useState(false);

  const [showTI, setShowTI] = useState(false);
  const travelerid = useRef(0);
  const bookingdate = useRef(0);

  const radios = [
    { name: "All", value: "all" },
    { name: "UnComplete", value: "unfinish" },
    { name: "Complete", value: "finish" },
  ];

  const [placeSelect, setPlaceSelect] = useState("");

  const booking_data = useQuery(["booking", radioValue], services.getBookings);

  const feedback_data = useQuery(["feedback"], services.getFeedBack);

  const fbid = useRef(0);

  const DeleteFeedBack = useMutation(services.deleteFeedBack, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      feedback_data.refetch();
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const onDelete = (data) => {
    fbid.current = data.id;
    setShowDelete(true);
  };

  const onlyPlace = useMemo(() => {
    if (feedback_data.data) {
      const data = feedback_data.data.data;
      const sdate = [];

      data.map((item, id) => {
        sdate.push(item.package);
      });
      const final = sdate.filter(
        (item, index) => sdate.indexOf(item) === index
      );
      return final.sort();
    }
  }, [feedback_data.data]);

  const Fbdata = useMemo(() => {
    if (feedback_data.data) {
      const data = feedback_data.data.data;
      const search = data.filter((item) => item.package.includes(placeSelect));
      return search.reverse();
    }
  }, [feedback_data.data, placeSelect]);

  return (
    <div className={"pages bookingpage"}>
      <Modal
        show={showDelete}
        onHide={() => setShowDelete(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "red" }}>Delete</h4>
          <p>
            <b>Are you sure want to Delete?</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant={"danger"}
            onClick={() => {
              DeleteFeedBack.mutate({
                feedbackid: fbid.current,
              });
              setShowDelete(false);
            }}
          >
            Delete
          </Button>
          <Button variant={"primary"} onClick={(e) => setShowDelete(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <h3>
        <Chat /> FeedBack
      </h3>
      <Container>
        <div className="booking_placeselect">
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
                onChange={(e) => setPlaceSelect(e.currentTarget.value)}
              >
                {radio}
              </ToggleButton>
            ))}
        </div>
        <Row>
          {feedback_data.data &&
            Fbdata.map((data, id) => (
              <Col lg={6}>
                <FeedBackItem data={data} key={id} onDelete={onDelete} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default FeedBack;

function nwc(x = 0) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" MMK");
}
