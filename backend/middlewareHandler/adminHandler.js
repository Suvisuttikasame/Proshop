import User from "../dataModel/userModel.js"

export const adminCheck = async (req, res, next) => {
    const {adminId} = req.body

    try {
        const admin = await User.findById({_id:adminId})
        
        if (admin.isAdmin) {
            next()
            
        } else {
            next(new Error('This user is not admin.'))
        }
    } catch (error) {
        next(error)
    }

}