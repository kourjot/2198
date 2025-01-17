import {User } from "../model/userModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config"
const generateUniqueCode=async()=>{
    let code;
    let isunique=false;
    while(!isunique){
        code=Math.floor(1000+Math.random()*9000);
        const existingUser=await User.findOne({uniqueCode:code})
        if(!existingUser){
            isunique=true;
        }
    }
    return code;
}
const createUser=async(req,res)=>{
    const {username,age,gender,email,password}=req.body;
    try{
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({error:"User already exists"})
        }
        const hashedPassword=await argon2.hash(password);
        const uniqueCode=await generateUniqueCode()
        const newUser=new User({
            username,
            age,
            gender,
            email,
            password:hashedPassword,
            uniqueCode
        })
        await newUser.save();
        res.status(200).json({message:"User created successfully",uniqueCode:uniqueCode});
    }catch(e){
        console.error(e);
        return res.status(500).json({error:"Server error"})
    }
}
const userlogin =async(req,res)=>{
    try{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        res.status(404).json({message:"user not found"})
    }
    const vaild=await argon2.verify(user.password,password)
    if(vaild){
        const token=jwt.sign({name:user.username,email:user.email},process.env.KEY,{
            expiresIn:"1 day"
        })
        return res.status(200).json({msg:"user login ",token:token})
    }
    res.status(200).json({message:"login success"})
    }catch(err){
        res.status(500).json({error: err.message})

    }
}
const getUser=async(req,res)=>{
    try{
        const user=await User.find();
        res.status(200).json({user})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
export {createUser,userlogin,getUser}