import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
const Admin =()=>{
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