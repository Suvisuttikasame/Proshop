import React, {useState, useEffect} from 'react'
import {Row, Form, Button} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import CustomForm from '../components/Form'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {userRegisterAction} from '../action/userAction'



function Register(){
    const [registerInfo, setRegisterInfo] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const {name, email, password, confirmPassword} = registerInfo

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading, success, error} = useSelector(state=> state.userRegister)

    useEffect(()=>{
        if (success) {
            dispatch({
                type: 'USER_REGISTER_RESET'
            })
            navigate('/login')
        }
    }, [success, navigate, dispatch])

    const submitHandler= (e)=>{
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('password is not match.')
        } else {
            dispatch(userRegisterAction(name, email, password))
            setMessage('')
            
        }
    }

    return <>
    {
        loading ?
        <Loading /> :
        <CustomForm>
        <Row>
        <Row >
            <h2>Sign in</h2>
        </Row>
        {error && <Message variant='danger'>{error}</Message>}
        {message.length > 0 && <Message variant='danger'>{message}</Message>}

        
        <Row >
    <Form onSubmit={submitHandler} className='py-3'>
    <Form.Group className="mb-3" controlId="formBasicName" style={{textAlign: 'left'}}>
    <Form.Label >Name</Form.Label>
    <Form.Control type="text" placeholder="Enter name" value={name} onChange={e =>{setRegisterInfo({...registerInfo, name: e.target.value })} }/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail" style={{textAlign: 'left'}}>
    <Form.Label >Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e =>{setRegisterInfo({...registerInfo, email: e.target.value })} }/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword" style={{textAlign: 'left'}}>
    <Form.Label >Password</Form.Label>
    <Form.Control type="password" placeholder="Enter password" value={password} onChange={e =>{setRegisterInfo({...registerInfo, password: e.target.value })} }/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicConfirmPassword" style={{textAlign: 'left'}}>
    <Form.Label >Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={e =>{setRegisterInfo({...registerInfo, confirmPassword: e.target.value })} }/>
    </Form.Group>
    <Button type='submit' variant='outline-primary'>Register</Button>
  
</Form>
</Row>
<Row className='py-3'>
    <p>Do you want to sign in ? <Link to='/login'>login</Link></p>
</Row>
        </Row>
    </CustomForm>
    }
    </>
}


export default Register