import User from "../dataModel/userModel.js"
import Product from '../dataModel/productModel.js'
import Order from '../dataModel/orderModel.js'


export const adminUserList = async(req, res, next)=>{
    try {
        const userList = await User.find({}).select('-password')
        res.json(userList)
    } catch (error) {
        next(error)
    }
}

export const adminUserItem =async(req, res, next)=>{
    
    try {
        const userItem =await User.findById({_id:req.params.id})
        res.json(userItem)
    } catch (error) {
        next(error)
    }
}

export const adminUserDelete = async(req, res, next) =>{
    const {id} = req.body
    try {
        const deleteUser = await User.deleteOne({_id:id})
        res.json(deleteUser)

    } catch (error) {
        next(error)
    }
}

export const adminUserUpdate = async(req, res, next) =>{
    const {id} = req.body
    try {
        const userUpdate = await User.findById({_id:id})
        userUpdate.name = req.body.name
        userUpdate.email = req.body.email
        userUpdate.isAdmin = req.body.isAdmin
        const userUpdated = await userUpdate.save()
        res.json(userUpdated)
    } catch (error) {
        next(error)
    }
}



export const adminProductList = async(req, res, next)=>{
    try {
        const productList = await Product.find({})
        res.json(productList)
    } catch (error) {
        next(error)
    }
}


export const adminProductItem =async(req, res, next)=>{
    
    try {
        const productItem =await Product.findById({_id:req.params.id}).populate({path:'user', select:'name email'})
        res.json(productItem)
    } catch (error) {
        next(error)
    }
}


export const adminProductDelete = async(req, res, next) =>{
    const {id} = req.body
    try {
        const deleteProduct = await Product.deleteOne({_id:id})
        res.json(deleteProduct)

    } catch (error) {
        next(error)
    }
}

export const adminProductUpdate = async(req, res, next) =>{
    const {id} = req.body
    try {
        const productUpdate = await Product.findById({_id:id})
        productUpdate.user = req.body.user
        productUpdate.name = req.body.name
        productUpdate.image = req.body.image
        productUpdate.brand = req.body.brand
        productUpdate.category = req.body.category
        productUpdate.description = req.body.description
        productUpdate.price = req.body.price
        productUpdate.countInStock = req.body.countInStock
        const productUpdated = await productUpdate.save()
        res.json(productUpdated)
    } catch (error) {
        next(error)
    }
}

export const adminProductCreate = async (req, res, next )=>{
    const {newProduct, adminId} = req.body
    const createProduct = new Product({
        ...newProduct,
        user: adminId
    })
    try {
        const createdProduct = await createProduct.save()
        res.json(createdProduct)
    } catch (error) {
        next(error)
    }
}


export const adminOrderList = async(req, res, next)=>{
    try {
        const orderList = await Order.find({})
        res.json(orderList)
    } catch (error) {
        next(error)
    }
}


export const adminOrderItem =async(req, res, next)=>{
    
    try {
        const orderItem =await Order.findById({_id:req.params.id})
        res.json(orderItem)
    } catch (error) {
        next(error)
    }
}


export const adminOrderUpdate = async(req, res, next) =>{
    const {id} = req.body
    try {
        const orderUpdate = await Order.findById({_id:id}).populate({path: 'user', select: 'name email'})
        orderUpdate.isDeliveried = true
        orderUpdate.deliveredAt = Date.now()
        const orderUpdated = await orderUpdate.save()
        res.json(orderUpdated)
    } catch (error) {
        next(error)
    }
}