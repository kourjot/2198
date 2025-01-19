import {event} from "../model/event.js"

const createEvent=async(req,res)=>{
    const {title,category,date,time}=req.body
    try{
        const eventDateTime = new Date(`${date}T${time}`);
        if(eventDateTime<new Date()){
            await event.deleteOne({ title, category, date, time });
            return res.status(200).json({ message: "Event already completed" });
        }
        console.log(eventDateTime)
        const existingEvent = await event.findOne({ title, category, date, time });
        if (existingEvent) {
            return res.status(400).json({ error: "Event with the same details already exists" });
        }
        const newEvent=new event({title,category ,date, time})
        await newEvent.save()
        res.status(201).json({message:"Event created successfully"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}
const getEvents =async(req,res)=>{
    try{
        const events=await event.find()
        res.status(200).json({events})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
export {createEvent,getEvents}