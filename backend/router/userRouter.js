import {Router} from "express"
import {createUser,userlogin,getUser} from "../controller/authentication.js";
import { forgotPassword } from "../controller/forgotPassword.js";
const userRouter=Router();
userRouter.post("/signup",createUser);
userRouter.post("/login",userlogin);
userRouter.get("/get",getUser);
userRouter.post("/forgot-password",forgotPassword)

export {userRouter}