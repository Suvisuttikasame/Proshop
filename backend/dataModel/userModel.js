import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    superAdmin:{
        type: Boolean,
        default: false
    }

}, {timestamps: true})

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
            
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    
})


const User = mongoose.model('User', userSchema)


export default User