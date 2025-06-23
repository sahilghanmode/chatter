import { Paperclip, Send, Smile } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

const MessageInput = (onSendMessage,disabled=false) => {

    const [message,setMessage]=useState('')

    const handleSubmit=()=>{

    }

  return (
    <div className="bg-gradient-to-r from-white via-[#FDF7FF] to-[#F8F4FF] border-t border-[#E8E0F5] px-4 py-3 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <button 
          type="button"
          className="p-2 rounded-full hover:bg-[#F3E8FF] transition-all duration-200 hover:scale-105"
        >
          <Paperclip className="w-5 h-5 text-[#8B5CF6]" />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 bg-white border border-[#E8E0F5] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] transition-all placeholder-[#A78BFA] shadow-sm hover:shadow-md"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-[#F3E8FF] transition-all duration-200"
          >
            <Smile className="w-4 h-4 text-[#8B5CF6]" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="p-3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white hover:from-[#6D28D9] hover:to-[#DB2777] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
