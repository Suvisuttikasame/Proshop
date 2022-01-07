import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import createConnectionDB from './database/connectDB.js'
import routerProduct from './router/dataRouter.js'
import routerUser from './router/userRouter.js'
import {errorHappen, wrongPath} from './middlewareHandler/errorHandler.js'
import bodyParser from 'body-parser'
import routerOrder from './router/orderRouter.js'
import routerAdmin from './router/adminRouter.js'
import routerUpload from './router/upload.js'

dotenv.config()

const app = express()

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(bodyParser.json())
createConnectionDB()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})


app.use('/api/products' ,routerProduct)
app.use('/api/user', routerUser)
app.use('/api/order', routerOrder)
app.use('/api/admin', routerAdmin)
app.use('/api/upload', routerUpload)

app.use(wrongPath, errorHappen)


 
const port = process.env.PORT || 5000;

app.listen(port, console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`))