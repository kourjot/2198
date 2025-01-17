import {Router} from "express"
import {createUser,userlogin} from "../controller/usercontroller.js";
const userRouter=Router();
userRouter.post("/create",createUser);
userRouter.post("/login",userlogin);
export {userRouter}