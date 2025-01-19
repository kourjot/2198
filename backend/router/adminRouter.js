import {Router} from "express"
import {createAdmin,adminlogin,deleteEvent} from "../controller/admincontroller.js"
const adminRouter=Router();
adminRouter.post("/signup",createAdmin);
adminRouter.post("/login",adminlogin);

adminRouter.delete("/deleteEvent",deleteEvent);

export {adminRouter}