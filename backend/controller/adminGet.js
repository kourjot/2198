import { event } from "../model/event.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
export const eventget=async(req,res)=>{
    const token=req.headers.authorization
    try{
        const tokenData=jwt.verify(token,process.env.KEY)
        const data = await event.findOne({email:tokenData.email})
        res.status(201).json({message:"fetced event",event:data})
    }catch(err){
        return res.status(500).json({mesgae:"error in get evet admin",err:err})
    }
}