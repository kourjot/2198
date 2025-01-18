import {User } from "../model/userModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config"
import crypto from "crypto"
const generateUniqueCode=async()=>{
    let code;
    let isunique=false;
    while(!isunique){
        const buffer =crypto.randomBytes(2)
        const base36Code = buffer.readUInt16BE(0).toString(36).toUpperCase();
        code = base36Code.slice(0, 4);
        if(code.length<4){
            continue 
        }
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
            uniqueCode,
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
       return res.status(404).json({message:"user not found"})
    }
    const vaild=await argon2.verify(user.password,password)
    if(vaild){
        const token=jwt.sign({_id:user._id,email:user.email,unique:user.uniqueCode},process.env.KEY,{
            expiresIn:"1 day"
        })
        return res.status(200).json({msg:"user login",token:token,unique:user.uniqueCode})
    }
    return res.status(404).json({message:"Invalid credentials"})
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