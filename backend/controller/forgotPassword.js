import { ootp } from "../model/otp_model.js";
import { User } from "../model/userModel.js";
import "dotenv/config"
import nodemailer from "nodemailer"
import crypto from "node:crypto"
import argon2 from "argon2"


const gmail=process.env.gmail_nodemailer
const pass=process.env.gmail_nodemailer_password

const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
        user:gmail,
        pass:pass
    }
})
 
export const forgotPassword=async(req,res)=>{
    const {email}=req.body
    try{
        const emailExists=await User.findOne({email})
        if(!emailExists){
            return res.status(201).send("user not found")
        }
        let ot=crypto.randomInt(100000,1000000)
        ot=ot.toString()
        const x =await argon2.hash(ot)
        emailExists.password=x
        const mailOptions=({
            to:email,
            subject:`New Password `,
            text:ot.toString(), 
            html:`<h1>New-Password <h1> ${ot}`
        })
        console.log(ot)
        await emailExists.save()
       transporter.sendMail(mailOptions)
       res.status(200).json({message:"Password updated successfully"})
    } catch(err){
        console.log(err);
        res.status(500).send("error in forgot password")
    }


}

