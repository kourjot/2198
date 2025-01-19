import {Schema,model} from "mongoose"
const eventSchema=new Schema({
    email:{
        type:String,
        requires:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    }
})
const event=model("event",eventSchema)
export {event}