import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Navbar, Nav, NavDropdown, Form, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux'
import {userLogoutAction} from '../action/userAction'





function Header(){

    const [icon, setIcon] = useState('')
    const [search, setSearch] = useState('')

    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler= ()=>{
        localStorage.removeItem('userInfo')
        localStorage.removeItem('cartItems')
        localStorage.removeItem('userDetail')
        dispatch({
          type: 'RESET_CART'
        })
        dispatch({
          type: 'RESET_ORDER'
      })
        dispatch(userLogoutAction())
        navigate('/login')
    }

    useEffect(()=>{
      if(userInfo){
        setIcon(<><i className="fas fa-user" />{userInfo.name}</>)
        
      }

    }, [userInfo])

    const searchHandler = (e) =>{
      e.preventDefault()
      const keyword = search.trim()
      navigate(`/search/${keyword}`)
    }

    
    return(
        <header>
<Navbar bg="dark" expand="lg" variant="dark" >
  <Container>
    
    <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
    <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={search}
          onChange={e => {setSearch(e.target.value)}}
        />
        <Button variant="outline-success" onClick={searchHandler}>Search</Button>
      </Form>
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" >
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/cart"><i className="fas fa-cart-arrow-down"></i>Cart</Nav.Link>
        {
        userInfo ?
    <NavDropdown title={icon} style={{backgroundColor: 'transparent'}}>
     
    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
    <NavDropdown.Item onClick={logoutHandler}>Log out</NavDropdown.Item>
   
  </NavDropdown>: 
  <Nav.Link as={Link} to="/login"><i className="fas fa-sign-in-alt"></i>Sign in</Nav.Link>
        }
        {
         userInfo && userInfo.isAdmin ?
    <NavDropdown title='Admin' style={{backgroundColor: 'transparent'}}>
     
    <NavDropdown.Item as={Link} to='/admin/user'>User</NavDropdown.Item>
    <NavDropdown.Item as={Link} to='/admin/product'>Product</NavDropdown.Item>
    <NavDropdown.Item as={Link} to='/admin/order'>Order</NavDropdown.Item>
  </NavDropdown>:
  <></>
        }
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    );
}



export default Header;