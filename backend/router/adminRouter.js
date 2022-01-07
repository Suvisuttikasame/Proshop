import express from "express";
import {adminUserList, adminUserDelete, adminUserUpdate, adminUserItem, adminProductList, adminProductItem, adminProductDelete, adminProductUpdate, adminProductCreate, adminOrderItem, adminOrderList, adminOrderUpdate} from '../controller/adminController.js'
import { adminCheck } from "../middlewareHandler/adminHandler.js";



const routerAdmin = express.Router()


routerAdmin.route('/user').post(adminCheck ,adminUserList).put(adminCheck, adminUserUpdate).delete(adminCheck, adminUserDelete)
routerAdmin.route('/user:id').post(adminCheck, adminUserItem)

routerAdmin.route('/order').post(adminCheck ,adminOrderList).put(adminCheck, adminOrderUpdate)
routerAdmin.route('/order:id').post(adminCheck, adminOrderItem)


routerAdmin.route('/product').post(adminCheck, adminProductList).put(adminCheck, adminProductUpdate).delete(adminCheck, adminProductDelete)
routerAdmin.route('/product/create').post(adminCheck, adminProductCreate)
routerAdmin.route('/product:id').post(adminCheck, adminProductItem)


export default routerAdmin
