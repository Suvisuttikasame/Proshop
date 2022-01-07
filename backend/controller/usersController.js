import jwt from 'jsonwebtoken'
import User from '../dataModel/userModel.js' 
import bcrypt from 'bcryptjs'


export const userController = async (req, res, next)=>{
    const checkEmail = await User.findOne({email: req.body.email})
    
    if(checkEmail){
        await bcrypt.compare( req.body.password, checkEmail.password,(err, response)=>{
            if(err){
                res.status(401)
                next(err)
            }
            if (response) {
                res.json({
                    name: checkEmail.name,
                    email: checkEmail.email,
                    isAdmin: checkEmail.isAdmin,
                    token: jwt.sign({id: checkEmail._id},process.env.TOKEN_SECRET, {expiresIn: '3600s'})
                })
            }else{
                res.status(400)
                next(new Error('wrong password.'))
                
            }

        })
    }else{
        res.status(400)
        next(new Error('No this account.'))
    }
    

}


export const userAuthorization = async (req, res, next)=>{
    
    const user = req.user 
    if (user) {
     res.send(user)
    } else{
        res.status(401)
        next(new Error('User not found'))
    }
    
} 

export const userRegisteration = async (req, res, next)=>{
    const email = req.body.email
try {
    const emailExist = await User.findOne({email}).select('-password')
    if(!emailExist){
        const user = await User.create({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password             
        })
        
        if(user){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: jwt.sign({id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '3600s'})
            })
        }else{  
            res.status(401)
            next(new Error('Can not add user'))
        }
    }else{
        res.status(401)
        next(new Error('An email already exist.'))
    }
    
} catch (error) {
    res.status(400)
    next(error)
    
}
   
    
}


export const userUpdatePassword = async (req, res, next)=>{
    try {
        
        const userDetail = await User.findById({_id : req.user._id})

        userDetail.password = req.body.password

        userDetail.save()

        res.json({
            status: 'success'
        })

    } catch (error) {
        res.status(400)
        next(new Error(error))
        
    }
}