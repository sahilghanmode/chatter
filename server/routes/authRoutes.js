import { Router } from "express";
import { signup, sendOtp, verify } from "../controllers/authcontroller.js";

const authRoute=Router()

authRoute.post('/signup',signup)

authRoute.post('/send-otp',sendOtp)

authRoute.post('/verify',verify)

export default authRoute