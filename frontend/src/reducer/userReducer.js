
export const userLoginReducer = (state = {userInfo: {}}, action)=>{
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                loading : true
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                loading : false,
                userInfo: action.payload
            }
        case 'USER_LOGIN_FAIL':
            return {
                loading : false,
                error : action.payload
            }
        case 'USER_LOGOUT':
            return{
                loading : false,
                userInfo : null 
            }
            
            
    
        default:
            return state
            
    }
}


export const userRegisterReducer = (state = {}, action) =>{
      switch (action.type) {
          case 'USER_REGISTER_REQUEST':
              return {
                  loading : true,

              }
          case 'USER_REGISTER_SUCCESS':
              return {
                  loading : false,
                  success : 'success'
              }
          case 'USER_REGISTER_FAIL':
              return {
                  loading : false,
                  error : action.payload
              } 
          case 'USER_REGISTER_RESET':
              return {} 
      
      
          default:
                return  state
      }  
}


export const userProfileReducer = (state = {}, action)=>{
    switch (action.type) {
        case 'USER_PROFILE_REQUEST':
            return {
                loading: true
            }
        case 'USER_PROFILE_SUCCESS':
            return {
                loading: false,
                userDetail: action.payload
            }
        case 'USER_PROFILE_FAIL':
            return{
                loading: false,
                error : action.payload
            }
        case 'USER_PROFILE_LOGOUT':
            
            return{
                loading : false,
                userDetail : null 
            }
                
        default:
            return state
    }

}


export const checkUserPasswordReducer = (state = {}, action)=>{
    switch (action.type) {
        case 'PASSWORD_REQUEST':
            return {
                loading: true
            }
        case 'PASSWORD_MATCH':
            return{
                loading: false,
                success: true
            }
        case 'PASSWORD_FAIL':
            return{
                loading: false,
                success: false,
                error: action.payload
            }
            
    
        default:
            return state
    }

}

export const updateUserPasswordReducer = (state = {}, action)=>{
    switch (action.type) {
        case 'USER_UPDATE_REQUEST':
            return{
                loading: true
            }
        case 'USER_UPDATE_SUCCESS':
            return{
                loading: false,
                updateStatus: true
            }

        case 'USER_UPDATE_FAIL':
            return{
                loading: false,
                error : action.payload
            }
    
        default:
            return state
    }

}