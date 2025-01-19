import {Router} from "express"
import {createAdmin,adminlogin,deleteEvent} from "../controller/admincontroller.js"
import { eventget } from "../controller/adminGet.js";
const adminRouter=Router();
adminRouter.post("/signup",createAdmin);
adminRouter.post("/login",adminlogin);
<<<<<<< HEAD
adminRouter.get("/getevent",eventget)
=======
>>>>>>> 640c3e25ef2e67c299ba6204935bdf7820c1ba10
adminRouter.delete("/deleteEvent",deleteEvent);
export {adminRouter}