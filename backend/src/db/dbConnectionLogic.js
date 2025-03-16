import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    // try to connect to the DB. In case of error, fallback to catch.
    try {
        const connectionInstance = await mongoose.connect(
          `${process.env.MONGO_DB_URI}/${DB_NAME}`
        );
        console.log(`\n MongoDB connected successfylly! DB Host: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`\n error: Error in DB connection. \n ${error}`);
        process.exit(1);
    }
}

export default connectDB