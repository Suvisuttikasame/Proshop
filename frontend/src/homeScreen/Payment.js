import React, { useState } from 'react'
import {Form, Row, ListGroup, Button} from 'react-bootstrap'
import CustomForm from '../components/Form'
import CheckoutStep from '../components/CheckoutStep'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPaymentMethod } from '../action/cartAction'
import Message from '../components/Message'



function Payment(){
    
    const [ paymentMethod, setPaymentMethod ] = useState('')
    const [message, setMessage] = useState('')

    const dispatch =useDispatch()
    const navigate = useNavigate()

    const validation = (paymentMethod) =>{
        if (paymentMethod) {
            return true
        }else{
            return false
        }
    }

    const continueHandler= ()=>{

        const check = validation(paymentMethod)
        if (check) {
            dispatch(addPaymentMethod(paymentMethod))
            navigate('/placeorder')
            setMessage('')
        } else {
            setMessage('Please select payment method.')
        }

        
    }
    return <CustomForm>
        <Row>
            <h1><strong>Payment method</strong></h1>
        </Row>
        <CheckoutStep step={3}/>
        <Row>
            <ListGroup variant='flush'>
                <ListGroup.Item><h3>
                    <strong>Choose payment method</strong>
                    </h3></ListGroup.Item>
                <ListGroup.Item>

                {message.length > 0 && <Message variant='danger'>{message}</Message>}
                
                <Form.Check 
                    type='radio'
                    id='SCB EASY'                 
                    name='paymentMethod'
                    value='SCB EASY'
                    onChange={e => {setPaymentMethod(e.target.value)}}
                />
                <p>SCB EASY SCAN</p>
                <Form.Check 
                    type='radio'
                    id='creditCard' 
                    name='paymentMethod'
                    value='creditCard'              
                    onChange={e => setPaymentMethod(e.target.value)}
                />
                <p>Credit card</p>
                <Form.Check 
                    type='radio'
                    id='debitCard' 
                    name='paymentMethod'
                    value='debitCard'              
                    onChange={e => setPaymentMethod(e.target.value)}
                />
                <p>Debit card</p>
                <Form.Check 
                    type='radio'
                    id='cash' 
                    name='paymentMethod'
                    value='cash'              
                    onChange={e => setPaymentMethod(e.target.value)}
                />
                <p>Cash</p>

                </ListGroup.Item>
                
            </ListGroup>
        </Row>
        <Button variant='primary' onClick={continueHandler} className='my-3'>continue</Button>
    </CustomForm>
}


export default Payment