import { Router } from "express"
import { getConversation } from "../controllers/chatcontroller.js"
import { verifyJWT } from "../middlewares/authMiddleware.js"

const chatRoute=Router()

chatRoute.get('/getConversation/:conversationId',verifyJWT,getConversation)

export default chatRoute