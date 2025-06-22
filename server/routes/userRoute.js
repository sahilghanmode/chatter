import { Router } from "express";
import { getAllUsers } from "../controllers/usercontroller.js";

const userRoute=Router()

userRoute.get('/getUsers/:userId',getAllUsers)

export default userRoute