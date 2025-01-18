import {Router} from "express"
import {getProfile,updateProfile,connectUser,getConnection} from "../controller/profilecontroller.js"
import {verityToken} from "../middlewere/tokenverification.js"
import { upload } from "../config/multerConfig.js"
const profileRouter=Router()
profileRouter.use(verityToken)
profileRouter.get("/profile",getProfile)
profileRouter.post('/update-profile', upload.single('fileUpload'), updateProfile);
profileRouter.post("/connect/:userId",connectUser)
profileRouter.get("/connection",getConnection)
export{profileRouter}