import {Router} from "express"
import {createUser,userlogin,getUser} from "../controller/authentication.js";
import { forgotPassword } from "../controller/forgotPassword.js";
import { resetpass } from "../controller/resetPassword.js";
const userRouter=Router();
userRouter.post("/signup",createUser);
userRouter.post("/login",userlogin);
userRouter.get("/get",getUser);
userRouter.post("/forgot-password",forgotPassword)
userRouter.post("/resetPassword",resetpass)
export {userRouter}