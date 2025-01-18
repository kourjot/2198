import {User} from '../model/userModel.js';

import { AdditionalUserData } from '../model/adduserdata.js';
import { upload } from '../config/multerConfig.js';

const updateProfile = async (req, res) => {
    const userUpdates = {};
    const additionalUpdates = {};

    if (req.file) {
        additionalUpdates.fileUpload = req.file.path; // Store the uploaded file path
    }

    for (const key in req.body) {
        if (req.body[key] !== undefined) {
            if (['governmentId', 'hobbies', 'shortBio'].includes(key)) {
                additionalUpdates[key] = req.body[key];
            } else {
                userUpdates[key] = req.body[key];
            }
        }
    }

    try {
        const user = await User.findByIdAndUpdate(req.user._id, userUpdates, { new: true });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        let additionalData = await AdditionalUserData.findOne({ userId: req.user._id });

        if (additionalData) {
            additionalData = await AdditionalUserData.findByIdAndUpdate(
                additionalData._id,
                additionalUpdates,
                { new: true }
            );
        } else {
            additionalUpdates.userId = req.user._id;
            additionalData = await AdditionalUserData.create(additionalUpdates);
        }

        res.status(200).json({ msg: "Profile updated", user, additionalData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Use multer in the route



const getProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id)
        console.log(user)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json({user})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
// const updateProfile = async (req, res) => {
//     const updates = {};

//     for (const key in req.body) {
//         if (req.body[key] !== undefined) {
//             updates[key] = req.body[key];
//         }
//     }

//     try {
//         const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });

//         console.log("Updated User:", user); 

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.status(200).json({ msg: "Profile updated", user });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
const connectUser=async(req,res)=>{
    const targetUserID=req.params.userId
    const userId=req.user._id
    try{
        const user=await User.findById(userId)
        const targetUser = await User.findById(targetUserID)
        if(!user ||!targetUser){
            return res.status(404).json({error:"User not found"})
        }
        if (userId.toString() === targetUserID) {
            return res.status(400).json({ error: "Cannot connect to yourself" });
        }
        if(user.connections.includes(targetUserID)){
            return res.status(400).json({error:"User already connected"})
        }
        user.connections.push(targetUserID)
        await user.save()
        res.status(200).json({msg:"User connected",user})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}
const getConnection=async(req,res)=>{
    try{
        const user=await User.findById(req.user.userId)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const connections=await User.find({_id:{$in:user.connections}})
        res.status(200).json({connections})

    }catch(err){
        res.status(500).json({error:err.message})
    }
}
export {getProfile,updateProfile,connectUser,getConnection};