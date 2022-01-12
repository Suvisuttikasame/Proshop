import React, {useEffect} from 'react'
import {Col, Row, ListGroup, Container, Image, Card} from 'react-bootstrap'
import { useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {orderDetailAction} from '../action/orderAction'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Popup from '../components/Popup'




function Order(){

    const {id} = useParams()
    const dispatch = useDispatch()
    

    const { orderDetail, loading } = useSelector(state => state.orderDetail)
    const {shippingAddress, orderItems} = orderDetail


    useEffect(()=>{
        if(id){
            dispatch((orderDetailAction(id)))
            
        }
        
    },[id, dispatch])
    

    


    return loading ? 
        <Loading />:
        <Container className='justify-content-center'>
        <Row>
            <h3>Order #{orderDetail._id}</h3>
        </Row>
    <Row>
        <Col md={6}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h5><strong>Address</strong></h5>
                    <p>
                        {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode} {shippingAddress.country} 
                    </p>
                </ListGroup.Item>
                {orderDetail.isDeliveried ? 
                <Message variant={'success'}>Delivered</Message>:
                <Message variant={'danger'}>Not delivered</Message>}
                <ListGroup.Item>
                    <h5><strong>Payment</strong></h5>
                    <p>{orderDetail.paymentMethod}</p>
                </ListGroup.Item>
                {orderDetail.isPaid ? 
                <Message variant={'success'}>Paid</Message>:
                <Message variant={'danger'}>Not paid</Message>}
                <ListGroup.Item>
                    <h5><strong>Items</strong></h5>
                    {orderItems.map((x, index)=>{
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
                                {String(orderDetail.totalPrice - (orderDetail.taxPrice + orderDetail.shippingPrice))}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                Tax :
                            </Col>
                            <Col md={6}>
                                {orderDetail.taxPrice}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                Shipping :
                            </Col>
                            <Col md={6}>
                                {orderDetail.shippingPrice}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                Total :
                            </Col>
                            <Col md={6}>
                                {orderDetail.totalPrice}
                            </Col>
                        </Row>
                    </Card.Body>
                    {
                       orderItems.length > 0 && (orderDetail.isPaid ?<></>:
                        <Popup id={id} total={String(orderDetail.totalPrice)}/>)
                    
                    }                    
                </Card>
                                   
                
            </Container>
        </Col>
    </Row>
    </Container>
}

    


export default Order