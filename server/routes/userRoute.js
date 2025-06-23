import { Router } from "express";
import { getAllUsers, getConversations, sendMessage } from "../controllers/usercontroller.js";

const userRoute=Router()

userRoute.get('/getUsers/:userId',getAllUsers)

userRoute.post('/sendMessage',sendMessage)

userRoute.get('/getConversations/:userId',getConversations)

export default userRoute