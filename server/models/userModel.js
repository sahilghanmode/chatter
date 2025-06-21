import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    otp: {
        code: {
          type: String
        },
        expiresAt: {
          type: Date
        },
        createdAt: {
          type: Date
        },
        attempts: {
          type: Number,
          default: 0
        }
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    Avatar:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    status:{
        type: String,
        enum: ["online", "offline"],
        default: "offline",
    },
    lastSeen: {
        type: Date,
        default: Date.now,
    },
    socketId: {
        type: String,
        default: null,
    }
},{
    timestamps:true
})

userSchema.methods.isOTPValid = function(otpToVerify) {
    return (
      this.otp && 
      this.otp.code === otpToVerify && 
      this.otp.expiresAt > Date.now()
    );
  };

userSchema.methods.generateOTP = function() {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

    this.otp = {
        code: newOTP,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        createdAt: new Date(),
        attempts: 0
    };

    return newOTP;
};

userSchema.methods.clearOTP = function() {
    this.otp = undefined;
};

userSchema.methods.incrementOTPAttempts = function() {
    if (this.otp) {
        this.otp.attempts = (this.otp.attempts || 0) + 1;
    }
};

userSchema.pre("save",async function(next) {
    if(!this.isModified("password"))return next();
    const salt =await genSalt()
    this.password=await hash(this.password,salt)
    next()
})

const User=mongoose.model("User",userSchema)
export default User

