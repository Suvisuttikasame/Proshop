import React, {useEffect} from 'react'
import {cartAction, cartDeleteItem} from '../action/cartAction'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useLocation, useNavigate} from 'react-router-dom'
import { Row, Col, Image, Card, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Message from '../components/Message'



function Cart(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const qty = Number(location.search.split("=")[1])
    
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.userLogin)
    
    useEffect(()=>{
        if (id) {
            dispatch(cartAction(id, qty))
        }
        

    },[dispatch, id, qty])

    const deleteItem = (id) =>{
        dispatch(cartDeleteItem(id))
    }



    const checkoutHandler =(e) => {
        e.preventDefault()
        if (userInfo) {
            navigate('/shipping')
        }else{
            navigate('/login')
        }
        
    }


    return(
        <>
        <h1>Shopping Cart</h1>
        {
            cartItems.length === 0? 
            <Message>
                No Item in a cart. <Link to='/'>Click here</Link>
            </Message>:
            <>
            <Row>
             <Col md={8}>  
            <Row  style={{margin:'0.5rem 0'}}>
            <Col md={8} style={{textAlign:'center'}}>Item</Col>
            <Col md={2} style={{textAlign:'center'}}>Qty.</Col>
        </Row>
        {cartItems.map((x, i) => 
            <Row key={i} style={{margin:'0.3rem 0'}} className='align-items-center'>
                
                <Col md={4} style={{textAlign:'center'}}>    
                    <Image src={x.image} alt={x.name} fluid={true} style={{width:'10rem', height:'8rem'}}></Image>                                            
                </Col>
                <Col md={4} >
                    <Link to={`/product${x.id}`}>{x.name}</Link>
                </Col> 
                <Col md={2}>
                    <Form.Select size='sm' style={{width:'auto'}} value={x.qty} onChange={(e)=>{dispatch(cartAction(x.id, e.target.value))}}>
                        {[...Array(x.countInStock).keys()].map(index =>
                            <option key={index}>{index + 1}</option>
                            )}
                    </Form.Select>
                </Col>
                <Col md={2} style={{textAlign:'center'}}>
                    <Button className='btn btn-light' onClick={()=>{deleteItem(x.id)}}><i className='far fa-trash-alt'></i></Button>
                </Col>
                
            </Row>
                   
            )}
            </Col> 
            <Col md={4}>
    <Card style={{ width: '20rem' }}>
    <Card.Body>
    <Card.Title style={{textAlign:'center'}}>Total Price</Card.Title>
        <Card.Body>
            <Row className='align-items-center'>
                <Col md={8} style={{textAlign:'center'}}>Item</Col>
                <Col md={4} style={{textAlign:'center'}}>Price</Col>
            </Row>
      {cartItems.map((x, index) => 
        <React.Fragment key={index}>
           <Row className='align-items-center'>
               <Col md={8}>{x.name}</Col>
               <Col md={4}>Bth {(x.price * x.qty).toFixed(2)}</Col>
            </Row> 
        </React.Fragment>    
    )}
    <Row>
        <Col md={8}>
        Total :
        </Col>
        <Col md={4}>Bth
        {cartItems.reduce((acc, x)=>{
            const total = (x.price * x.qty).toFixed(2) 
            return acc + parseFloat(total)
        }, 0)}
        </Col>
    </Row>
    <Row>
        <Button variant='outline-warning' className='btn-sm mt-3' onClick={checkoutHandler}>Proceed to checkout</Button>
    </Row>
    </Card.Body>
    </Card.Body>
    </Card>
    </Col>
    </Row>
        </>
        
        }
               
        </>
        
        
    );
}



export default Cart