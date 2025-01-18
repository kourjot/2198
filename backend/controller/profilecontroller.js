import {User} from '../model/userModel.js';
import "dotenv/config"
import V2 from "cloudinary"
import fs from "fs"
import jwt from "jsonwebtoken"
V2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const updateProfile = async (req, res) => {
    return res.send("vijay")
    if(req.body.email){
        return res.status(404).json({message:"You can not change email"})
    }
    const token=req.headers.authorization
    const{governmentId,hobbies,shortBio}=req.body
    if(!governmentId || !hobbies || !shortBio || !req.file.path){
        return res.status(404).json({message:"all fields are required"})
    }
    try{
    const tokenDetail=jwt.verify(token,process.env.KEY)
    const userExists=await User.findOne({email:tokenDetail.email})
    if(userExists.profilepic){
        return res.status(404).json({message:"user already updated profile"})
    }
    let url=await V2.uploader.upload(req.file.path)
    userExists.governmentId=governmentId
    userExists.profilepic=url.secure_url
    userExists.hobbies=hobbies
    userExists.shortBio=shortBio
    fs.unlinkSync(req.file.path)
    await userExists.save()
    return res.status(200).json({profile:userExists})




    }catch(err){
        console.log(err);
        return res.status(500).json({message:"error in profile update",err:err})
    }
};




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
export {getProfile,updateProfile,connectUser,getConnection};