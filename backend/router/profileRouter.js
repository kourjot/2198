import {Router} from "express"
// import V2 from "cloudinary"
import jwt from "jsonwebtoken"
import { User } from "../model/userModel.js";
// import multer from 'multer'; 
// import fs from "fs"
import {getProfile,connectUser,getConnection} from "../controller/profilecontroller.js"
import {verityToken} from "../middlewere/tokenverification.js"

const profileRouter=Router()

import "dotenv/config"
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now()+file.originalname);
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 20 * 1024 * 1024 }
//   });



// V2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })
 
profileRouter.use(verityToken)
profileRouter.get("/profile",getProfile)
profileRouter.post('/update-profile',async (req, res) => {
    if (req.body.email) {
      return res.status(400).json({ message: "You cannot change email" });
    }
  
    const token = req.headers.authorization;
    const { governmentId, hobbies, shortBio } = req.body;
  
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
    }
    try {
      const tokenDetail = jwt.verify(token, process.env.KEY);
      const userExists = await User.findOne({ email: tokenDetail.email });
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (userExists.hobbies || userExists.shortBio || userExists.governmentId) {
        return res.status(200).json({ message: "Profile already updated"});
      }
        userExists.governmentId = governmentId;
        userExists.hobbies = hobbies;
        userExists.shortBio = shortBio;
        await userExists.save();
  
        // Return updated profile
        return res.status(200).json({ profile: userExists });
      }catch (err) {
      return res.status(500).json({ message: "Error updating profile", error: err.message });
    }
  });
  
profileRouter.post("/connect/:userId",connectUser)
profileRouter.get("/connection",getConnection)
export{profileRouter}