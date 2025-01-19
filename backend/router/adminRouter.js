import {Router} from "express"
import {createAdmin,adminlogin,deleteEvent} from "../controller/admincontroller.js"
import { eventget } from "../controller/adminGet.js";
const adminRouter=Router();
adminRouter.post("/signup",createAdmin);
adminRouter.post("/login",adminlogin)
adminRouter.get("/getevent",eventget)

adminRouter.delete("/deleteEvent",deleteEvent);
export {adminRouter}