import User from "../models/userModel.js"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import { compare } from "bcrypt"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thorsthorkel@gmail.com',
        pass: 'zksl gett jana gtue'
    }
})

const maxAge = 30 * 24 * 60 * 60 * 1000

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: maxAge })
}

export const getCurrentUser=async(req,res)=>{
    try {
        const user=req.user
        return res.status(200).json(user)
    } catch (error) {
        console.log("error in get current user controller",{error})
        return res.status(500).json({message:"Internal server error"})
    }
}

export const signup=async(req,res)=>{
    try {
        console.log("dad")
        const {name,email,password}=req.body
        if(!name || !email ){
            return res.status(400).json({success:false, message:"name and password are required"})
        }
        if(!password){
            return res.status(400).json({success:false, message:"Password is missing"})
        }

        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({success:false, message:"user already exists"})
        }
        
        const user=await User.create({
            name,
            email,
            password
        })

        return res.status(200).json({success:true, message:"user created successfully"})

    } catch (error) {
        console.log("error in signup controller",{error})
        return res.status(500).json({success:false, message:"Internal server error"})
    }
}

export const sendOtp=async(req,res)=>{
    try {

        const {email}=req.body;
        if(!email){
            return res.status(400).json({success:false, message:"email is required"})
        }

        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false, message:"user not found"})
        }
        if(user.otp.attempts>=5){
            return res.status(400).json({success:false, message:"too many attempts try again later"})
        }

        const otp=user.generateOTP()
        await user.save()

        const mailOptions = {
            from: `"Chatter"`,
            to: email,
            subject: 'Your OTP Verification Code',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>OTP Verification</h2>
                <p>Your One-Time Password (OTP) for verification is:</p>
                <h1 style="color: #4a90e2; font-size: 32px; letter-spacing: 2px;">${otp}</h1>
                <p>This OTP will expire in 15 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
              </div>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({success:true, message:"otp sent successfully"})
   
    } catch (error) {
        console.log("error in sendOtp controller",{error})
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export const verify=async(req,res)=>{
    try {
        const {otp, email } = req.body

        
        if (!email) {
            res.status(400).json({
                success: false,
                message: "email is missing"
            })
        }

        if (!otp) {
            res.status(400).json({
                success: false,
                message: "otp is required"
            })
        }

        const user = await User.findOne({ email }).select('-password')

        user.incrementOTPAttempts();

        if (user.otp.attempts >= 5) {
            user.clearOTP();
            await user.save();

            return res.status(400).json({
                success: false,
                message: "Too many failed attempts. Please request a new OTP."
            });
        }

        if (!user.isOTPValid(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        user.isVerified = true;
        user.clearOTP();
        await user.save();

        res.cookie("authToken", createToken(email, user.id),{
            maxAge,
            secure: true,
            sameSite: "None"
        })

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user
        });

    } catch (error) {
       console.log("error in verify controller",{error})
       return res.status(500).json({success:false, message:"Internal Server Error"}) 
    }
}

export const login=async(req,res)=>{
    try {

        const {email, password}=req.body
        if(!email || !password){
            return res.status(400).json({success:false, message:"Email and password is required"})
        }
        const user=await User.findOne({email})
        
        if(!user){
            return res.status(400).json({success:false, message:"email does not match"})
        }

        if(!user.isVerified){
            return res.status(400).json({success:false, message:"User is not verified"})
        }   

        const auth =await compare(password, user.password)
        if(!auth){
            return res.status(400).json({success:false,message:"Password does not match"})
        }

        res.cookie("authToken",createToken(user.email, user.id),{
            maxAge,
            secure:true,
            sameSite:"None"
        })

        return res.status(200).json({success:true, message:"user is logged in successfully", user})


        
    } catch (error) {
        console.log("error in login controller",{error})
        return res.status(500).json({success:false, message:"Something went wrong"})
    }
}