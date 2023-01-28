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
} from "react-bootstrap-icons";

import services from "../data/services";
import { TokenContext, LoadingContext, CAContext } from "../context/Context";
import { useMutation, useQuery } from "react-query";
import { IMAGE } from "../../assets/assets";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

import htmlToDraft from "html-to-draftjs";

String.prototype.replaceAllTxt = function replaceAll(search, replace) {
  return this.split(search).join(replace);
};

const TextEditor = ({
  dnameRef,
  packageid,
  defaultData,
  descriptionShow,
  setDescriptionShow,

  EditDes,
}) => {
  // console.log(defaultData, "Default Data");
  const esdata = EditorState.createWithContent(
    ContentState.createFromBlockArray(htmlToDraft(defaultData).contentBlocks)
  );
  const [editorState, setEditorStateChange] = useState(esdata);

  useEffect(() => {
    const esdata = EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(defaultData).contentBlocks)
    );

    setEditorStateChange(esdata);
  }, [defaultData]);

  return (
    <Modal
      show={descriptionShow}
      onHide={() => setDescriptionShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {/*   <textarea */}
        {/*   disabled */}
        {/*   value={editorState && draftToHtml(convertToRaw(editorState.getCurrentContent()))} */}
        {/* /> */}
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={(data) => setEditorStateChange(data)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          variant={"danger"}
          onClick={() => {
            EditDes.mutate({
              packageid: packageid.current,
              description: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              ),
            });
            setDescriptionShow(false);
          }}
        >
          Update Description
        </Button>
        <Button variant={"primary"} onClick={(e) => setDescriptionShow(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const PackageCard = ({ data, edit, onDelete, openDes, openPlace }) => {
  return (
    <Col xs={12} sm={6} md={4} className="mb-3">
      <Card>
        <Card.Body style={{ padding: 0, margin: 0 }}>
          <div className={"packageContainer"}>
            <LazyLoadImage
              className={"packageImg"}
              src={axios.defaults.baseURL + data.image}
              // placeholder={({ imageProps, ref }) => (
              //   <img ref={ref} src="../../assets/travel/travelimage.jpg" {...imageProps} />
              // )}
              placeholderSrc={IMAGE.simpleimage}
            />
          </div>

          <div style={{ padding: 10 }}>
            <Card.Title>{data.destination}</Card.Title>
            <div className="includeplace">
              <GeoAlt /> >{" "}
              {data.includeplace.map((data, id) => {
                return <>{data.placename + " > "}</>;
              })}
              {data.destination}
            </div>
            <div className="packageinfo">
              <p>{data.duration}</p>
              <p>{nwc(data.cost)}</p>
            </div>
          </div>
          <div className="divider" />
          <div className="packagetools">
            <Button onClick={() => openPlace(data)}>
              <GeoAlt /> Include Places
            </Button>
            <Button onClick={() => openDes(data)}>
              <LayoutTextSidebar />
            </Button>
            <Button onClick={() => edit(data)}>
              <Pencil />
            </Button>
            <Button variant="danger" onClick={() => onDelete(data)}>
              <Trash />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const PlaceItem = ({ data }) => {
  return (
    <div className="mb-3">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#f0f0f0f0",
        }}
      >
        <div style={{ marginLeft: 5 }}>
          <h5>{data.placename}</h5>
          <h6>{data.hotels}</h6>
          <h6>{data.lengthofstay}</h6>
        </div>
      </div>
    </div>
  );
};

const Bookings = () => {
  const [type, setType] = useState("finish");

  const { setClietView } = useContext(CAContext);
  useEffect(() => {
    // console.log("You Entering.....");
    setClietView(false);
  }, []);

  const [searchText, setSearchText] = useState("");

  const [radioValue, setRadioValue] = useState("unfinish");

  const radios = [
    { name: "UnComplete", value: "unfinish" },
    { name: "Complete", value: "finish" },
  ];

  const [dateSelect, setDateSelect] = useState("Today");

  const booking_data = useQuery(["booking", radioValue], services.getBookings);

  const BD = useMemo(() => {
    if (booking_data.data) {
      const data = booking_data.data.data;
      return data;
    }
  }, [booking_data.data, searchText]);

  const onlyDate = useMemo(() => {
    if (booking_data.data) {
      const data = BD;
      const sdate = [];

      data.map((item, id) => {
        sdate.push(new Date(item.travel_sdate).toLocaleDateString());
      });
      const final = sdate.filter(
        (item, index) => sdate.indexOf(item) === index
      );
      return final.sort();
    }
  }, [BD]);

  return (
    <div className={"pages bookingpage"}>
      <h3>Bookings</h3>
      <div className={"booking_card"}>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={"outline-dark"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
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
      <div className="booking_dateselect">
        <ToggleButton
          id={"toogle-110"}
          className="toogle"
          type="radio"
          variant={"outline-dark"}
          name="toogle"
          value={dateSelect}
          checked={dateSelect === "Today"}
          onChange={(e) => setDateSelect("Today")}
        >
          Today
        </ToggleButton>
        {booking_data &&
          onlyDate &&
          onlyDate.map((radio, idx) => (
            <ToggleButton
              key={idx}
              className="toogle"
              id={`toogle-${idx + 2}`}
              type="radio"
              variant={"outline-dark"}
              name="toogle"
              value={radio}
              checked={dateSelect === radio}
              onChange={(e) => setDateSelect(e.currentTarget.value)}
            >
              {radio}
            </ToggleButton>
          ))}
      </div>
      <div className={"booking_data"}>
        <Table striped responsive hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Code</th>
              <th>Customer</th>
              <th>Package</th>
              <th>Depature Date</th>
              <th>Package Cost</th>
              <th>Paid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {booking_data.data &&
              BD.map((item, id) => (
                <tr>
                  <td>{id + 1}</td>
                  <td>{item.travelcode}</td>
                  <td>{item.traveler}</td>
                  <td>{item.package && item.package}</td>
                  <td>{new Date(item.travel_sdate).toLocaleDateString()}</td>
                  <td>{nwc(item.cost)}</td>
                  <td>{nwc(item.paid)}</td>
                  <td>{item.is_finish}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        {booking_data.data && JSON.stringify(booking_data.data.data)}
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
