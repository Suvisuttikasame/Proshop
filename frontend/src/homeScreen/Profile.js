import React, {useState, useEffect} from 'react'
import {Row, Col, Container, Form, Button, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {ConfirmNP} from '../components/ConfirmNewPassword'
import { orderByUserIdAction } from '../action/orderAction'
import {Link} from 'react-router-dom'
import Message from '../components/Message'
import Loading from '../components/Loading'


function Profile(){
    
    const dispatch = useDispatch()

    const { orderDetailByUser, loading } = useSelector(state => state.orderByUserId)
    


    const [buttonState, setState] = useState(true)
    
    
    const { userDetail } = useSelector(state => state.userProfile)
    const { name, email } = userDetail


    useEffect(()=>{
        if (userDetail) {
            dispatch(orderByUserIdAction())
              
        }
    },[dispatch, userDetail])

    
    const buttonHandler=()=>{
            setState(false)
    }
    
    return<Container className='justify-content-center'>
        <Row>
            <Col md={4}>
                <Row>
                    <h3>Profile</h3>
                </Row>
                <Row>
    <Form className='py-3'>
    <Form.Group className="mb-3" controlId="Name" style={{textAlign: 'left'}}>
    <Form.Label >Name</Form.Label>
    <Form.Control type="text" placeholder="Name" value={name}  disabled/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail" style={{textAlign: 'left'}}>
    <Form.Label >Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} disabled/>
    </Form.Group>

    {buttonState ? <Button type='submit' variant='outline-primary' onClick={buttonHandler}>change-password</Button> : <ConfirmNP />}
    
  
</Form>
</Row>
            </Col>
            <Col md={8}> 
            <h1>Order detail</h1>
            {
                loading ? <Loading  />: 
                orderDetailByUser.length >0 ?
                <ListGroup variant='flush'>
                        {orderDetailByUser.map((x, index)=>{
                        return <ListGroup.Item key={index}>
                            <Row>
                                <Col md={3}>
                                    Order {index + 1}:
                                </Col>
                                <Col md={6}>
                                    <Link to={`/order/${x._id}`}>{x._id}</Link>
                                </Col>
                            </Row>
                        </ListGroup.Item>})}
                        
                </ListGroup>:
                <Message variant={'primary'}>No items.</Message>

            }
                
                
            </Col>
        </Row>
    </Container>
}


export default Profile