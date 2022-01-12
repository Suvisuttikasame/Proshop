import React, { useState, useEffect, useMemo } from 'react'
import { Button, Container, Modal} from 'react-bootstrap'
import QRcode from 'qrcode.react'
import {qrCodeGenAction,  orderDetailAction} from '../action/orderAction'
import {useSelector, useDispatch} from 'react-redux'
import Loading from './Loading'
import Message from './Message'
import WebSocket from 'isomorphic-ws'




function Popup({ id, total }) {

    const dispatch =useDispatch()
    
    
    const { qrText, loading, error } = useSelector(state => state.qrCodeGen)
    const { orderDetail} = useSelector(state => state.orderDetail)
    const [show, setShow] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(false)
    
    
    const ws =useMemo(()=> new WebSocket(`ws://127.0.0.1:5000?orderid=${orderDetail._id}`), [orderDetail._id]) 
  
    const handleClose = () => {
      dispatch({
        type:'QR_RESET'
      })
      setShow(false)
    };
    const handleShow =  () => {
      
      if (qrText.length===0) {
        dispatch(qrCodeGenAction(id, total))
        
      }
      setShow(true)
      
    };

    

    useEffect(()=>{
      
      ws.onopen = function open() {
        console.log('connected');
        ws.send('Im client');
        
      };

      ws.onmessage = function incoming(data) {
        
        if (data.data === 'payment complete') {
          setPaymentStatus(true)
        } 
        
        
      };


    },[ws])

    
    useEffect(()=>{
        
        if(paymentStatus){
          dispatch((orderDetailAction(id)))
          setPaymentStatus(false)
          setShow(false)
          dispatch({
            type:'QR_RESET'
          })
        }
        
    },[paymentStatus, dispatch, id])
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          SCB EASY SCAN
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Scan to pay on SCB EASY APP</Modal.Title>
          </Modal.Header>
          <Container className='mt-3' >
            {loading ? <Loading />:
            error ? <Message variant={'danger'}>{error}</Message>:
                <QRcode value={qrText} style={{margin: '0 auto' ,height: '256px', width: '256px', display: 'block'}}/>
            }
          </Container>
          <Modal.Body>
             <h4>Scan and pay your order.</h4>
        
          </Modal.Body>
          <Modal.Footer>
                       
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 export default Popup