import jwt from "jsonwebtoken"
import "dotenv/config"
const verityToken=(req,res,next)=>{
    const authHeader=req.header("Authorization")
    if(!authHeader){
        return res.status(401).json({error:"No token, authorization denied"})
    }
    const token = authHeader.startsWith("Bearer ") 
        ? authHeader.split(' ')[1] 
        : authHeader;

    try{
        const verified=jwt.verify(token,process.env.KEY)
        console.log(verified)
        req.user=verified
        next()
    }catch(err){
        res.status(403).json({error:"Token is not valid"})
    }
}
export {verityToken}