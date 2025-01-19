import {Schema,model} from "mongoose"
const eventSchema=new Schema({
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
    },
    // time: {
    //     type: String,
    //     required: true,
    //     validate: {
    //         validator: function (v) {
    //             return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v); // Matches HH:mm format
    //         },
    //         message: props => `${props.value} is not a valid time format!`
    //     }
    // },
   
})
const event=model("event",eventSchema)
export {event}