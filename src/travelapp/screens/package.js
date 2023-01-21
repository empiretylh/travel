import React, { useState, useContext, useRef } from "react";
import {
  Col,
  Row,
  Container,
  Table,
  Form,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { PersonAdd, Search, PlusSquare } from "react-bootstrap-icons";

import services from "../data/services";
import { TokenContext, LoadingContext } from "../context/Context";
import { useMutation } from "react-query";
import { IMAGE } from "../../assets/assets";

const Package = () => {
  const [newPackageShow, setNewPackageShow] = useState(false);

  const { is_loading, setIsLoading } = useContext(LoadingContext);

  const dnameRef = useRef(0);
  const costRef = useRef(0);
  const durationRef = useRef(0);
  const placeimageRef = useRef(0);

  const PackageUpload = useMutation(services.addPackage, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
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
  return (
    <div className={"pages"}>
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
            <Form.Control
              type="file"
              className="mb-3"
              placeholder="Duration"
              ref={placeimageRef}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"primary"} onClick={(e) => AddPackageToServer()}>
            Add New Package
          </Button>
          <Button variant={"danger"} onClick={(e) => setNewPackageShow(false)}>
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
          />
          <Button>
            <Search size={20} style={{ marginLeft: 3 }} />
          </Button>
        </InputGroup>
        <Button
          variant="secondary"
          style={{ marginLeft: 5 }}
          onClick={() => setNewPackageShow(true)}
        >
          <PlusSquare size={20} style={{ marginRight: 10 }} />
          Add New Package
        </Button>
      </div>
    </div>
  );
};

export default Package;
