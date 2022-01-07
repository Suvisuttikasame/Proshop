import React, {useEffect} from 'react'
import {Col, Row, ListGroup, Container, Image, Card, Button} from 'react-bootstrap'
import { useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {adminOrderUpdateAction, adminOrderItemAction} from '../action/adminAction'



function AdminOrderItem(){

    const {id} = useParams()
    const dispatch = useDispatch()
    
    const {userDetail} = useSelector(state => state.userProfile)
    const { loadingItem, errorItem, orderItem, errorUpdate, successUpdate } = useSelector(state => state.adminManageOrder)
    


    useEffect(()=>{
        if (successUpdate) {
           dispatch(adminOrderItemAction(userDetail._id, id)) 
           dispatch({
               type: 'ORDER_UPDATE_RESET'
           })
        }   
    },[successUpdate, dispatch, userDetail._id, id])
        

    const deliverHandler=(e) =>{
        e.preventDefault()
        
        dispatch(adminOrderUpdateAction(userDetail._id, id))
    }

    return <>{loadingItem ? 
        <Loading />:
        errorItem ?
        <Message variant={'danger'}>{errorItem}</Message>:
        <Container className='justify-content-center'>
        <Row>
            <h3>Order #{orderItem._id}</h3>
        </Row>
    <Row>
        <Col md={6}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h5><strong>Address</strong></h5>
                    <p>
                        {orderItem.shippingAddress.address}, {orderItem.shippingAddress.city} {orderItem.shippingAddress.postalCode} {orderItem.shippingAddress.country} 
                    </p>
                </ListGroup.Item>
                {orderItem.isDeliveried ? 
                <Message variant={'success'}>Delivered</Message>:
                <Message variant={'danger'}>Not delivered</Message>}
                <ListGroup.Item>
                    <h5><strong>Payment</strong></h5>
                    <p>{orderItem.paymentMethod}</p>
                </ListGroup.Item>
                {orderItem.isPaid ? 
                <Message variant={'success'}>Paid</Message>:
                <Message variant={'danger'}>Not paid</Message>}
                <ListGroup.Item>
                    <h5><strong>Items</strong></h5>
                    {orderItem.orderItems.map((x, index)=>{
                        return <Container key={index}>
                        < Row style={{fontSize: '0.5rem'}} className='my-1'>
                            <Col md={2}>
                                <Image src={x.image} alt={x.name} fluid/>
                            </Col>
                            <Col md={5}>
                                {x.name}
                            </Col>
                            <Col md={1}>
                                Qty.
                            </Col>
                            <Col md={1}>
                                {x.qty}
                            </Col>
                        </Row>
                        </Container>
                    })}
                </ListGroup.Item>

            </ListGroup>
        </Col>
        <Col md={4} className='mx-3'>
            <Container className='justify-content-center'>
                                   
                    <Card>
                    <Card.Body>
                        <Card.Title>
                            <strong>Total Prices.</strong>
                        </Card.Title>
                        <Row>
                            <Col md={6}>
                                Items :
                            </Col>
                            <Col md={6}>
                                {String(orderItem.totalPrice - (orderItem.taxPrice + orderItem.shippingPrice))}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                Tax :
                            </Col>
                            <Col md={6}>
                                {orderItem.taxPrice}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                Shipping :
                            </Col>
                            <Col md={6}>
                                {orderItem.shippingPrice}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                Total :
                            </Col>
                            <Col md={6}>
                                {orderItem.totalPrice}
                            </Col>
                        </Row>
                    </Card.Body>
                    {
                        orderItem.isDeliveried  ? <></>:
                    <Button variant='outline-primary' size='sm' onClick={e =>{deliverHandler(e)}} disabled={!orderItem.isPaid}>deliver</Button>
                    }                    
                </Card>
                {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}
                                   
                
            </Container>
        </Col>
    </Row>
    </Container>}
    </>
}

    


export default AdminOrderItem