import {Router} from "express"
import {createUser,userlogin,getUser} from "../controller/usercontroller.js";
const userRouter=Router();
userRouter.post("/signup",createUser);
userRouter.post("/login",userlogin);
userRouter.get("/get",getUser);
export {userRouter}