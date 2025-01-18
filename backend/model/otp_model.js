import { Schema,model } from "mongoose";

const oootp=new Schema({
    email:{type:String,required:true},
    otp:{type:Number, required:true}
})

const ootp=model("otp",oootp)
export {ootp}  