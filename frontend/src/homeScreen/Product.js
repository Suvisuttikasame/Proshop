import React, { useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import {useDispatch, useSelector} from 'react-redux'
import {productDetailAction, productReviewAction} from '../action/productAction'
import Loading from '../components/Loading';
import Message from '../components/Message';


function Product(){
    const {id} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[qty, setQty] = useState(1)
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(1)
    const [message, setMessage] = useState('')

    const productReview = useSelector(state => state.productReview)
    const productDetail = useSelector(state => state.productDetail)
    const userProfile = useSelector(state => state.userProfile)
    const {loading, error, data: product} = productDetail
    const{userDetail} = userProfile
    const {success: reviewSuccess, error: reviewError} = productReview

    useEffect(() =>{
        dispatch(productDetailAction(id))
        setMessage('')
        if(reviewSuccess){
          dispatch({
            type:'REVIEW_PRODUCT_RESET'
          })
          
        }
    }, [dispatch, id, reviewSuccess]);

    const addToCart = (id, qty)=>{
      
      navigate(`/cart/${id}?qty=${qty}`)
        
    }

    const validation = (name, comment) => {
      if (!name || !comment) {
          return false
      }else{
          return true
      }
  }

    const reviwSubmitHandler = (e) =>{
      e.preventDefault()
      if (validation(name, comment)) {
        const review = {
          name,
          comment,
          user: userDetail._id,
          rating
        }
        dispatch(productReviewAction(id, review))
          setMessage('')
          setName('')
          setComment('')
          setRating(1)
        
      } else {
        setMessage('fill in all info.')
      }
    }
    
    return(loading ? 
        <Loading />:
        error?
        <Message variant={'danger'} children={error} />:
        <>
          <Link className='btn btn-outline-dark my-3' to='/'>
            Go back
          </Link>  
          <Row>
             <Col md={6}>
              <Image src={product.image} alt={product.name} fluid='true'/>
             </Col>
             <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item> 
                <ListGroup.Item>
                  <Rating value={product.rating} review={product.numReviews}/>
                </ListGroup.Item> 
                <ListGroup.Item>
                  Price Bth {product.price}
                </ListGroup.Item>  
                <ListGroup.Item>
                  {product.description}
                </ListGroup.Item> 
                </ListGroup>
             </Col> 
                <Col md={3}>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col >
                    Price:
                    </Col>
                    <Col>
                    Bth {product.price}
                    </Col>
                  </Row>
                </ListGroup.Item> 
                <ListGroup.Item>
                  <Row>
                    <Col >
                    Status:
                    </Col>
                    <Col>
                    {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                    </Col>
                  </Row>
                </ListGroup.Item> 
                
                
                <ListGroup.Item>
                  <Row>
                    <Col md={4} sm={6}>
                    Qty.
                    </Col>
                    <Col md={8} sm={6}>
                    <Form.Select size='sm' disabled={product.countInStock === 0} value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                    {product.countInStock > 0  ?
                      [...Array(product.countInStock).keys()].map( i => <option key={i}> {i+1} </option>):
                      <option> 0 </option>
                    }
                    </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>   
                <ListGroup.Item>
                  <Button className='btn-outline-dark' style={{width:'100%', minWidth:'100%'}}  disabled={product.countInStock === 0} onClick={()=>{addToCart(id, qty)}}>Add to Cart</Button>
                </ListGroup.Item>
                
                
                </ListGroup>
                </Col>
              
          </Row>
          <Row style={{marginTop: '0.5rem'}}>
          <h3>Reviews</h3>
          </Row>
          <Row>
            <Col md={6}>
                  {
                    product.review ? (product.review.length > 0 ?  <Row style={{height: '8rem', overflowY: 'scroll', marginTop: '0.4rem'}}>
                      {
                      product.review.map((item, index) =>{
                      return <React.Fragment key={index}>
                       <ListGroup variant='flush'>
                        <ListGroup.Item>user | {item.name}</ListGroup.Item>
                        <ListGroup.Item style={{display :'flex'}}>rating | <Rating value={item.rating} /></ListGroup.Item>
                        <ListGroup.Item>comment | {item.comment}</ListGroup.Item>
                      </ListGroup>
                      <hr style={{width: '100%', margin: '0.2 auto', color: 'red'}}/>
                      </React.Fragment>
                    })
                      }
                    </Row>:
                    <Message variant={'primary'}>No reviews.</Message>  
                    ):
                    <Message variant={'primary'}>No reviews.</Message>
                    
                  }
            </Col>
          </Row>
          <Row className='my-3'>
            <Col md={6}>
              <h3>Comment</h3>
              {message.length > 0 && <Message variant={'danger'}>{message}</Message>}
              {reviewError && <Message variant={'danger'}>{reviewError}</Message>}
              
              {
                userProfile.userDetail ? 
              <Form onSubmit={reviwSubmitHandler}>
              <Form.Group className="mb-3" controlId="Name">
              <Form.Label>User name</Form.Label>
              <Form.Control type="text" placeholder="Name" value={name} onChange={e => {setName(e.target.value)}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Rating</Form.Label>
              <Form.Select value={rating} onChange={e=>{setRating(e.target.value)}}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Comment">
              <Form.Label>comment</Form.Label>
              <Form.Control type="text" placeholder="comment" as='textarea' rows={3} style={{resize: 'none'}} value={comment} onChange={e => {setComment(e.target.value)}}/>
              <Button type='submit' variant='outline-primary' className='my-3'>comment</Button>
              </Form.Group>
              </Form>:
              <Message variant={'primary'}>Please sign in  <Link to='/login'>here</Link></Message>
              }
              
            </Col>
          </Row>
                
        </>
    );
}



export default Product;
