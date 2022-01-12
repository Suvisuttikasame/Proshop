import Order from '../dataModel/orderModel.js'
import axios from 'axios'
import Payment from '../dataModel/paymentModel.js'
import { wss } from '../server.js'
import WebSocket from 'ws'

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
        ref1: id.substring(0, 12).toUpperCase(),
        ref2: id.substring(12).toUpperCase(),
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

    const {transactionId, billPaymentRef1, billPaymentRef2, transactionDateandTime} = req.body
    
    const orderId = (billPaymentRef1 + billPaymentRef2).toLowerCase()
    
    try {
    await Payment.create(req.body)
           
    const order = await Order.findById({_id: orderId})
    

    if (order) {
            const payment = await Payment.findOne({transactionId})
            
            order.paymentResult = payment._id
            order.isPaid = true
            order.paidAt = transactionDateandTime
            
            order.save()

            wss.clients.forEach((client) => {
                
                if (client.readyState === WebSocket.OPEN && client.id === orderId) {
                    
                    client.send("payment complete")
                } 
                
              })
    }
    


    res.send(`success to pay #${transactionId}`)
    } catch (error) {
        next(error)
    }
    
}

