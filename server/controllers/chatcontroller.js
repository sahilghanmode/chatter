import Conversation from "../models/conversationSchema.js"

export const getConversation=async(req,res)=>{
    try {

        const {conversationId}=req.params
        const userId=req.user._id

        const conversation=await Conversation.findById(conversationId).populate({
            path:"messages",
            select:"sender receiver message conversation createdAt",
            populate:{
                path:"sender receiver",
                select:"_id name"
            }
        })

        if(!conversation){
            return res.status(400).json({success:false, message:"Conversation not found"})
        }

        const count = conversation.unreadCount.get(userId.toString()) || 0

        if (count > 0) {
            conversation.unreadCount.set(userId.toString(), 0)
            await conversation.save()
        }

        const filteredMessages=conversation.messages.map((msg)=>({
            sender:msg.sender._id,
            receiver:msg.receiver._id,
            content:msg.message,
            conversation:msg.conversation._id,
            timestamp:msg.createdAt
        }))

        return res.status(200).json({success:true,messages:filteredMessages})
        
    } catch (error) {
        console.log("error in get conversation controller",{error})
        return res.status(500).json({success:false, message:"Internal Server error"})
    }
}