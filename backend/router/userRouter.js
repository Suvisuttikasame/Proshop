import express from 'express'
import {userController, userAuthorization, userRegisteration, userUpdatePassword} from '../controller/usersController.js'
import {userAuthorizationHandler} from '../middlewareHandler/userHandler.js'
import User from '../dataModel/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const routerUser = express.Router()


routerUser.route('/login').post(userController)
routerUser.route('/profile').get( userAuthorizationHandler,  userAuthorization).put(userAuthorizationHandler, userUpdatePassword)
routerUser.route('/register').post(userRegisteration)


export default routerUser