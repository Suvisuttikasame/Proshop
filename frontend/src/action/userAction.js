import axios from 'axios'


export const userLoginAction = (email, password) => async (dispatch) =>{
    try {
        dispatch({
            type: 'USER_LOGIN_REQUEST',
        })

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const { data } = await axios.post('/api/user/login', {
            email,
            password
        }, config)

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        
        })
        
    }
           
}


export const userLogoutAction = ()=> (dispatch)=>{
        dispatch({
            type: 'USER_LOGOUT'
        })
        dispatch({
            type: 'USER_PROFILE_LOGOUT'
        })
        
}



export const userRegisterAction = (name, email, password)=> async (dispatch)=>{
    try {
        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })
    
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const { data } = await axios.post('api/user/register', {
            name,
            email,
            password
        }, config)
    
        dispatch({
            type:'USER_REGISTER_SUCCESS'
        })
    
               
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload : error.response && error.response.data.message ? error.response.data.message: error.message
        })
        
    }
    

}


export const userProfileAction =() => async (dispatch, getState)=>{
    try {
        dispatch({
            type: 'USER_PROFILE_REQUEST'
        })

        const token = getState().userLogin.userInfo.token
        

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            
        }

        const { data } = await axios.get('/api/user/profile', config)

        dispatch({
            type: 'USER_PROFILE_SUCCESS',
            payload: data
        })

        localStorage.setItem('userDetail', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'USER_PROFILE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message 
        })
    }

}


export const checkUserPasswordAction = (password) => async (dispatch, getState)=>{
    try {
        const email = getState().userLogin.userInfo.email

        dispatch({
            type: 'PASSWORD_REQUEST'
        })
    
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
    
        const { data } = await axios.post('/api/user/login', {
            email,
            password
        }, config)

        dispatch({
            type: 'PASSWORD_MATCH',
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: 'PASSWORD_FAIL',
            payload : error.response && error.response.data.message ? error.response.data.message: error.message 
        })
        
    }
   

}



export const userUpdatePasswordAction=(newpassword)=>async (dispatch, getState)=>{
    try {
        dispatch({
            type: 'USER_UPDATE_REQUEST'
        })

        const token = getState().userLogin.userInfo.token
        

        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            
        }

        const { data } = await axios.put('/api/user/profile', {
            password: newpassword
        },config)
        dispatch({
            type: 'USER_UPDATE_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'USER_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}