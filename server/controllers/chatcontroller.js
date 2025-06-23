import Conversation from "../models/conversationSchema.js"

export const getConversation=async(req,res)=>{
    try {

        const {conversationId}=req.params
        const userId=req.user._id

        const conversation=await Conversation.findById(conversationId).populate({
            path:"messages",
            populate:{
                path:"sender",
                select:"name email"
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


        return res.status(200).json({success:true,messages:conversation.messages})
        
    } catch (error) {
        console.log("error in get conversation controller",{error})
        return res.status(500).json({success:false, message:"Internal Server error"})
    }
}