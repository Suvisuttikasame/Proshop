import React, {useState, useEffect} from 'react'
import { Row, ListGroup, Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CustomForm from '../components/Form'
import CheckoutStep from '../components/CheckoutStep'
import Message from '../components/Message'
import { addAddress } from '../action/cartAction'



function Shipping(){
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const [message, setMessage] =useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { shippingAddress } = useSelector(state => state.cart)

    useEffect(()=>{
        if (shippingAddress) {
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setPostalCode(shippingAddress.postalCode)
            setCountry(shippingAddress.country)
            
        } 
    },[shippingAddress])
    


    const validation = (address, city, postalCode, country) => {
        if (!address || !city || !postalCode || !country) {
            return false
        }else{
            return true
        }
    }



    const continueHandler = (e) => {
        e.preventDefault()
        const check = validation(address, city, postalCode, country)
        if (check) {
            dispatch(addAddress(address, city, postalCode, country))
            navigate('/payment')
            setMessage('')
        }else{
            setMessage('Please fill in all details')
        }
        
    }  


    return <CustomForm>
        <Row><h1><strong>Shipping</strong></h1></Row>
        <CheckoutStep  step={2} />
        {message.length > 0 && <Message variant='danger'>{message}</Message>}
        <ListGroup variant='flush'>
        
        <ListGroup.Item>
        <Row>
        <Form.Group  controlId="Address" style={{textAlign: 'left'}}>
        <Form.Label >Address</Form.Label>
        <Form.Control type="text" placeholder="Address" required value={address}  onChange={e => setAddress(e.target.value)}/>
        </Form.Group>
        </Row>
        </ListGroup.Item>
        <ListGroup.Item>
        <Row>
        <Form.Group  controlId="City" style={{textAlign: 'left'}}>
        <Form.Label >City</Form.Label>
        <Form.Control type="text" placeholder="City" required value={city}  onChange={e => setCity(e.target.value)}/>
        </Form.Group>
        </Row>
        </ListGroup.Item>
        <ListGroup.Item>
        <Row>
        <Form.Group  controlId="Postalcode" style={{textAlign: 'left'}}>
        <Form.Label >Postalcode</Form.Label>
        <Form.Control type="text" placeholder="Postalcode" required value={postalCode}  onChange={e => setPostalCode(e.target.value)}/>
        </Form.Group>
        </Row>
        </ListGroup.Item>
        <ListGroup.Item>
        <Row>
        <Form.Group  controlId="Country" style={{textAlign: 'left'}}>
        <Form.Label >Country</Form.Label>
        <Form.Control type="text" placeholder="Country" required value={country}  onChange={e => setCountry(e.target.value)}/>
        </Form.Group>
        </Row>
        </ListGroup.Item>
        
        </ListGroup>

        <Button variant='primary' onClick={continueHandler} className='my-3'>continue</Button>
    </CustomForm>
}


export default Shipping