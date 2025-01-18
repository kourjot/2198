// import multer from "multer";
// import V2 from "cloudinary";
// import { profilePhoto } from "../model/profile.js";
// import "dotenv/config";
// import jwt from "jsonwebtoken";
// import fs from "fs";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// });
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/;
//     const extname = allowedTypes.test(file.mimetype);
//     const mimetype = allowedTypes.test(file.originalname.toLowerCase());

//     if (extname && mimetype) {
//         cb(null, true); 
//     } else {
//         cb(new Error("Only image files are allowed!"), false); 
//     }
// };

//  const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 }, 
// });


// V2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET, 
// });


//  const profile_photo = async (req, res) => {
//     let token = req.headers["authorization"];
//     if (!token) {
//         return res.status(400).json({ message: "Token is required" });
//     }

//     try {
      
//         const tokenData = jwt.verify(token, process.env.KEY);
//         const { email } = tokenData;

//         let uploadedImage = await V2.uploader.upload(req.file.path);

//         fs.unlink(req.file.path, async (err) => {
//             if (err) {
//                 return res.status(500).json({ message: "Error deleting the file from the server" });
//             }

//             try {
//                 const profileData = await profilePhoto.findOne({ email: email });

//                 if (profileData) {
    
//                     await profileData.updateOne({ email: email }, { $set: { profileUrl: uploadedImage.secure_url } });
//                     return res.status(200).json({ message: "Profile photo updated successfully" });
//                 } else {
//                     const newProfile = new profilePhoto({
//                         email: email,
//                         profileUrl: uploadedImage.secure_url,
//                     });
//                     await newProfile.save();
//                     return res.status(201).json({ message: "Profile photo uploaded successfully" });
//                 }
//             } catch (dbError) {
//                 return res.status(500).json({ message: "Database operation failed", error: dbError.message });
//             }
//         });
//     } catch (err) {
//         console.error("Error processing the request", err);
//         return res.status(500).json({ message: "Error processing the request", error: err.message });
//     }
// };
// export {upload,profile_photo}