export const placeOrderReducer = (state = {placeOrder: null}, action)=>{
    switch (action.type) {
        case 'CREATE_ORDER_REQUEST':
            return {
                loading : true
            }
        case 'CREATE_ORDER_SUCCESS':
            return {
                loading : false,
                placeOrder : action.payload
            }
        case 'CREATE_ORDER_FAIL' :
            return{
                loading : false,
                error: action.payload
            }
        case 'RESET_ORDER' :
            return{
                placeOrder: null
            }
        default:
            return state
    }

}


export const orderDetailReducer = (state = { orderDetail: {shippingAddress:{}, orderItems:[]}  }, action)=>{
    switch (action.type) {
        case 'ORDER_REQUEST':
            return {
                ...state,
                loading : true
            }
        case 'ORDER_SUCCESS':
            return {
                loading: false,
                orderDetail: action.payload
            }
        case 'ORDER_FAIL':
            return{
                loading: false,
                error: action.payload
            }
        case 'ORDER_RESET':
            return{
                orderDetail: {shippingAddress:{}, orderItems:[]} 
            }    
    
        default:
            return state
    }

}


export const orderByUserIdReducer = (state = {orderDetailByUser: []}, action )=>{
    switch (action.type) {
        case 'ORDER_BY_USER_ID_REQUEST':
            return {
                loading : true

            }
        case 'ORDER_BY_USER_ID_SUCCESS':
            return{
                orderDetailByUser: action.payload,
                loading : false
            }
        case 'ORDER_BY_USER_ID_FAIL':
            return{
                error: action.payload,
                loading: false
            }
    
        default:
            return state
    }

}


export const qrCodeGenReducer = (state={qrText:''}, action)=>{

    switch (action.type) {
        case 'QR_GEN_REQUEST':
            return{
                ...state,
                loading: true
            }
        case 'QR_GEN_SUCCESS':
            return{
                qrText: action.payload,
                loading: false
            }
        case 'QR_GEN_FAIL':
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case 'QR_RESET':
            return{
                qrText:''
            }
    
        default:
            return state
    }

} 


