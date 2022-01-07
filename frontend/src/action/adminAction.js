import axios from "axios"

export const adminUserListAction = (adminId)=> async(dispatch)=>{
    dispatch({
        type: 'USER_LIST_REQUEST'
    })
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const {data} = await axios.post('/api/admin/user', {
            adminId
        }, config)
        dispatch({
            type: 'USER_LIST_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'USER_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


export const adminUserItemAction = (adminId, id)=> async(dispatch)=>{
    dispatch({
        type: 'USER_ITEM_REQUEST'
    })
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const {data} = await axios.post(`/api/admin/user${id}`, {
            adminId
        }, config)
        dispatch({
            type: 'USER_ITEM_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'USER_ITEM_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const adminUserDeleteAction = (adminId, id) => async(dispatch)=>{
    
    try {
        const {data} = await axios.delete('/api/admin/user',{data: {
            id,
            adminId
        }
            
        })
        dispatch({
            type: 'USER_DELETE_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'USER_DELETE_FAIL',
            error: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}



export const adminUserUpdateAction = (adminId, id, name, email, isAdmin) => async(dispatch)=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const {data} = await axios.put('/api/admin/user',{
            id,
            adminId,
            name,
            email,
            isAdmin
        }, config)
        dispatch({
            type: 'USER_UPDATE_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'USER_UPDATE_FAIL',
            error: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


export const adminProductListAction = (adminId)=> async(dispatch)=>{
    dispatch({
        type: 'PRODUCT_LIST_REQUEST'
    })
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const {data} = await axios.post('/api/admin/product', {
            adminId
        }, config)
        dispatch({
            type: 'PRODUCT_LIST_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCTLIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


export const adminProductItemAction = (adminId, id)=> async(dispatch)=>{
    dispatch({
        type: 'PRODUCT_ITEM_REQUEST'
    })
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const {data} = await axios.post(`/api/admin/product${id}`, {
            adminId
        }, config)
        dispatch({
            type: 'PRODUCT_ITEM_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCT_ITEM_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


export const adminProductDeleteAction = (adminId, id) => async(dispatch)=>{
    
    try {
        const {data} = await axios.delete('/api/admin/product',{data: {
            id,
            adminId
        }
        })
        dispatch({
            type: 'PRODUCT_DELETE_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCT_DELETE_FAIL',
            error: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


export const adminProductUpdateAction = (adminId, id, productDetail) => async(dispatch)=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const {data} = await axios.put('/api/admin/product',{
            id,
            adminId,
            user: adminId,
            name: productDetail.name,
            image: productDetail.image,
            brand: productDetail.brand,
            category: productDetail.category,
            description: productDetail.description,
            price: productDetail.price,
            countInStock: productDetail.countInStock
        }, config)
        dispatch({
            type: 'PRODUCT_UPDATE_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCT_UPDATE_FAIL',
            error: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


export const adminProductCreateAction = (adminId, newProduct) => async (dispatch)=>{
    dispatch({
        type: 'PRODUCT_CREATE_REQUEST'
    })
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
            await axios.post('/api/admin/product/create', {
            adminId,
            newProduct
        }, config)

        dispatch({
            type: 'PRODUCT_CREATE_SUCCESS'
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCT_CREATE_FAIL'
        })
    }
}



export const adminOrderListAction = (adminId)=> async(dispatch)=>{
    dispatch({
        type: 'ORDER_LIST_REQUEST'
    })
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const {data} = await axios.post('/api/admin/order', {
            adminId
        }, config)
        dispatch({
            type: 'ORDER_LIST_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'ORDER_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


export const adminOrderItemAction = (adminId, id)=> async(dispatch)=>{
    dispatch({
        type: 'ORDER_ITEM_REQUEST'
    })
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const {data} = await axios.post(`/api/admin/order${id}`, {
            adminId
        }, config)
        dispatch({
            type: 'ORDER_ITEM_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'ORDER_ITEM_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}




export const adminOrderUpdateAction = (adminId, id) => async(dispatch)=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    try {
        const {data} = await axios.put('/api/admin/order',{
            id,
            adminId
        }, config)
        dispatch({
            type: 'ORDER_UPDATE_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'ORDER_UPDATE_FAIL',
            error: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}