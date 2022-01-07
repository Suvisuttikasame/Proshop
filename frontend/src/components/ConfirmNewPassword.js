import React, {useState, useEffect} from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import {checkUserPasswordAction, userUpdatePasswordAction} from '../action/userAction'



export function ConfirmNP(){
    const [state, setState] = useState({
        
        passwordState: true,
        newpasswordState: false

    })
    const {passwordState, newpasswordState} = state
    const [changePassword, setNewPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })
    const {currentPassword ,newPassword, confirmNewPassword} = changePassword

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const { loading, success, error } = useSelector(state => state.checkPassword)

    const { loading: update_loading, updateStatus: update_success, error: update_error } = useSelector(state => state.updateUserPassword)

    useEffect(()=>{
        if(success){
            setState({
                passwordState: false,
                newpasswordState: true

            })
        }
    },[success])


    const updateHandler = (e)=>{
        e.preventDefault()
        if (newPassword === confirmNewPassword) {
            dispatch(userUpdatePasswordAction(newPassword))
            setMessage('')
        }else{
            setMessage('password is not match.')
        }

    }

    const confirmHandler = (e)=>{
        e.preventDefault()
        dispatch(checkUserPasswordAction(currentPassword))
        
    }


    return <>{newpasswordState && <Container className='mb-3'>
    <Form.Group className="mb-3" controlId="formBasicPassword" style={{textAlign: 'left'}}>
    <Form.Label >Password</Form.Label>
    <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={e =>{setNewPassword({...changePassword, newPassword: e.target.value })} }/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicNewPassword" style={{textAlign: 'left'}}>
    <Form.Label >Password</Form.Label>
    <Form.Control type="password" placeholder="Enter password" value={confirmNewPassword} onChange={e =>{setNewPassword({...changePassword, confirmNewPassword: e.target.value })} }/>
    </Form.Group>

    <Button type='submit' variant='outline-primary' onClick={updateHandler}>update</Button>
    </Container>}
    {passwordState && <Container className='mb-3'>
    <Form.Group className="mb-3" controlId="formBasicPassword" style={{textAlign: 'left'}}>
    <Form.Label >Password</Form.Label>
    <Form.Control type="password" placeholder="Enter current password" value={currentPassword} onChange={e =>{setNewPassword({...changePassword, currentPassword: e.target.value })} }/>
    </Form.Group>

    <Button type='submit' variant='outline-primary' onClick={confirmHandler}>confirm</Button>
    </Container>}
    {update_success && <Message variant='success'>Already updated</Message>}
    {message.length > 0 && <Message variant='danger'>{message}</Message>}
    {(error || update_error) && <Message variant='danger'>{(error || update_error)}</Message>}
    {(loading || update_loading) && <Loading />}
    </>
}


