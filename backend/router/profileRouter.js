import {Router} from "express"
import {getProfile,connectUser,getConnection} from "../controller/profilecontroller.js"
import {verityToken} from "../middlewere/tokenverification.js"
import { updateprofile } from "../middlewere/adduserprofile.js"
const profileRouter=Router()

import "dotenv/config"
profileRouter.use(verityToken)
profileRouter.get("/profile",getProfile)
profileRouter.post('/update-profile',updateprofile);
  
profileRouter.post("/connect/:userId",connectUser)
profileRouter.get("/connection",getConnection)
export{profileRouter}