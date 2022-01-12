import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailReducer, productReviewReducer} from './reducer/productReducer'
import { addToCart } from './reducer/cartReducer'
import {userLoginReducer, userRegisterReducer, userProfileReducer, checkUserPasswordReducer, updateUserPasswordReducer} from './reducer/userReducer'
import { placeOrderReducer, orderByUserIdReducer, orderDetailReducer, qrCodeGenReducer} from './reducer/orderReducer'
import {adminManageUserReducer, adminManageProductReducer, adminManageOrderReducer} from './reducer/adminReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    productReview: productReviewReducer,
    cart: addToCart,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    checkPassword : checkUserPasswordReducer,
    updateUserPassword : updateUserPasswordReducer,
    placeOrder : placeOrderReducer,
    orderByUserId: orderByUserIdReducer,
    orderDetail: orderDetailReducer,
    qrCodeGen : qrCodeGenReducer,
    adminManageUser : adminManageUserReducer,
    adminManageProduct : adminManageProductReducer,
    adminManageOrder : adminManageOrderReducer

})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :  null
const userDetail = localStorage.getItem('userDetail') ? JSON.parse(localStorage.getItem('userDetail')) : null 

const initialSeting = {
    cart : {cartItems: cartItems, shippingAddress: null},
    userLogin : {userInfo: userInfo},
    userProfile: {userDetail: userDetail} ,
    updateUserPassword: {updateStatus : false}
}


const middleware = [thunk]

const store = createStore(reducer, initialSeting ,composeWithDevTools(applyMiddleware(...middleware)))





export default store



