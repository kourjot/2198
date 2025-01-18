import {Router} from "express"
import {getProfile,updateProfile,connectUser,getConnection} from "../controller/profilecontroller.js"
import {verityToken} from "../middlewere/tokenverification.js"
import { upload } from "../config/multerConfig.js"
// import  {upload,profile_photo}  from "..middlewere/upload.js"
const profileRouter=Router()
profileRouter.get("/profile",verityToken,getProfile)
profileRouter.post('/update-profile', upload.single('fileUpload'), updateProfile);
profileRouter.post("/connect/:userId",verityToken,connectUser)
profileRouter.get("/connection",verityToken,getConnection)
export{profileRouter}