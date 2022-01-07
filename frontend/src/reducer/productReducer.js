export const productListReducer = (state = {data: [], maxRating: []}, action)=>{
    switch (action.type) {
        case 'LOADING_PRODUCTS':
            return {
                loading: true,
                data: []
            }
        case 'LOADED_PRODUCTS':
            return {
                loading: false,
                data: action.payload.products,
                pages: action.payload.pages,
                pageNum: action.payload.pageNum,
                maxRating: action.payload.maxRating
            }
        case 'LOADING_PRODUCTS_ERROR':
            return {
                loading: false,
                error: action.payload
            }
             
        default:
            return state
    }

}



export const productDetailReducer = (state= {data: {}}, action) =>{
    switch (action.type) {
        case 'LOADING_PRODUCT':
            return {
                loading: true,
                data: {}
            }
        case 'LOADED_PRODUCT':
            return {
                loading: false,
                data: action.payload
            }
        case 'LOADING_PRODUCT_ERROR':
            return {
                loading: false,
                error: action.payload 
            }
            
    
        default:
            return  state;
    }

}



export const productReviewReducer = (state = {}, action) =>{
    switch (action.type) {
        
        case 'REVIEW_PRODUCT_SUCCESS':
            return{
                loading : false,
                success : true
            }
        case 'REVIEW_PRODUCT_FAIL':
            return{
                loading : false,
                error : action.payload
            }   
        case 'REVIEW_PRODUCT_RESET':
            return{
                success: false,
                error: false
            }
        default:
            return state
    }

}