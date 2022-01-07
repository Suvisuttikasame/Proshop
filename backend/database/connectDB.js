import mongoose from 'mongoose'



const createConnectionDB = async ()=>{
    try {
        const connectDB = await mongoose.connect(process.env.DB_LINK);
        console.log(connectDB.connection.host);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


export default createConnectionDB