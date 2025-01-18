import jwt from "jsonwebtoken"
import "dotenv/config"
const verityToken=(req,res,next)=>{
    const authHeader=req.header("Authorization")
    
    if(!authHeader){
        return res.status(401).json({error:"No token, authorization denied"})
    }
    try{
        const verified=jwt.verify(authHeader,process.env.KEY)
        if(verified){
            next()
        }
        else{
            return res.status(404).json({message:"token invalid"})
        }
    }catch(err){
        res.status(403).json({error:"Token is not valid"})
    }
}
export {verityToken}