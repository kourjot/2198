import {createEvent,getEvents} from "../controller/eventcontroller.js"
import {Router} from "express"
const eventRouter=Router();
eventRouter.post("/create-event",createEvent);
eventRouter.get("/events",getEvents);
export{eventRouter}