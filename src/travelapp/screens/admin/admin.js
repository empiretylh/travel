import React, { useContext, useEffect, useMemo } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { CAContext,NavigationContext ,LoginContext} from "../../context/Context";
import {
  BookFill,
  ChatRightFill,
  Journals,
  Chat,
  Map,
  CashCoin,
  People,
  CashStack,
} from "react-bootstrap-icons";
import { Column } from "@ant-design/charts";
import { useQuery } from "react-query";
import services from "../../data/services";
const Admin = () => {
  const { is_clientview, setClietView } = useContext(CAContext);
  const {active,UpdateActive} = useContext(NavigationContext);
  
   const {isLoginS,setIsLoginS} = useContext(LoginContext);
   useEffect(()=>{
    setIsLoginS(false)
   })


  useEffect(() => {
    setClietView(false);
    UpdateActive('home')
  }, []);

  const package_data = useQuery("adminpackage_data", services.getPackage);
  const feedback_data = useQuery("adminfeedback_data", services.getFeedBack);
  const booking_data = useQuery(["admin_booking", "all"], services.getBookings);

  const pk = useMemo(() => {
    if (package_data.data) {
      return package_data.data.data;
    }

    return [];
  }, [package_data.data]);

  const feedback = useMemo(() => {
    if (feedback_data.data) {
      return feedback_data.data.data;
    }

    return [];
  }, [feedback_data.data]);

  const unCompleteBooking = useMemo(() => {
    if (booking_data.data) {
      const bk = booking_data.data.data;
      const uncompletefilter = bk.filter((a) => a.is_finish === false);
      return uncompletefilter;
    }

    return [];
  }, [booking_data.data]);

  const ComputeRevenue = useMemo(() => {
    if (booking_data.data) {
      const bk = booking_data.data.data;
      let total = 0;
      bk.map((item, id) => {
        if(item.is_cancel){
          total = total +(parseInt(item.cost)*0.3)
        }else{
        total = total + parseInt(item.paid);
      }
      });
      return total;
    }

    return [];
  }, [booking_data.data]);

  const ComputeChartData = useMemo(() => {
    if (booking_data.data) {
      const bk = booking_data.data.data;
      let total = 0;

      const finaldata = {};
      bk.map((item, id) => {
        if (!finaldata[item.package]) {
          finaldata[item.package] = { type: item.package, paid: item.paid };
        } else {
          finaldata[item.package].paid =
            parseInt(finaldata[item.package].paid) + parseInt(item.paid);
        }
      });

      console.log(Object.values(finaldata));
      return Object.values(finaldata);
    }

    const data = [
      {
        type: "Package",
        paid: 0,
      },
      {
        type: "Package1",
        paid: 100,
      },
      {
        type: "Package2",
        paid: 300,
      },
      {
        type: "Package3",
        paid: 400,
      },
    ];

    return data;
  }, [booking_data.data]);

  const data = ComputeChartData;
 
  const brandColor = "#4e00ad";

  const config = {
    data,
    xField: "type",
    yField: "paid",
    seriesField: "",
    color: ({ type }) => {
      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return (
    <div className="pages">
      <Container fluid style={{marginTop:15}}>
        <h2 style={{fontFamily:'Roboto-Bold'}}>Dashboard</h2>
        <p style={{fontFamily:'Roboto-Black'}}>Travel Admin Panel can manage and create your own packages and bookings</p>
        <Row style={{ marginBottom: 10 }}>
          <Col lg={3} md={6} sm={12}>
            <div className="box1" onClick={()=>{
                window.location.href = '#/admin/packages/'
                }}>
              <Map size={20} />
              <div>
                <h5>Packages</h5>
                <h4>{pk.length}</h4>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <div className="box1 b2" onClick={()=>{
                window.location.href = '#/admin/bookings/'
                }}>
              <Journals size={20} />
              <div>
                <h5>Bookings</h5>
                <h4>{unCompleteBooking.length}</h4>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <div className="box1 b3" onClick={()=>{
                window.location.href = '#/admin/feedbacks/'
                }}>
              <Chat size={20} />
              <div>
                <h5>Feedbacks</h5>
                <h4>{feedback.length}</h4>
              </div>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <div className="box1 b4" onClick={()=>{
                window.location.href = '#/admin/bookings/'
                }}>
              <CashCoin size={20} />
              <div>
                <h5>Revenue</h5>
                <h4>{nwc(ComputeRevenue)}</h4>
              </div>
            </div>
          </Col>
        </Row>
        <div className="divider" />
        <Row style={{ marginTop: 20 }}>
          <Col lg={9}>
          <h5 style={{fontFamily:'Roboto-Bold',marginBottom:15}}><CashStack/> Most Sales Packages Chart</h5>
            <Column {...config} />
          </Col>
          <Col lg={3}>
            <h5 style={{fontFamily:'Roboto-Bold',marginBottom:15}}>
            <People/> People Limit</h5>
            <Table striped responsive hover>
              <tbody>
                <tr>
                  <th>No</th>
                  <th>Packages</th>
                  <th>People Limit</th>
                </tr>
                {package_data.data &&
                  pk.map((item, id) => (
                    <tr>
                      <td>{id + 1}</td>
                      <td style={{textAlign:'left'}}>{item.destination}</td>
                      <td style={{textAlign:'center'}}>{item.people_limit}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

function nwc(x = 0) {
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    .concat(" MMK");
}

export default Admin;
