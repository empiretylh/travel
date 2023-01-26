import React,{useContext,useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import {CAContext} from '../context/Context';
const Admin =()=>{

    const {is_clientview,setClietView} = useContext(CAContext);

    useEffect(()=>{
        setClietView(false)
    },[])


 return(
 	  <div className='pages'>
        <h1>
            Dashboard
        </h1>
        <Container>
            <Row>
                <Col>
                    <h1>I Am Admin</h1>
                </Col>
            </Row>
        </Container>
        </div>
 	)
}

export default Admin;