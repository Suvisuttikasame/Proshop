import React, {useState, useEffect} from 'react'
import {Form, Button, Image} from 'react-bootstrap'
import { useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {adminProductCreateAction} from '../action/adminAction'
import CustomForm from '../components/Form'
import Loading from '../components/Loading'
import Message from '../components/Message'
import axios from 'axios'


function AdminProductCreate(){

    
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [cat, setCat] = useState('')
    const [des, setDes] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [message ,setMessage] = useState('')

    const dispatch = useDispatch()
    const {userDetail} = useSelector(state => state.userProfile)
    const {loadingCreate, errorCreate, successCreate} = useSelector(state => state.adminManageProduct)

    
    useEffect(()=>{
        
        if(successCreate){
            dispatch({
                type: 'PRODUCT_CREATE_RESET'
            })
            navigate('/admin/product')
        }
        
    }, [dispatch, successCreate, navigate])

    const validation = (name, image, brand, cat, des, price, stock) => {
        if (!name || !image || !brand || !cat || !des || !price || !stock) {
            setMessage('fill in your detail.')
            return false
        }else{
            if (isNaN(price) && isNaN(stock)) {
                setMessage('price and stock need to be number.')
                return false
            } else {
                return true
            }
        }
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        if (validation(name, image, brand, cat, des, price, stock)) {
            setMessage('')
            const newProduct = {
                name,
                image,
                brand,
                category: cat,
                description: des,
                price:Number(price),
                countInStock: Number(stock)
            }
            dispatch(adminProductCreateAction(userDetail._id, newProduct))
            
        } 
        
    }

    const imageHandler = async (e) =>{
        const file = e.target.files[0]
        const formdata = new FormData()
        formdata.append('image', file)

        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }

        try {
            const {data} = await axios.post('/api/upload', formdata, config)
            setImage(data)
            setMessage('')
            
        } catch (error) {
            setMessage(error.message)
        }
    }


    return<>
    {message.length > 0 && <Message variant={'danger'}>{message}</Message>}
    {errorCreate && <Message variant={'danger'}>{errorCreate}</Message>}
    {loadingCreate && <Loading />}
    {       
    <CustomForm >
    <Form.Group className="mb-3" controlId="Name" style={{textAlign:'left'}}>
    <Form.Label >Name</Form.Label>
    <Form.Control type="text" placeholder="Product name" value={name} onChange={e=> {setName(e.target.value)}}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="Image" style={{textAlign:'left'}}>
    <Form.Label style={{display:'block'}}>Image</Form.Label>
    {
        image &&
        <Image src={image} alt={name} fluid style={{maxWidth: '30%', margin: '0.2rem auto', display:'block' }}></Image>
    }
    <Form.Control type="text" placeholder="Product image" value={image} onChange={e=> {setImage(e.target.value)}} disabled/>
    <input type="file" placeholder="Image file" onChange={e => {imageHandler(e)}} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="Brand" style={{textAlign:'left'}}>
    <Form.Label>Brand</Form.Label>
    <Form.Control type="text" placeholder="Product brand" value={brand} onChange={e=> {setBrand(e.target.value)}} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="Category" style={{textAlign:'left'}}>
    <Form.Label>Category</Form.Label>
    <Form.Control type="text" placeholder="Product category" value={cat} onChange={e=> {setCat(e.target.value)}} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="Description" style={{textAlign:'left'}}>
    <Form.Label>Description</Form.Label>
    <Form.Control type="text" placeholder="Product description" value={des} onChange={e=> {setDes(e.target.value)}} as='textarea' rows={3} style={{resize: 'none'}}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="Price" style={{textAlign:'left'}}>
    <Form.Label>Price</Form.Label>
    <Form.Control type="text" placeholder="Product price" value={price} onChange={e=> {setPrice(e.target.value)}} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="CountInStock" style={{textAlign:'left'}}>
    <Form.Label>In stock</Form.Label>
    <Form.Control type="text" placeholder="Product in stock" value={stock} onChange={e=> {setStock(e.target.value)}} />
    </Form.Group>

    <Button variant="primary" onClick={e => {submitHandler(e)}}>
    Create
    </Button>
    </CustomForm>
}
    </>
}


export default AdminProductCreate