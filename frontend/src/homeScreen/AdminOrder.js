import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {adminOrderListAction, adminOrderItemAction} from '../action/adminAction'
import Loading from '../components/Loading'
import Message from '../components/Message'
import moment from 'moment'


function AdminOrder(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userDetail} = useSelector(state => state.userProfile)
    const { loadingList, orderList, errorList} = useSelector(state => state.adminManageOrder)

    useEffect(()=>{
        dispatch(adminOrderListAction(userDetail._id))
        
    },[dispatch, userDetail._id])

    

    const editHandler= (id, e) =>{
        e.preventDefault()
        dispatch(adminOrderItemAction(userDetail._id, id))
        navigate(`/admin/order/${id}`)
    }
    

      
    return    <>
        {
        loadingList ? <Loading />:
        errorList ? <Message variant={'danger'}>{errorList}</Message>:
        <Table className='table-hover' size='sm' striped responsive>
        <thead>
            <tr className='align-me'>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
            </tr>
        </thead>
        <tbody>
        {    
        orderList.map((x, index)=>
        
            <tr key={index} >
                <td>{x._id}</td>
                <td>{x.user.name}</td>
                <td>{moment(x.createdAt).utc().format('YYYY-MM-DD')}</td>
                <td>{x.totalPrice}</td>
                <td>{x.isPaid ? moment(x.paidAt).utc().format('YYYY-MM-DD') :<i className="far fa-times-circle" style={{color: 'red'}}></i>}</td>
                <td>{x.isDelivered ? moment(x.deliveredAt).utc().format('YYYY-MM-DD') :<i className="far fa-times-circle" style={{color: 'red'}}></i>}</td>
                <td>
                    <Button variant="outline-info" style={{borderRadius:'25%', padding: '2% 4%'}} onClick={e =>{editHandler(x._id, e)}}><i className="fas fa-info-circle"></i></Button>   
                </td>
            </tr>
        
        )
        }
        </tbody>
        </Table>
        }
        </>
        
    
}


export default AdminOrder