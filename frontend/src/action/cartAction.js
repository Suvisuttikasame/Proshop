import axios from 'axios'


export const cartAction = (id, qty)=> async (dispatch, getState)=>{
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
    type: 'ADD_TO_CART',
    product:{
        id: id,
        name: data.name,
        image: data.image,
        brand: data.brand,
        price: data.price,
        countInStock: data.countInStock,
        qty
    }
    })


    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    

}


export const cartDeleteItem = (id) => (dispatch, getState)=>{
    dispatch({
        type: 'DELETE_ITEM',
        id
    }) 
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
} 

export const cartReset =() => (dispatch)=>{
    dispatch({
        type: 'RESET_CART'
    })
}

export const addAddress = (address, city, postalCode, country) => (dispatch)=>{
    dispatch({
        type: 'ADD_ADDRESS',
        address : {
            address,
            city,
            postalCode,
            country
        }
    })
}

export const addPaymentMethod = (paymentMethod) => (dispatch)=>{
    dispatch({
        type: 'ADD_PAYMENT_METHOD',
        payment : paymentMethod
    })
} 


