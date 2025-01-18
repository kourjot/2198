import {admin}  from  "../model/admin.js"
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config"
const createAdmin=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const Admin=await admin.findOne({email})
        if(Admin){
            return res.status(400).json({error:"Admin already exists"})
        }
        const hashedPassword=await argon2.hash(password)
        const newAdmin=new admin({
            username,
            email,
            password:hashedPassword,
            
        })
        await newAdmin.save();
        res.status(200).json({message:"Admin created successfully"});
    }catch(e){
        console.error(e);
        return res.status(500).json({error:"Server error"})
    }
}
const adminlogin =async(req,res)=>{
    try{
    const {email,password}=req.body

    const Admin=await admin.findOne({email})
    
    if(!Admin){
       return res.status(404).json({message:"Admin not found"})
    }
    const vaild=await argon2.verify(Admin.password,password)
    if(vaild){
        const token=jwt.sign({_id:Admin._id,email:Admin.email},process.env.KEY,{
            expiresIn:"1 day"
        })
        return res.status(200).json({msg:"user login",token:token})
    }
    res.status(200).json({message:"login success"})
    }catch(err){
        res.status(500).json({msg:"jot",err})
    }
}
export {createAdmin,adminlogin}