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
        type:String,
        required:true,
        unique:true
    },
    governmentId: {
        type: String,
    },
    // profilepic: {
    //     type: String, 
    // },
    hobbies: {
        type: [String],
    },
    shortBio: {
        type: String,
    }

})
const User=model("User",userSchema);

export {User};