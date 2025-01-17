import {connect} from "mongoose";
import "dotenv/config"
const db=async()=>{
    try{
        await connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    }
    catch(err){
        console.error("Error connecting to database",err);

    }
}
export {db}