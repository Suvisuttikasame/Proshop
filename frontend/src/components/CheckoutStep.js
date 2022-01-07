import React from 'react'
import {Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'



function CheckoutStep({ step }) {
    return <Nav className='my-3'>
        <Nav.Item>
            <Nav.Link as={Link} to='/login' disabled={step >= 1 ? false: true}><strong>step 1</strong></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={Link} to='/shipping' disabled={step >= 2 ? false: true}><strong>step 2</strong></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={Link} to='/payment' disabled={step >= 3 ? false: true}><strong>step 3</strong></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={Link} to='/placeorder' disabled={step >= 4 ? false: true}><strong>step 4</strong></Nav.Link>
        </Nav.Item>
    </Nav>
}


export default CheckoutStep