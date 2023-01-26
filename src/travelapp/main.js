import React, { useState, useMemo } from "react";
import axios from "axios";
import { baseURL } from "./data/data";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import Download from "./screens/download";
import Home from "./screens/home";
import Login from "./screens/login";
import Admin from "./screens/admin";
import AddAdmin from "./screens/AddAdmin";
import Package from "./screens/package";

import { useEffect } from "react";
import services from "./data/services";
import "./main.css";
import "../fonts/Roboto-Black.ttf";
import "../fonts/Roboto-BlackItalic.ttf";
import "../fonts/Roboto-Bold.ttf";
import "../fonts/Roboto-BoldItalic.ttf";
import "../fonts/Roboto-Italic.ttf";
import "../fonts/Roboto-Light.ttf";
import "../fonts/Roboto-LightItalic.ttf";
import "../fonts/Roboto-Medium.ttf";
import "../fonts/Roboto-MediumItalic.ttf";
import "../fonts/Roboto-Regular.ttf";
import "../fonts/Roboto-Thin.ttf";
import "../fonts/Roboto-ThinItalic.ttf";
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
} from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  TokenContext,
  CAContext,
  LogoutContext,
  LoadingContext,
} from "./context/Context";
import NavBar from "./screens/navbar";
import SideBar from "./screens/sidebar";

import { IMAGE } from "../assets/assets";

import { useLocation } from 'react-router-dom'

const queryClient = new QueryClient();
axios.defaults.baseURL = baseURL;

const TravelMain = () => {
  const [token, setToken] = useState(null);

  const [WTLogout, setWTLogout] = useState(false);
  const [is_clientview, setClietView] = useState(true);

  const [is_loading, setIsLoading] = useState(false);



  useEffect(() => {
    // services.logout();
    const current_token = services.getCurrentUserToken();
    if (current_token) {
      axios.defaults.headers.common = {
        Authorization: `Token ${current_token}`,
      };
      console.log(current_token);
    } else {
      axios.defaults.headers.common = {
        Authorization: null,
      };
    }
    setToken(current_token);
  }, [token]);

  const tokenValue = useMemo(() => ({ token, setToken }), [token, setToken]);

  const Logout = () => {
    window.location.href = "/";
    // services.logout();
    setToken(null);
    setWTLogout(false);
  };

  const logoutvalue = useMemo(
    () => ({ WTLogout, setWTLogout }),
    [WTLogout, setWTLogout]
  );

  const is_CAValue = useMemo(
    () => ({ is_clientview, setClietView }),
    [is_clientview, setClietView]
  );

  const loadingValue = useMemo(
    () => ({ is_loading, setIsLoading }),
    [is_loading, setIsLoading]
  );





  return (
    <LoadingContext.Provider value={loadingValue}>
      <CAContext.Provider value={is_CAValue}>
        <LogoutContext.Provider value={logoutvalue}>
          <div>
            <QueryClientProvider client={queryClient}>
              <TokenContext.Provider value={tokenValue}>
                <HashRouter>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                  {is_clientview?
                    <NavBar/>:
                    <SideBar />}
                    <div className="pagewarpper">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route
                          path="/admin/addnewadmin"
                          element={<AddAdmin />}
                        />
                        <Route path="/admin/packages" element={<Package />} />
                      </Routes>
                    </div>
                  </div>
                </HashRouter>
              </TokenContext.Provider>
            </QueryClientProvider>
          </div>
          <Modal
            show={WTLogout}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <Modal.Title>Logout</Modal.Title>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p>
                  Are you sure want to logout from this account. If you want to
                  use this account, you need to remember your username and
                  password.
                </p>
              </div>
              <Modal.Footer>
                <Button variant={"danger"} onClick={() => Logout()}>
                  Yes, I want to Logout Now
                </Button>
                <Button variant={"primary"} onClick={() => setWTLogout(false)}>
                  No
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Modal>

          {is_loading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={IMAGE.loading}
                  style={{ width: 50, height: 50 }}
                  alt={"loading"}
                />
              </div>
            </div>
          )}
        </LogoutContext.Provider>
      </CAContext.Provider>
    </LoadingContext.Provider>
  );
};

export default TravelMain;
