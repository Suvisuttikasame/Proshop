import mongoose from 'mongoose'



const paymentSchema = mongoose.Schema({
    payeeProxyId: {
        type: String,
    },
    payeeProxyType: {
        type: String,
    },
    payeeAccountNumber: {
        type: String,
    },
    payeeName: {
        type: String,
    },
    payerProxyId: {
        type: String,
    },
    payerProxyType: {
        type: String,
    },
    payerAccountNumber: {
        type: String,
    },
    payerName: {
        type: String,
    },
    sendingBankCode: {
        type: String,
    },
    receivingBankCode: {
        type: String,
    },
    amount: {
        type: String,
    },
    channelCode:{
        type: String,
    },
    transactionId: {
        type: String,
    },
    transactionDateandTime:{
        type: Date,
    },
    billPaymentRef1: {
        type: String,
    },
    billPaymentRef2: {
        type: String,
    },
    billPaymentRef3: {
        type: String,
    },
    currencyCode: {
        type: String,
    },
    transactionType: {
        type: String,
    }
}, {
    timestamps: true
})


const Payment =  mongoose.model('Payment', paymentSchema)


export default Payment