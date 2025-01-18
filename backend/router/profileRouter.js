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
    // console.log("vijay");
    // Check if email change is attempted
    if (req.body.email) {
      return res.status(400).json({ message: "You cannot change email" });
    }
  
    const token = req.headers.authorization;
    // console.log(token);
    const { governmentId, hobbies, shortBio } = req.body;
  
    // Check if token is provided
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
    }
  
    try {
      // Verify the token 
      const tokenDetail = jwt.verify(token, process.env.KEY);
        console.log(tokenDetail);
      // Find user by email
      const userExists = await User.findOne({ email: tokenDetail.email });
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if profile has already been updated
      if (userExists.hobbies) {
        return res.status(200).json({ message: "Profile already updated"});
      }
  
      // Upload file to cloud service (Cloudinary, S3, etc.)
    //   let url;
      try {
        // url = await V2.uploader.upload(req.file.path);
        userExists.governmentId = governmentId;
        // userExists.profilepic = url.secure_url;
        userExists.hobbies = hobbies;
        userExists.shortBio = shortBio;
      } catch (uploadError) {
        return res.status(500).json({ message: "Error uploading file", error: uploadError });
      }
  
      // Update user profile details
     
  
      // Delete the file from local storage after successful upload
    //   fs.unlink(req.file.path, (err) => {
    //     if (err) {
    //       console.error('Error deleting file:', err);
    //     }
    //   });
  
      // Save updated user profile
      await userExists.save();
  
      // Return updated profile
      return res.status(200).json({ profile: userExists });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating profile", error: err.message });
    }
  });
  
profileRouter.post("/connect/:userId",connectUser)
profileRouter.get("/connection",getConnection)
export{profileRouter}