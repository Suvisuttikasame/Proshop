import jwt from 'jsonwebtoken'
import User from '../dataModel/userModel.js'




export const userAuthorizationHandler = async (req, res, next)=>{
    const tokenAuthorize = req.headers.authorization
    const token = tokenAuthorize.split(' ')[1]
    
        if (tokenAuthorize && tokenAuthorize.startsWith('Bearer')) {
            try {
            const decode = await jwt.verify(token, process.env.TOKEN_SECRET) 
            const user = await User.findById({_id: decode.id}).select('-password')

            req.user = user

            next()
            } catch (error) {
                res.status(401)
                next(error)
                
            }
            
        }else{
            res.status(401)
            next(new Error('No Authorization!'))
        }

    

}