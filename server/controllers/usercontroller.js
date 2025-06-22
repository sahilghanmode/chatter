import User from "../models/userModel.js"

export const getAllUsers=async(req,res)=>{
    try {

        const {userId}=req.params

        if(!userId){
            return res.staus(403).json({success:false, message:"Permission Denied"})
        }
        
        const getUsers=await User.find({
            _id:{$ne:userId}
        }).select("-password")
        
        if(!getUsers){
            return res.status(400).json({success:false, message:"Something went wrong in getallusers controller"})
        }

        return res.status(200).json({success:true, getUsers})

    } catch (error) {
        console.log("error in getallusers controller",{error})
        return res.status(500).json({success:false, message:"Internal Server error"})
    }
}