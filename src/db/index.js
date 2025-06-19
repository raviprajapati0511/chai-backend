import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        console.log("Starting MongoDB connection..."); // ADD THIS
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("After connect"); // ADD THIS
        console.log(`\n MONGODB connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
