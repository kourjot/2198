import {event} from "../model/event.js"
import "dotenv/config"
import jwt from "jsonwebtoken"
const createEvent=async(req,res)=>{
    const token=req.headers.authorization
    const {title,category,date,time}=req.body
    try{
        const tokendetail=jwt.verify(token,process.env.KEY)
        const eventDateTime = new Date(`${date}T${time}`);
        if(eventDateTime<new Date()){
            await event.deleteOne({email:tokendetail.email});
            return res.status(200).json({ message: "Event already completed" });
        }
        const existingEvent = await event.findOne({email:tokendetail.email});
        if (existingEvent) {
            return res.status(400).json({ error: "one admin create only one event" });
        }
        const newEvent=new event({email:tokendetail.email,title,category ,date, time})
        await newEvent.save()
        res.status(201).json({message:"Event created successfully"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}
const getEvents = async (req, res) => {
    try {
        // Query the database for events
        const events = await event.find();

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found" });
        }

        // Send events as response
        res.status(200).json({ event:events });
    } catch (err) {
        // Handle any potential errors
        res.status(500).json({ error: err.message });
    }
}

export {createEvent,getEvents}