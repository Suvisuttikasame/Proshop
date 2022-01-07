import axios from "axios"

export const placeOrderAction = (taxPrice, shippingPrice, totalPrice)=> async (dispatch, getState)=>{

    try {
        dispatch({
            type: 'CREATE_ORDER_REQUEST'
        })
    
        const { token } = getState().userLogin.userInfo
        const { _id } = getState().userProfile.userDetail
        const { cartItems, shippingAddress, paymentMethod } = getState().cart
    
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    
        const sentData = {
            placeOrder: {
                user: _id,
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                taxPrice,
                totalPrice,
                shippingPrice
            }
        }
    
        const { data } = await axios.post('/api/order', sentData, config)
    
        dispatch({
            type: 'CREATE_ORDER_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'CREATE_ORDER_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }

    
}


export const orderDetailAction = (orderId)=>async (dispatch, getState)=>{
   try {
    dispatch({
        type: 'ORDER_REQUEST'
    })

    

    const config = {
        headers:{
            'Content-Type': 'application/json'  
              
        }, 
        params:{
            orderId
        }
    }

    const { data } = await axios.get('/api/order', config)

    dispatch({
        type: 'ORDER_SUCCESS',
        payload: data
    })
   } catch (error) {
       dispatch({
           type: 'ORDER_FAIL',
           payload: error.response && error.response.data.message ? error.response.data.message: error.message 
       })
   }
    

}


export const orderByUserIdAction = () => async (dispatch, getState)=>{
    
    try {
    dispatch({
        type:  'ORDER_BY_USER_ID_REQUEST'
    })
    const { _id: userId } = getState().userProfile.userDetail
        
    const config = {
        headers:{
            'Content-Type': 'application/json'

        },
        params:{
            userId
        }
    }
    

    const { data } = await axios.get('/api/order/userid', config)

    dispatch({
        type: 'ORDER_BY_USER_ID_SUCCESS',
        payload: data
    })
    } catch (error) {
        dispatch({
            type: 'ORDER_BY_USER_ID_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}



export const qrCodeGenAction =(orderId, price) => async (dispatch)=>{
        dispatch({
            type:'QR_GEN_REQUEST'
        })

        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/api/order/scbauth', {
                id: orderId,
                price
            }, config)
            
            dispatch({
                type:'QR_GEN_SUCCESS',
                payload: data.data.qrRawData
            })
        } catch (error) {
            dispatch({
                type:'QR_GEN_FAIL',
                payload:error.response && error.response.data.message ? error.response.data.message: error.message
            })
            
        }
}


export const confirmTransactionAction = (transactionId, orderId)=> async(dispatch)=>{
    dispatch({
        type: 'CONFIRM_TT_REQUEST'
    })
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const { data } = await axios.post('/api/order/transactionconfirm', {
            transactionId,
            orderId
        }, config)

        dispatch({
            type:'CONFIRM_TT_SUCCESS',
            payload : data
        })
    } catch (error) {
        dispatch({
            type: 'CONFIRM_TT_FAIL',
            payload:error.response && error.response.data.message ? error.response.data.message: error.message 
        })
    }

}