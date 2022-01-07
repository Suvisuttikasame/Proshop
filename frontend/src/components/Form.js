import React from "react";
import {Container, Row, Col} from 'react-bootstrap'


function CustomForm({ children }) {
    
    return <Container style={{textAlign: 'center'}}>
        <Row className="justify-content-center">
            <Col md={6}>
            {children}
            </Col>
        </Row>
    </Container>
}


export default CustomForm