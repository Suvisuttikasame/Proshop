import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {adminUserUpdateAction} from '../action/adminAction'
import CustomForm from '../components/Form'
import Loading from '../components/Loading'
import Message from '../components/Message'


function Adminuseritem(){

    const {id} = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message ,setMessage] = useState('')

    const dispatch = useDispatch()
    const {userDetail} = useSelector(state => state.userProfile)
    const {loadingItem, userItem, errorItem, successUpdate, errorUpdate} = useSelector(state => state.adminManageUser)

    useEffect(()=>{
            
        if (userItem) {
            setName(userItem.name)
            setEmail(userItem.email)
            setIsAdmin(userItem.isAdmin)
        }
        if(successUpdate){
            dispatch({
                type: 'USER_UPDATE_RESET'
            })
        }
        
    }, [dispatch, id, userDetail._id, userItem, successUpdate])

    const validation = (name, email) => {
        if (!name || !email) {
            return false
        }else{
            return true
        }
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        if (validation(name, email)) {
            setMessage('')
            dispatch(adminUserUpdateAction(userDetail._id, id, name, email, isAdmin))
            navigate('/admin/user')
        } else {
            setMessage('fill in your detail')
        }
        console.log('test');
    }


    return<>
    {message.length > 0 && <Message variant={'danger'}>{message}</Message>}
    {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}
    {
    loadingItem ? <Loading /> :
    errorItem ? <Message variant={'danger'}>{errorItem}</Message>:    
    <CustomForm >
    <Form.Group className="mb-3" controlId="Name" style={{textAlign:'left'}}>
    <Form.Label >Name</Form.Label>
    <Form.Control type="text" placeholder="User name" value={name} onChange={e=> {setName(e.target.value)}}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="Email" style={{textAlign:'left'}}>
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="User email" value={email} onChange={e=> {setEmail(e.target.value)}} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="Checkbox" style={{textAlign:'left'}}>
    <Form.Check type="checkbox" label="Is Admin ?" checked={isAdmin} onChange={e=> {setIsAdmin(e.target.checked)}}/>
    </Form.Group>

    <Button variant="primary" onClick={e => {submitHandler(e)}}>
    Submit
    </Button>
    </CustomForm>
}
    </>
}


export default Adminuseritem