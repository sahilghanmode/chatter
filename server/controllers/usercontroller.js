import User from "../models/userModel.js"
import Conversation from "../models/conversationSchema.js"
import Message from "../models/messageSchema.js"

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

export const sendMessage=async(req,res)=>{
    try {
        
        const {from, to, message}=req.body

        let conversation=await Conversation.findOne({
            participants:{$all:[from,to]}
        })

        if(!conversation){
            conversation = new Conversation({
            participants: [from, to],
            unreadCount: {
                [to]: 1,
                [from]: 0
            }
            });
        }

        const newMessage=await Message.create({
            sender:from,
            receiver:to,
            message,
            conversation:conversation._id
        })

        await newMessage.save()

        conversation.messages.push(newMessage._id)
        conversation.lastMessage=message
        conversation.lastSender=from

        conversation.unreadCount.set(to,(conversation.unreadCount.get(to)|| 0) +1)
        conversation.unreadCount.set(from, 0);


        await conversation.save()

        return res.status(200).json({success:true, newMessage, conversation})


    } catch (error) {
        console.log("error in sendMessage controller",{error})
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export const getConversations = async (req, res) => {
  try {
    const userId = req.params.userId; 

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate({
        path: "participants",
        select: "_id name email", 
      })
      .populate({
        path: "lastSender",
        select: "_id name email",
      })
      .sort({ updatedAt: -1 })
    const formatted = conversations.map((conv) => {
      const otherUser = conv.participants.find(
        (p) => p._id.toString() !== userId.toString()
      );

      return {
        _id: conv._id,
        user: otherUser, 
        lastMessage: conv.lastMessage || "",
        lastSender: conv.lastSender || null,
        unreadCount: conv.unreadCount.get(userId.toString()) || 0,
      };
    });

    res.status(200).json({
      success: true,
      conversations: formatted,
    });
  } catch (error) {
    console.error("Error getting conversations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
    });
  }
};
