import {User} from '../model/userModel.js';
import "dotenv/config"
import jwt from "jsonwebtoken"

const getProfile=async(req,res)=>{
    const token=req.headers.authorization
    try{
        const tokenData=jwt.verify(token,process.env.KEY)
        const userProfile=await User.findOne({email:tokenData.email}).select('-password')
        res.status(200).json({message:userProfile})
       
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const connectUser=async(req,res)=>{
    const targetUserID=req.params.userId
    const userId=req.user._id
    try{
        const user=await User.findById(userId)
        const targetUser = await User.findById(targetUserID)
        if(!user ||!targetUser){
            return res.status(404).json({error:"User not found"})
        }
        if (userId.toString() === targetUserID) {
            return res.status(400).json({ error: "Cannot connect to yourself" });
        }
        if(user.connections.includes(targetUserID)){
            return res.status(400).json({error:"User already connected"})
        }
        user.connections.push(targetUserID)
        await user.save()
        res.status(200).json({msg:"User connected",user})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}
const getConnection=async(req,res)=>{
    try{
        const user=await User.findById(req.user.userId)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const connections=await User.find({_id:{$in:user.connections}})
        res.status(200).json({connections})

    }catch(err){
        res.status(500).json({error:err.message})
    }
}
export {getProfile,connectUser,getConnection};