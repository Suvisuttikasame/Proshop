import React, { useState, useEffect } from 'react'
import { Button, Container, Modal, Form } from 'react-bootstrap'
import QRcode from 'qrcode.react'
import {qrCodeGenAction, confirmTransactionAction, orderDetailAction} from '../action/orderAction'
import {useSelector, useDispatch} from 'react-redux'
import Loading from './Loading'
import Message from './Message'
import { useNavigate} from 'react-router-dom'




function Popup({ id, total }) {

    const dispatch =useDispatch()
    const navigate = useNavigate()

    const { updatePayment, loading : paymentLoad, error: paymentError } = useSelector(state => state.confirmTransaction) 
    const { qrText, loading, error } = useSelector(state => state.qrCodeGen)
    const [show, setShow] = useState(false);
    const [transactionId, setTransactionId] = useState('')
  
    const handleClose = () => {
      dispatch({
        type:'QR_RESET'
      })
      setShow(false)
    };
    const handleShow = () => {
      if (qrText.length===0) {
        dispatch(qrCodeGenAction(id, total))
      }
      setShow(true)
    };

    const confirmPaymentHandler = ()=>{
      dispatch({
        type:'QR_RESET'
      })
      dispatch(confirmTransactionAction(transactionId, id))
        
    }

    useEffect(()=>{
        if(updatePayment){
          dispatch((orderDetailAction(id)))
          setShow(false)
          dispatch({
            type: 'CONFIRM_TT_RESET'
          })
          
        }
    },[updatePayment, dispatch, navigate, id])
  
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
        <Form.Group  controlId="confirmTransactionId" style={{textAlign: 'left'}}>
        <Form.Label >Transaction id</Form.Label>
        <Form.Control type="text" placeholder="fill in your transaction id" required value={transactionId}  onChange={e => setTransactionId(e.target.value)}/>
        </Form.Group>
        {
              paymentLoad ? <Loading />:
              paymentError ? <Message variant={'danger'}>{paymentError}</Message>:
              <></>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={confirmPaymentHandler}>Confirm payment</Button>
           
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 export default Popup