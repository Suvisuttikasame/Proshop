import {Row, Col, Carousel, Image} from 'react-bootstrap'
import React, { useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import Product from '../components/Product';
import {useDispatch, useSelector} from 'react-redux'
import {productListAction} from '../action/productAction'
import Loading from '../components/Loading'
import Message from '../components/Message';
import Paginate from '../components/Paginate';


function Homescreen(){
    const {keyword, page} = useParams()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, data: products, maxRating  } = productList
    
    const keyWord = keyword ? keyword : ''   
    
    useEffect(() =>{
        dispatch(productListAction(keyWord, page))

    }, [dispatch, keyWord, page]);

    return (loading ? 
    <Loading /> : 
    error ?
    <Message variant='danger' children={error}/>:
    <>
        <Row><h1>Lastest Product</h1></Row>

        <Carousel pause='hover' style={{width :'100%', height: '30%', margin:'1.5rem auto'}}>
        {
            maxRating.map((x, index)=>{
                return <Carousel.Item interval={3000} key={index}>
                <Link to={`/product${x._id}`}>
                <Image
                  className="d-block"
                  src={x.image}
                  alt={x.name}
                  fluid
                  style={{margin: '0 auto'}}
                />
                <Carousel.Caption style={{paddingBottom: '1rem'}}>
                  <h3>{x.name}</h3>
                  <h6>Price {x.price}</h6>
                </Carousel.Caption>
                </Link>  
                </Carousel.Item>
            })
        }
        </Carousel>
        
        <Row>
          {products.map(product =>{
           return(
             
               <Col key={product._id} sm={12} md={6} lq={4} xl={3}>
                  <Product product={product}/>
               </Col> 
             
           ); 
          }  
        )}
        </Row>
        <Paginate />
    </>
        
    );
}



export default Homescreen;