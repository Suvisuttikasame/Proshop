import axios from 'axios'
import express from 'express'
import { placeOrderController, getOrderById, getOderByUserId } from '../controller/ordersController.js'
import { userAuthorizationHandler } from '../middlewareHandler/userHandler.js'
import { scbAuthRequest } from '../middlewareHandler/paymentHandler.js'
import { requestQRcode, confirmPayment} from '../controller/ordersController.js'

const routerOrder = express.Router()


routerOrder.route('/').post(userAuthorizationHandler, placeOrderController)
.get( getOrderById)

routerOrder.route('/userid').get( getOderByUserId)

routerOrder.route('/scbauth').post(scbAuthRequest, requestQRcode)

routerOrder.route('/paymentconfirm').post(confirmPayment)


export default routerOrder
