import mongoose from 'mongoose'
import dotenv from 'dotenv'
import createConnectionDB from './database/connectDB.js'
import Oder from './dataModel/orderModel.js'
import Product from './dataModel/productModel.js'
import User from './dataModel/userModel.js'
import users from './data/users.js'
import products from './data/products.js'

dotenv.config()

createConnectionDB()


const importItem = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Oder.deleteMany()

        const createUser = await User.insertMany(users)
        const productAndUser = products.map((p) => {
            return {... p, user: createUser[0]._id}    
        })
        await Product.insertMany(productAndUser)
        console.log('Inserted item to DB');
        process.exit()


    } catch (error) {
        console.log(`Message: ${error}`);
        process.exit(1)
    }
    

}



const deleteItem = async () =>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Oder.deleteMany()

        console.log('Delete all items');
        process.exit()
    } catch (error) {
        console.log(`Message: ${error}`);
        process.exit(1)
    }
}




if (process.argv[2] === '-d') {
    deleteItem()
} else {
    importItem()
}



