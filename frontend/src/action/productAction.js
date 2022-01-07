import axios from 'axios'
 
export const productListAction = (keyword = '', page= '')=> async (dispatch)=>{
    try {
       dispatch({type: 'LOADING_PRODUCTS'})  
       const getProducts = await axios.get(`/api/products?keyword=${keyword}&page=${page}`)
       
       dispatch({type: 'LOADED_PRODUCTS', payload: getProducts.data})
        
    } catch (error) {
        dispatch({type:'LOADING_PRODUCTS_ERROR', payload: error.response && error.response.data.message ? error.response.data.message: error.message})
        
    }
        

}


export const productDetailAction= (id)=> async (dispatch)=> {
    try {
        dispatch({type: 'LOADING_PRODUCT'})

        const getProduct = await axios.get(`/api/products/${id}`)
        
        dispatch({type: 'LOADED_PRODUCT', payload: getProduct.data})
        
        
    } catch (error) {
        dispatch({type: 'LOADING_PRODUCT_ERROR', payload: error.response && error.response.data.message ? error.response.data.message: error.message})
        
    }

}


export const productReviewAction = (productId, review)=> async (dispatch) =>{
    
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        await axios.post('/api/products/review', {
            productId,
            review
        }, config)

        dispatch({
            type: 'REVIEW_PRODUCT_SUCCESS'
        })
    } catch (error) {
        dispatch({
            type: 'REVIEW_PRODUCT_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        
        })
        
    }
}