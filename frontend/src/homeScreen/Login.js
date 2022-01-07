import React, {useState, useEffect} from 'react'
import {Row, Button, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import CustomForm from '../components/Form'
import {Link, useNavigate} from 'react-router-dom'
import Message from '../components/Message'
import {userLoginAction} from '../action/userAction'
import Loading from '../components/Loading'
import {userProfileAction} from '../action/userAction'





function Login() {
    const [info, setInfo] = useState({
        email: '',
        password: ''
    })
    

    const { email, password } = info

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo, loading, error } = useSelector(state => state.userLogin)
    const { userDetail } = useSelector(state => state.userProfile)

    useEffect(()=>{
        if (userInfo) {
            if(!userDetail){
                dispatch(userProfileAction())
                navigate('/')
            }
            navigate('/')
        }
        
        
    },[userInfo, userDetail, navigate, dispatch])

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(userLoginAction(email, password))
        

    }

    return<>
    {
            loading ?
            <Loading />:
            <CustomForm>
            <Row >
            <h2>Sign in</h2>
        </Row>
        {error && <Message variant='danger'>{error}</Message>}
        
        <Row >
    <Form onSubmit={submitHandler} className='py-3'>
    <Form.Group className="mb-3" controlId="formBasicEmail" style={{textAlign: 'left'}}>
    <Form.Label >Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e =>{setInfo({...info, email: e.target.value })} }/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword" style={{textAlign: 'left'}}>
    <Form.Label >Password</Form.Label>
    <Form.Control type="password" placeholder="Enter password" value={password} onChange={e =>{setInfo({...info, password: e.target.value })} }/>
    </Form.Group>

    <Button type='submit' variant='outline-primary'>Log in</Button>
  
</Form>
</Row>
<Row className='py-3'>
    <p>Have account ? <Link to='/register'>register</Link></p>
</Row>
</CustomForm>
        }
    </>    
   
}


export default Login