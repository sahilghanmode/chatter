import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const verifyJWT=async(req,res,next)=>{
    try {
        
        const token=req.cookies?.authToken || req.header("Authorization")?.replace("Bearer " , "")?.trim();

        if(!token){
            return res.status(401).json({success:false, message:"Internal server error from verifyJWT"})
        }


        const decodedToken=jwt.verify(token, process.env.JWT_SECRET)


        const user=await User.findById(decodedToken?.userId).select('-password')
        if(!user){
            return res.status(400).json({success:false, message:"user not found"})
        }
        req.user=user
        next()
    } catch (error) {
        console.log("error in verifyJWT middleware",{error})
        return res.status(500).json({success:false, message:"Internal Server error"})
    }
}