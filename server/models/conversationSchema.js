import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  ],

  lastMessage: {
    type: String,
    default: ""
  },

  lastSender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  unreadCount: {
    type: Map,
    of: Number, 
    default: {}
  }
}, { timestamps: true });

export default mongoose.model("Conversation", conversationSchema);
