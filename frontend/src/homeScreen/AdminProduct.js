import React, {useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {Button, Row, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {adminProductListAction, adminProductDeleteAction, adminProductItemAction} from '../action/adminAction'
import Loading from '../components/Loading'
import Message from '../components/Message'


function AdminProduct(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userDetail} = useSelector(state => state.userProfile)
    const { loadingList, productList, errorList, errorDelete, successDelete } = useSelector(state => state.adminManageProduct)

    useEffect(()=>{
        dispatch(adminProductListAction(userDetail._id))
        
        if (successDelete) {
            dispatch({
                type: 'PRODUCT_DELETE_RESET'
            })
        }
    },[dispatch, userDetail._id, successDelete])

    const deleteHandler= (id, e) =>{
        e.preventDefault()
        if (window.confirm('Are you sure to delete this product ?')) {
            dispatch(adminProductDeleteAction(userDetail._id, id))
            
        } 
        
    } 

    const editHandler= (id, e) =>{
        e.preventDefault()
        dispatch(adminProductItemAction(userDetail._id, id))
        navigate(`/admin/product/${id}`)
    }
    

      
    return    <>
        {errorDelete && <Message variant={'danger'}>{errorDelete}</Message>}
        {
        loadingList ? <Loading />:
        errorList ? <Message variant={'danger'}>{errorList}</Message>:
        <>
         <Row style={{display:'flex', justifyContent: 'right', marginBottom: '1rem'}} >
             <Button variant='outline-primary' as={Link} to='/admin/product/create' size='sm' style={{width: 'auto'}}><i className="fas fa-plus" ></i> create product</Button>
         </Row>
           
        <Table className='table-hover' size='sm' striped responsive>
        <thead>
            <tr className='align-me'>
                <th>Id.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Fnt</th>
            </tr>
        </thead>
        <tbody>
        {    
        productList.map((x, index)=>
        
            <tr key={index} >
                <td>{x._id}</td>
                <td>{x.name}</td>
                <td>{x.price}</td>
                <td>{x.category}</td>
                <td>{x.brand}</td>
                <td>
                    <Button variant="outline-danger" style={{borderRadius:'25%', padding: '2% 4%'}} onClick={(e)=>{deleteHandler(x._id, e)}}><i className="far fa-trash-alt"></i></Button>{' '}
                    <Button variant="outline-info" style={{borderRadius:'25%', padding: '2% 4%'}} onClick={e => {editHandler(x._id, e)}}><i className="far fa-edit"></i></Button>   
                </td>
            </tr>
        
        )
        }
        </tbody>
        </Table>
         
        </>
        }
        </>
        
    
}


export default AdminProduct