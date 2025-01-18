import {Router} from "express"
import {getProfile,updateProfile,connectUser,getConnection} from "../controller/profilecontroller.js"
import {verityToken} from "../middlewere/tokenverification.js"
// import  {upload,profile_photo}  from "..middlewere/upload.js"
const profileRouter=Router()
profileRouter.get("/profile",verityToken,getProfile)
// profileRouter.post("/profile/photo",upload.single,verityToken,profile_photo)
profileRouter.put("/profile",verityToken,updateProfile)
profileRouter.post("/connect/:userId",verityToken,connectUser)
profileRouter.get("/connection",verityToken,getConnection)
export{profileRouter}