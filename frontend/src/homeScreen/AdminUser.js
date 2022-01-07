import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {adminUserListAction, adminUserDeleteAction, adminUserItemAction} from '../action/adminAction'
import Loading from '../components/Loading'
import Message from '../components/Message'


function Adminuser(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userDetail} = useSelector(state => state.userProfile)
    const { loadingList, userList, errorList, errorDelete, successDelete } = useSelector(state => state.adminManageUser)

    useEffect(()=>{
        dispatch(adminUserListAction(userDetail._id))
        
        if (successDelete) {
            dispatch({
                type: 'USER_DELETE_RESET'
            })
        }
    },[dispatch, userDetail._id, successDelete])

    const deleteHandler= (id, e) =>{
        e.preventDefault()
        if (window.confirm('Are you sure to delete this user ?')) {
            dispatch(adminUserDeleteAction(userDetail._id, id))
            
        } 
        
    } 

    const editHandler= (id, e) =>{
        e.preventDefault()
        dispatch(adminUserItemAction(userDetail._id, id))
        navigate(`/admin/user/${id}`)
    }
    

      
    return    <>
        {errorDelete && <Message variant={'danger'}>{errorDelete}</Message>}
        {
        loadingList ? <Loading />:
        errorList ? <Message variant={'danger'}>{errorList}</Message>:
        <Table className='table-hover' size='sm' striped responsive>
        <thead>
            <tr className='align-me'>
                <th>No.</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Admin</th>
                <th>Fnt</th>
            </tr>
        </thead>
        <tbody>
        {    
        userList.map((x, index)=>
        
            <tr key={index} className={index === 0  ? 'table-primary' : undefined}>
                <td>{index}</td>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td>{x.isAdmin ? <i className="far fa-check-circle" style={{color: 'green'}}></i> :<i className="far fa-times-circle" style={{color: 'red'}}></i>}</td>
                <td>
                    <Button variant="outline-danger" style={{borderRadius:'25%', padding: '2% 4%'}} disabled={x.isAdmin ? (userDetail.superAdmin ? (x.superAdmin ? true : false) : true) : false} onClick={(e)=>{deleteHandler(x._id, e)}}><i className="far fa-trash-alt"></i></Button>{' '}
                    <Button variant="outline-info" style={{borderRadius:'25%', padding: '2% 4%'}} disabled={x.isAdmin ? (userDetail.superAdmin ? (x.superAdmin ? true : false) : true) : false} onClick={e => {editHandler(x._id, e)}}><i className="far fa-edit"></i></Button>   
                </td>
            </tr>
        
        )
        }
        </tbody>
        </Table>
        }
        </>
        
    
}


export default Adminuser