import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';
import Homescreen from './homeScreen/Homescreen';
import Cart from './homeScreen/Cart'
import Product from './homeScreen/Product';
import Login from './homeScreen/Login';
import Register from './homeScreen/Register'
import Profile from './homeScreen/Profile';
import Shipping from './homeScreen/Shipping';
import Payment from './homeScreen/Payment';
import PlaceOrder from './homeScreen/PlaceOrder';
import Order from './homeScreen/Order';
import Adminuser from './homeScreen/AdminUser';
import Adminuseritem from './homeScreen/AdminUserItem';
import AdminProduct from './homeScreen/AdminProduct';
import AdminProductItem from './homeScreen/AdminProductItem';
import AdminProductCreate from './homeScreen/AdminProductCreate';
import AdminOrder from './homeScreen/AdminOrder'
import AdminOrderItem from './homeScreen/AdminOrderItem';



function App() {
  return (
    <Router >
      <Header />
      <Container className='body'>
      <main className='py-3'>
        <Routes>
        <Route path="/" element={<Homescreen />} exact/>
        <Route path="/search/:keyword" element={<Homescreen />} exact/>
        <Route path="/search" element={<Homescreen />} />
        <Route path="/page/:page" element={<Homescreen />} exact/>
        <Route path="/search/:keyword/page/:page" element={<Homescreen />} exact/>
        <Route path='/product:id' element={<Product />} /> 
        <Route path='/cart/:id' element={<Cart />} /> 
        <Route path='/cart/' element={<Cart />} /> 
        <Route path='/login' element={<Login />}/> 
        <Route path='/register' element={<Register />}/> 
        <Route path='/profile' element={<Profile />}/>
        <Route path='/shipping' element={<Shipping />} /> 
        <Route path='/payment' element={<Payment />} /> 
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/admin/user' element={<Adminuser />} />
        <Route path='/admin/user/:id' element={<Adminuseritem />} />
        <Route path='/admin/product' element={<AdminProduct />} />
        <Route path='/admin/product/:id' element={<AdminProductItem />} />
        <Route path='/admin/product/create' element={<AdminProductCreate />} />
        <Route path='/admin/order' element={<AdminOrder />} />
        <Route path='/admin/order/:id' element={<AdminOrderItem />} />

        </Routes>     
      </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
