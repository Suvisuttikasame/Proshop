import React, {useEffect} from 'react'
import {Form, Row, Col, Button, ListGroup, Image, Container, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { placeOrderAction } from '../action/orderAction'
import { useNavigate } from 'react-router-dom'
import { cartReset } from '../action/cartAction'
import Message from '../components/Message'





function PlaceOrder() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { cartItems, shippingAddress, paymentMethod } = useSelector(state => state.cart)
    const { placeOrder } = useSelector(state => state.placeOrder)

    
    const items = cartItems.reduce((acc, x)=>{
            return acc + (x.price * x.qty)
    }, 0)  
    const tax = Number((0.07 * items).toFixed(2))
    const ship = Number(items > 1000 ? 0 : 100)

    const total = Number((items + tax + ship).toFixed(2))

    useEffect(()=>{
        if(placeOrder){
            navigate(`/order/${placeOrder._id}`)
            dispatch({
                type: 'RESET_ORDER'
            })
        }
    },[placeOrder, navigate, dispatch])


    const buttonClickHandler = () => {
            dispatch(placeOrderAction(tax, ship, total))
            dispatch(cartReset())
            
            localStorage.removeItem('cartItems')
            
    }

    return <>
    {
        !shippingAddress ? 
        <Message variant={'secondary'}>No Orderplacement detail</Message>:
        <Container className='justify-content-center'>
        <Row>
            <Col md={8}>
        <Row>
            <h2><strong>Prepare for place order</strong></h2>
        </Row>
        <Row>
        <ListGroup variant='flush'>
        
        <ListGroup.Item>
        <Form.Group  controlId="Address" style={{textAlign: 'left'}}>
        <Form.Label >Address</Form.Label>
        <Form.Control type="text" placeholder="Address" required value={shippingAddress.address}  disabled/>
        </Form.Group>

        <Form.Group  controlId="City" style={{textAlign: 'left'}}>
        <Form.Label >City</Form.Label>
        <Form.Control type="text" placeholder="City" required value={shippingAddress.city}  disabled/>
        </Form.Group>

        <Form.Group  controlId="PostalCode" style={{textAlign: 'left'}}>
        <Form.Label >Postalcode</Form.Label>
        <Form.Control type="text" placeholder="Postalcode" required value={shippingAddress.postalCode}  disabled/>
        </Form.Group>

        <Form.Group  controlId="Country" style={{textAlign: 'left'}}>
        <Form.Label >Country</Form.Label>
        <Form.Control type="text" placeholder="Country" required value={shippingAddress.country}  disabled/>
        </Form.Group>
                        </ListGroup.Item>
        <ListGroup.Item>
            Payment method : {paymentMethod}
        </ListGroup.Item>
        
        <ListGroup.Item>
        <h4><strong>Order list</strong></h4>
        <ListGroup variant='flush'>
            {cartItems.map((item, index)=>{
                return <ListGroup.Item key={index}>
                <Row>
                <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid style={{maxWidth: '2.5rem'}}/>
                </Col>
                <Col md={5} style={{fontSize: '0.6rem'}}>
                    {item.name}
                </Col>
                <Col md={1} style={{fontSize: '0.6rem'}}>
                    {item.qty}
                </Col>
                <Col md={1} style={{fontSize: '0.6rem'}}>
                    {item.price * item.qty}
                </Col>
            </Row>
            </ListGroup.Item>
            })}
            </ListGroup>
        </ListGroup.Item>

                    </ListGroup>
        

                </Row>
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <strong>Total Prices.</strong>
                        </Card.Title>
                        <Row>
                            <Col md={4}>
                                Items :
                            </Col>
                            <Col md={8}>
                                {items}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                Tax :
                            </Col>
                            <Col md={8}>
                                {tax}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                Shipping :
                            </Col>
                            <Col md={8}>
                                {ship}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                Total :
                            </Col>
                            <Col md={8}>
                                {total}
                            </Col>
                        </Row>
                    </Card.Body>
                    <Button variant='primary' onClick={buttonClickHandler}>Place order</Button>
                </Card>
            </Col>
        </Row>
    </Container> 

    }
    </>
}



export default PlaceOrder