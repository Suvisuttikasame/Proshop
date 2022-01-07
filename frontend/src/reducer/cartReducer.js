export const addToCart = (state = {cartItems: [], shippingAddress: {}, paymentMethod:{}}, action)=>{
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.product
            const existedItem = state.cartItems.find(x => x.id === item.id)
            if (existedItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x)=>
                    x.id === item.id ?
                    item:
                    x
                    )
                } 
                
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                } 
            }

        case 'ADD_ADDRESS':
            return{
                ...state,
                shippingAddress: action.address
            }
        
        case 'ADD_PAYMENT_METHOD':
            return{
                ...state,
                paymentMethod: action.payment
            }

        case 'DELETE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.id !== action.id )
            }         
            
        case 'RESET_CART':
        return {
            ...state,
            cartItems: []
        }
            
    
        default:
            return state
        }

}