import { Router } from "express";
import { signup, sendOtp, verify, login, getCurrentUser, logout } from "../controllers/authcontroller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const authRoute=Router()

authRoute.post('/signup',signup)

authRoute.post('/send-otp',sendOtp)

authRoute.get('/getCurrentUser',verifyJWT, getCurrentUser)

authRoute.post('/login',login)

authRoute.post('/verify',verify)

authRoute.post('/logout',verifyJWT,logout)

export default authRoute