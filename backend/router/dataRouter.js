import express from 'express'
import {searchProduct, searchProducts, reviewProduct} from '../controller/productsController.js'

const routerProduct = express.Router()



routerProduct.route('/').get(searchProducts)

routerProduct.get('/:id', searchProduct)

routerProduct.route('/review').post(reviewProduct)

export default routerProduct