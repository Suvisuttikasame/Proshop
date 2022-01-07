import axios from "axios"


export const scbAuthRequest = async (req, res, next)=>{
    const id = req.body.id
    
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'resourceOwnerId': process.env.SCB_API_KEY,
            'requestUId': id
        }
    }

    const payload = {
        applicationKey: process.env.SCB_API_KEY,
        applicationSecret: process.env.SCB_API_SECRET
    }
    try {
        const {data} = await axios.post('https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token', payload, config)
        
        req.accessToken = data.data.accessToken
        
        next()
    } catch (error) {
        next(error)
    }
    
}