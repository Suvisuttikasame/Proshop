import Order from '../dataModel/orderModel.js'
import axios from 'axios'
import Payment from '../dataModel/paymentModel.js'

export const placeOrderController = async (req, res, next) =>{
    try {
    const { placeOrder } = req.body

    const order = await Order.create({
        user: placeOrder.user,
        orderItems: placeOrder.orderItems.map(x =>{
        return {
            name: x.name,
            qty : x.qty,
            image : x.image,
            price : x.price,
            product : x.id
        }
        }),
        shippingAddress: placeOrder.shippingAddress,
        paymentMethod: placeOrder.paymentMethod,
        taxPrice: placeOrder.taxPrice,
        shippingPrice: placeOrder.shippingPrice,
        totalPrice: placeOrder.totalPrice  
    })

    res.json(order)

        
    } catch (error) {
        res.status(400)
        next(error)
    }

}



export const getOrderById = async (req, res, next)=>{
    try {
    const { orderId } = req.query

    const order = await Order.findById({_id: orderId})

    res.json(order)
    } catch (error) {
        res.status(400)
        next(error)
    }
}


export const getOderByUserId = async (req, res, next)=>{
    try {
    const { userId } = req.query
    
    const orderByUserId = await Order.find({ user: userId })

    res.send(orderByUserId)
    } catch (error) {
        res.status(400)
        next(error)
    }
}


export const requestQRcode = async(req, res, next)=>{
    const token = req.accessToken
    
    const id = req.body.id  
    const price = req.body.price

    
    const config = {
        headers:{
            'Content-Type':'application/json',
            'resourceOwnerId': process.env.SCB_API_KEY,
            'requestUId': id,
             Authorization: `Bearer ${token}`
        }
    }

    const payload = {
        qrType: 'PP',
        ppType: 'BILLERID',
        ppId: process.env.SCB_BILLER_ID,
        amount: price,
        ref1: 'REFERENCE1',
        ref2: 'REFERENCE2',
        ref3: process.env.SCB_REF3
    }


    try {
        const { data } = await axios.post('https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create', payload, config)
        res.json(data)
    } catch (error) {
        next(error)
    }

}

export const confirmPayment =async(req, res, next)=>{
    
    try {
    const {transactionId} = req.body
    
    await Payment.create(req.body)


    res.send(`success to pay #${transactionId}`)
    } catch (error) {
        next(error)
    }
    
}


export const confirmTransaction = async (req, res, next)=>{
    const {transactionId, orderId} = req.body

    try {
        const transaction = await Payment.findOne({transactionId})
        if(!transaction){
            next(new Error('No transaction id'))
        }else{
            const order = await Order.findById({_id: orderId})
            
            order.paymentResult = transaction._id
            order.isPaid = true
            order.paidAt = transaction.transactionDateandTime
            
            const updatePayment = await order.save()

            res.json(updatePayment)
        }
        
    } catch (error) {
        next(error)
    }
}