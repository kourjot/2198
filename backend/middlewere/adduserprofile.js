import jwt from "jsonwebtoken"
import { User } from "../model/userModel.js";
export const updateprofile=async (req, res) => {
    if (req.body.email) {
      return res.status(400).json({ message: "You cannot change email" });
    }
    const { governmentId, hobbies, shortBio } = req.body;
    // console.log(governmentId,hobbies,shortBio);
    if (!governmentId || !hobbies || !shortBio){
        return res.status(404).json({message:"all fields are required"})
    }
    const token = req.headers.authorization;
    // console.log(token);
  
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    try {
      const tokenDetail = jwt.verify(token, process.env.KEY);
  
      const userExists = await User.findOne({ email: tokenDetail.email });
     
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (!userExists.shortBio && !userExists.governmentId) {
        userExists.governmentId = governmentId;
        userExists.hobbies = hobbies;
        userExists.shortBio = shortBio;
        await userExists.save();
        return res.status(200).json({ msg:"Profile updated"});
      }
      return res.status(200).json({ message: "Profile already contains information" });
      }catch (err) {
      return res.status(500).json({ message: "Error updating profile", error: err.message });
    }
  }