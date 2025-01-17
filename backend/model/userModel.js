import {Schema,model} from "mongoose"
const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    uniqueCode:{
        type:Number,
        required:true,
        unique:true
    }
})
const User=model("User",userSchema);

export {User};