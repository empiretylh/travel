import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Form,
  InputGroup,
  Card,
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
  console.log(defaultData, "Default Data");
 const esdata= EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(defaultData).contentBlocks)
    )
  const [editorState, setEditorStateChange] = useState(esdata);


  useEffect(()=>{
    const esdata= EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(defaultData).contentBlocks)
    )

    setEditorStateChange(esdata)
  },[defaultData])

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

const PackageCard = ({ data, edit, onDelete, openDes }) => {
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
              placeholderSrc={IMAGE.background}
            />
          </div>

          <div style={{ padding: 10 }}>
            <Card.Title>{data.destination}</Card.Title>
            <div className="includeplace">
              <GeoAlt /> > {data.destination} > {data.destination}>{" "}
              {data.destination}> {data.destination}> {data.destination}
            </div>
            <div className="packageinfo">
              <p>{data.duration}</p>
              <p>{nwc(data.cost)}</p>
            </div>
          </div>
          <div className="divider" />
          <div className="packagetools">
            <Button>
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

const Package = () => {
  const [newPackageShow, setNewPackageShow] = useState(false);

  const [editPackageShow, setEditPackageShow] = useState(false);

  const OpenEditPackageShow = () => setEditPackageShow(true);
  const CloseEdtPackageShow = () => setEditPackageShow(false);

  const [deletePackageShow, setDeletePackageShow] = useState(false);

  const [descriptionShow, setDescriptionShow] = useState(false);

  const { is_loading, setIsLoading } = useContext(LoadingContext);

  const { setClietView } = useContext(CAContext);

  const package_data = useQuery("package_data", services.getPackage);

  const [searchText, setSearchText] = useState("");

  const dnameRef = useRef(0);
  const costRef = useRef(0);
  const durationRef = useRef(0);
  const placeimageRef = useRef(0);
  const packageid = useRef(0);

  useEffect(() => {
    // console.log("You Entering.....");
    setClietView(false);
  }, []);

  const PackageDescription = useMutation(services.putPackageDescription, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      package_data.refetch();
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const PackageUpload = useMutation(services.addPackage, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      package_data.refetch();
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const PackageEdit = useMutation(services.putPackage, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      package_data.refetch();
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const PackageDelete = useMutation(services.deletePackage, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      package_data.refetch();
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const AddPackageToServer = () => {
    if (
      dnameRef.current.value &&
      costRef.current.value &&
      durationRef.current.value &&
      placeimageRef.current.files[0]
    ) {
      PackageUpload.mutate({
        destination: dnameRef.current.value,
        cost: costRef.current.value,
        duration: durationRef.current.value,
        image: placeimageRef.current.files[0],
      });
    } else {
      alert("Please Filled Required Filled");
    }
  };

  const EditPackageToServer = () => {
    if (
      dnameRef.current.value &&
      costRef.current.value &&
      durationRef.current.value
      // placeimageRef.current.files[0]
    ) {
      // console.log(placeimageRef.current.files[0],'I am Image')

      PackageEdit.mutate({
        packageid: packageid.current,
        destination: dnameRef.current.value,
        cost: costRef.current.value,
        duration: durationRef.current.value,
        image: placeimageRef.current.files[0]
          ? placeimageRef.current.files[0]
          : "",
      });
    } else {
      alert("Please Filled Required Filled");
    }
  };

  const packagedata = useMemo(() => {
    if (package_data.data) {
      const data = package_data.data.data;
      const search = data.filter((d) =>
        d.destination
          .replaceAllTxt(" ", "")
          .toLowerCase()
          .includes(searchText.replaceAllTxt(" ", "").toLowerCase())
      );
      // console.log(search, searchText);
      return search;
    }
  }, [package_data.data, searchText]);

  const OpenEdit = (data) => {
    packageid.current = data.id;

    dnameRef.current = data.destination;
    costRef.current = data.cost;
    durationRef.current = data.duration;
    // placeimageRef.current = null;
    OpenEditPackageShow();
  };

  const OpenDelete = (data) => {
    packageid.current = data.id;
    dnameRef.current = data.destination;
    setDeletePackageShow(true);
  };

  const descriptionRef = useRef(0);

  const OpenDescription = (data) => {
    packageid.current = data.id;
    dnameRef.current = data.destination;
    descriptionRef.current = data.description;

    setDescriptionShow(true);
  };

  const [IPS,setIPS] = useState(false);



  const del_dnameRef = useRef(0);

  // const [editorState, setEditorStateChange] = useState('');

  return (
    <div className={"pages"}>
      {/*   <textarea */}
      {/*   disabled */}
      {/*   value={editorState && draftToHtml(convertToRaw(editorState.getCurrentContent()))} */}
      {/* /> */}
      <TextEditor
        descriptionShow={descriptionShow}
        setDescriptionShow={setDescriptionShow}
        dnameRef={dnameRef}
        packageid={packageid}
        defaultData={descriptionRef.current ? descriptionRef.current : ""}
        EditDes={PackageDescription}
      />

      <Modal
        show={true}
        onHide={() => setDeletePackageShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
        <div>
          <Button className='btn btn-primary'>
           Add Place
          </Button>
        </div>
          <div className='divider'/>
        </Modal.Body>
        <Modal.Footer>
         
          <Button
            variant={"secondary"}
            onClick={(e) => setDeletePackageShow(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={deletePackageShow}
        onHide={() => setDeletePackageShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "red" }}>
            Delete <strong>{dnameRef.current}</strong> Package
          </h4>

          <p>
            <b>Are you sure want to Delete?</b>
            <br />
            Type your <strong>Package Name (Destination Name)</strong> to
            confirm you want to delete this package.
          </p>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {/* <Form.Label>Destination Name</Form.Label> */}
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Destination Name"
              required
              ref={del_dnameRef}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant={"danger"}
            onClick={(e) => {
              if (del_dnameRef.current.value === dnameRef.current) {
                PackageDelete.mutate({
                  packageid: packageid.current,
                });
                setDeletePackageShow(false);
              } else {
                alert("Package Name didn't match.");
                setDeletePackageShow(false);
              }
            }}
          >
            Delete Package
          </Button>
          <Button
            variant={"primary"}
            onClick={(e) => setDeletePackageShow(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={newPackageShow}
        onHide={() => setNewPackageShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "black" }}>New Package</h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Form.Label>Destination Name</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Destination Name"
              required
              ref={dnameRef}
            />

            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="number"
              className="mb-3"
              placeholder="Cost"
              required
              ref={costRef}
            />
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Duration"
              required
              ref={durationRef}
            />
            <Form.Label>Place Image</Form.Label>
            <Form.Control type="file" className="mb-3" ref={placeimageRef} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={"primary"}
            onClick={(e) => {
              AddPackageToServer();
              setNewPackageShow(false);
            }}
          >
            Add New Package
          </Button>
          <Button variant={"danger"} onClick={(e) => setNewPackageShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={editPackageShow}
        onHide={() => CloseEdtPackageShow()}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 style={{ color: "black" }}>Edit Package</h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Form.Label>Destination Name</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Destination Name"
              required
              defaultValue={dnameRef.current && dnameRef.current}
              ref={dnameRef}
            />

            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="number"
              className="mb-3"
              placeholder="Cost"
              required
              defaultValue={costRef.current && costRef.current}
              ref={costRef}
            />
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Duration"
              required
              defaultValue={durationRef.current && durationRef.current}
              ref={durationRef}
            />
            <Form.Label>Place Image</Form.Label>
            <Form.Control type="file" className="mb-3" ref={placeimageRef} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={"success"}
            onClick={(e) => {
              EditPackageToServer();
              CloseEdtPackageShow();
            }}
          >
            Update Package
          </Button>
          <Button variant={"danger"} onClick={(e) => CloseEdtPackageShow()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
        }}
      >
        <InputGroup style={{ width: 500 }}>
          <Form.Control
            type="text"
            placeholder="Search Packages"
            className="searchfield"
            onChange={(e) => {
              setSearchText(e.target.value);

              console.log(e.target.value);
            }}
          />
          <Button>
            <Search size={20} style={{ marginLeft: 3 }} />
          </Button>
        </InputGroup>
        <Button
          variant="secondary"
          style={{ marginLeft: 5 }}
          className="addnewpackage_btn"
          onClick={() => setNewPackageShow(true)}
        >
          <PlusSquare size={20} style={{ marginRight: 10 }} />
          Add New Package
        </Button>
      </div>
      <div>
        <Container>
          <Row>
            {package_data.data
              ? packagedata.map((item, id) => (
                  <PackageCard
                    data={item}
                    key={id}
                    edit={OpenEdit}
                    onDelete={OpenDelete}
                    openDes={OpenDescription}
                  />
                ))
              : null}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Package;

function nwc(x = 0) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" Ks");
}
