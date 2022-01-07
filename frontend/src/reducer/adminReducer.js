export const adminManageUserReducer = (state = {userList:[], userItem: null}, action)=>{
    switch (action.type) {
        case 'USER_LIST_REQUEST':
            return{
                ...state,
                loadingList : true
            }
        case 'USER_LIST_SUCCESS':
            return{
                ...state,
                loadingList: false,
                userList: action.payload,
                errorList : false
            }
        case 'USER_LIST_FAIL':
            return{
                ...state,
                loadingList: false,
                errorList : action.payload
            }
        case 'USER_ITEM_REQUEST':
            return{
                ...state,
                loadingItem : true
            }
        case 'USER_ITEM_SUCCESS':
            return{
                ...state,
                loadingItem: false,
                userItem: action.payload
            }
        case 'USER_ITEM_FAIL':
            return{
                ...state,
                loadingItem: false,
                errorItem : action.payload
            }
        case 'USER_UPDATE_SUCCESS':
            return{
                ...state,
                updatedUser : action.payload,
                successUpdate : true
            } 
        case 'USER_UPDATE_FAIL':
            return{
                ...state,
                errorUpdate : action.payload,
                successUpdate : false
            }
        case 'USER_UPDATE_RESET':
            return{
                ...state,
                errorUpdate : false,
                successUpdate : false
            }
        case 'USER_DELETE_SUCCESS':
            return{
                ...state,
                deletedUser : action.payload,
                successDelete : true
            } 
        case 'USER_DELETE_FAIL':
            return{
                ...state,
                errorDelete : action.payload,
                successDelete : false
            }
        case 'USER_DELETE_RESET':
            return {
                ...state,
                errorDelete: false,
                successDelete: false
            }  
        default:
            return state;
    }
}


export const adminManageProductReducer = (state = {productList:[], productItem: null}, action)=>{
    switch (action.type) {
        case 'PRODUCT_LIST_REQUEST':
            return{
                ...state,
                loadingList : true
            }
        case 'PRODUCT_LIST_SUCCESS':
            return{
                ...state,
                loadingList: false,
                productList: action.payload,
                errorList : false
            }
        case 'PRODUCT_LIST_FAIL':
            return{
                ...state,
                loadingList: false,
                errorList : action.payload
            }
        case 'PRODUCT_ITEM_REQUEST':
            return{
                ...state,
                loadingItem : true
            }
        case 'PRODUCT_ITEM_SUCCESS':
            return{
                ...state,
                loadingItem: false,
                productItem: action.payload
            }
        case 'PRODUCT_ITEM_FAIL':
            return{
                ...state,
                loadingItem: false,
                errorItem : action.payload
            }
        case 'PRODUCT_UPDATE_SUCCESS':
            return{
                ...state,
                updatedProduct : action.payload,
                successUpdate : true
            } 
        case 'PRODUCT_UPDATE_FAIL':
            return{
                ...state,
                errorUpdate : action.payload,
                successUpdate : false
            }
        case 'PRODUCT_UPDATE_RESET':
            return{
                ...state,
                errorUpdate : false,
                successUpdate : false
            }
        case 'PRODUCT_DELETE_SUCCESS':
            return{
                ...state,
                deletedProduct : action.payload,
                successDelete : true
            } 
        case 'PRODUCT_DELETE_FAIL':
            return{
                ...state,
                errorDelete : action.payload,
                successDelete : false
            }
        case 'PRODUCT_DELETE_RESET':
            return {
                ...state,
                errorDelete: false,
                successDelete: false
            }
        case 'PRODUCT_CREATE_REQUEST':
            return{
                ...state,
                loadingCreate: true
            }
        case 'PRODUCT_CREATE_SUCCESS':
            return{
                ...state,
                loadingCreate: false,
                successCreate: true
            }
        case 'PRODUCT_CREATE_FAIL':
            return{
                ...state,
                loadingCreate:false,
                errorCreate: action.payload
            } 
        case 'PRODUCT_CREATE_RESET':
            return{
                ...state,
                successCreate: false,
                errorCreate: false
            } 
        default:
            return state;
    }
}



export const adminManageOrderReducer = (state = {orderList:[], orderItem: null}, action)=>{
    switch (action.type) {
        case 'ORDER_LIST_REQUEST':
            return{
                ...state,
                loadingList : true
            }
        case 'ORDER_LIST_SUCCESS':
            return{
                ...state,
                loadingList: false,
                orderList: action.payload,
                errorList : false
            }
        case 'ORDER_LIST_FAIL':
            return{
                ...state,
                loadingList: false,
                errorList : action.payload
            }
        case 'ORDER_ITEM_REQUEST':
            return{
                ...state,
                loadingItem : true
            }
        case 'ORDER_ITEM_SUCCESS':
            return{
                ...state,
                loadingItem: false,
                orderItem: action.payload
            }
        case 'ORDER_ITEM_FAIL':
            return{
                ...state,
                loadingItem: false,
                errorItem : action.payload
            }
        case 'ORDER_UPDATE_SUCCESS':
            return{
                ...state,
                updatedOrder : action.payload,
                successUpdate : true
            } 
        case 'ORDER_UPDATE_FAIL':
            return{
                ...state,
                errorUpdate : action.payload,
                successUpdate : false
            }
        case 'ORDER_UPDATE_RESET':
            return{
                ...state,
                errorUpdate : false,
                successUpdate : false
            }
        
              
        default:
            return state;
    }
}