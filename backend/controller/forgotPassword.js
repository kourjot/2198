import { ootp } from "../model/otp_model.js";
import { User } from "../model/userModel.js";
import "dotenv/config"
import nodemailer from "nodemailer"
import crypto from "node:crypto"


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
        const otpExists=await ootp.find({email})
        if(otpExists){
            await ootp.deleteOne({email})
        }
        const ot=crypto.randomInt(100000,1000000)
        const newOtp=new ootp({
            email:email,
            otp:ot
        })
        await newOtp.save()
        const mailOptions=({
            to:email,
            subject:`Reset Password OTP FITNESS BUDDY`,
            text:ot.toString(), 
            html:`<h1>Reset Password <h1> ${ot}`
        })
       transporter.sendMail(mailOptions)
       res.status(200).json({message:newOtp})
    } catch(err){
        console.log(err);
        res.status(201).send("error in forgot password")
    }


}

