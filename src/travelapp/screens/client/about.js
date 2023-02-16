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
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
          <h2>Founder</h2>
          <div style={{display:'flex',flexDirection:'row',marginTop:10}}>
          <img src={IMAGE.tzp} style={{width:160,height:160, borderRadius:160,objectFit:'cover'}}/>
            <div style={{marginLeft:10}}>
              <h4>Thawe Zin Phyo</h4>
              <p>Lorem Ispem span asdf adsfk lInaw KLiw iEaa ejadh jasdfl Jljad <br/>
                Lorem Ispem Thuer adf adfkj ldfjiad adjfokajwi ueiiI iwe I whdfwokde</p>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'row',marginTop:30}}>
          <img src={IMAGE.tmt} style={{width:160,height:160, borderRadius:160,objectFit:'cover'}}/>
            <div style={{marginLeft:10}}>
              <h4>Thin Myat Thazin Aye</h4>
              <p>Lorem Ispem span asdf adsfk lInaw KLiw iEaa ejadh jasdfl Jljad <br/>
                Lorem Ispem Thuer adf adfkj ldfjiad adjfokajwi ueiiI iwe I whdfwokde</p>
            </div>
          </div>
          </div>
        </div>
    </div>
  );
};
export default Booking;

const isData = (d = []) => {
  return d.length >= 1;
};
