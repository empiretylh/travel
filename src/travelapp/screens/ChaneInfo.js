import React, { useState, useContext, useRef, useEffect } from "react";
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
import { Info, InfoCircleFill, PersonAdd } from "react-bootstrap-icons";

import services from "../data/services";
import { TokenContext, LoadingContext, CAContext } from "../context/Context";
import { useMutation, useQuery } from "react-query";
import { IMAGE } from "../../assets/assets";
import { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";

const ChangeInfo = () => {
  const { setClietView } = useContext(CAContext);
  useEffect(() => {
    // console.log("You Entering.....");
    setClietView(false);
  }, []);

  const r_name = useRef(0);
  const r_image = useRef(0);
  const r_email = useRef(0);
  const r_phoneno = useRef(0);
  const r_address = useRef(0);

  const [modalShow, setModalShow] = useState(false);

  const cinfo_data = useQuery(["cinfodata"], services.getCompanyInfo);

  const infodata = useMemo(() => {
    if (cinfo_data.data) {
      return cinfo_data.data.data;
    }
  }, [cinfo_data.data]);

  const [ssShow, setSsShow] = useState(false);
  const { is_loading, setIsLoading } = useContext(LoadingContext);
  const UpdateInfo = useMutation(services.postCompanyInfo, {
    onSuccess: (e) => {
      // localStorage.setItem("user_token", e.data.token);
      // setToken(e.data.token);
      setIsLoading(false);
      setSsShow(true);
      cinfo_data.refetch();
    },
    onMutate: (e) => {
      setIsLoading(true);
      // console.log('mutating')
    },
    onError: (e) => {
      setIsLoading(false);
      // setModalText(
      // 	"Register Error, When your username is exisiting in our server, You cannot not register, So change your username to register."
      // );
      setModalShow(true);
      cinfo_data.refetch();
    },
  });

  const onUpdateClick = () => {
    if (
      r_name.current.value &&
      r_email.current.value &&
      r_phoneno.current.value &&
      r_address.current.value
    ) {
      UpdateInfo.mutate({
        companyname: r_name.current.value,
        email: r_email.current.value,
        phoneno: r_phoneno.current.value,
        address: r_address.current.value,
        image: r_image.current.files[0] ? r_image.current.files[0] : "",
      });
    } else {
      alert("Please fill require fields.");
    }
    // console.log(r_name.current.value)
  };

  return (
    <div className={"pages"}>
      <Container style={{ marginTop: 30 }}>
        <Row>
          <Col lg={5}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className={"registerform"}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <InfoCircleFill size={20} />
                <h5>Change Company Information</h5>
              </div>

              {cinfo_data.data && (
                <Form.Group className="mb-3" controlId="register-control">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="username"
                    className="mb-3"
                    defaultValue={infodata.companyname}
                    placeholder="Company Name"
                    required
                    ref={r_name}
                  />

                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    defaultValue={infodata.phoneno}
                    className="mb-3"
                    required
                    ref={r_phoneno}
                  />

                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="mb-3"
                    defaultValue={infodata.email}
                    placeholder="mgmg@travel.com"
                    required
                    ref={r_email}
                  />

                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    className="mb-3"
                    defaultValue={infodata.companyaddress}
                    required
                    ref={r_address}
                  />
                  <Form.Label>Company Logo</Form.Label>
                  <Form.Control type="file" className="mb-3" ref={r_image} />
                  <Button
                    type="submit"
                    variant="success"
                    style={{ width: "100%", marginBottom: 10 }}
                    onClick={onUpdateClick}
                  >
                    Update
                  </Button>
                </Form.Group>
              )}
            </Form>
          </Col>
          {cinfo_data.data &&
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
			//   backgroundColor:'red'
            }}
          >
       
            <LazyLoadImage
              src={infodata && axios.defaults.baseURL + infodata.image}
              style={{ width:250, height:250, marginBottom:10,objectFit:'contain' }}
            />
            <Table striped responsive hover className="persontable">
              <tbody>
                <tr>
                  <td>Company Name</td>
                  <th>{infodata.companyname}</th>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <th>{infodata.phoneno}</th>
                </tr>
                <tr>
                  <td>Email</td>
                  <th>{infodata.email}</th>
                </tr>
                <tr>
                  <td>Address</td>
                  <th>{infodata.companyaddress}</th>
                </tr>
              </tbody>
            </Table>
          </Col>}
        </Row>
      </Container>
    </div>
  );
};

export default ChangeInfo;
