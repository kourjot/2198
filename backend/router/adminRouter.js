import {Router} from "express"
import {createAdmin,adminlogin} from "../controller/admincontroller.js"
const adminRouter=Router();
adminRouter.post("/signup",createAdmin);
adminRouter.post("/login",adminlogin);

export {adminRouter}