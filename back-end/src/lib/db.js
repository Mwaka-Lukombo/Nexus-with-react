import mongoose from 'mongoose';
import { config } from 'dotenv';


config();



export async function dbConnect(){

    try {
        const res = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Conn ${res.connection.host}`);

        return res;
    } catch (error) {
        console.log("Error in ConnectDB: ",error.message);
    }
}





