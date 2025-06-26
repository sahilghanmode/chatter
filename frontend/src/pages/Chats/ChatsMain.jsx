import { useEffect } from 'react'
import SideBar from './SideBar/SideBar'
import {useSelector} from "react-redux"
import { selectUser } from '../../../utils/userSlice.js'
import { useState } from 'react'
import {axiosInstance} from "../../utils/axios.js"
import ChatWindow from './ChatWindow/ChatWindow.jsx'
 

const ChatsMain = ({socket}) => {

  const [conversations,setConversations]=useState([])
  const [activeChat,setActiveChat]=useState(null)
  const user=useSelector(selectUser)

  useEffect(()=>{
    const getUsersforSidebar=async()=>{
      const userId=user._id
      const res=await axiosInstance.get(`/user/getConversations/${userId}`)
      if(res.data.success){
        setConversations(res.data.conversations)
      }
    }

    getUsersforSidebar()
  },[user])

  useEffect(() => {
    if (user?._id && socket) {
      socket.emit("usertomap", user._id);
    }
  }, [user, socket]);

  console.log(activeChat)

  const handleChatSelect=(chatId)=>{
    setActiveChat(chatId)

    setConversations(prevChats => 
      prevChats.map(chat => 
        chat._id == chatId 
          ? { ...chat, unreadCount: 0 }
          : chat
      )
    );
    
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#FEFBFF] via-white to-[#F3E8FF] flex">

      <SideBar
        onChatSelect={handleChatSelect}
        conversations={conversations}
        socket={socket}
      />

      
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <ChatWindow
            chat={activeChat}
            // onSendMessage={handleSendMessage}
            socket={socket}

          />
        ) : ( 
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#FEFBFF] via-white to-[#F3E8FF] relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#F3E8FF]/30 to-[#EDE9FE]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#DDD6FE]/30 to-[#F3E8FF]/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#EDE9FE]/10 to-[#F3E8FF]/10 rounded-full blur-3xl" />
            </div>

            <div className="text-center relative z-10 max-w-md mx-auto px-6">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-[#F3E8FF] via-[#EDE9FE] to-[#DDD6FE] rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl animate-pulse">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-4xl">💬</span>
                  </div>
                </div>
                
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#EC4899] to-[#F97316] rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }} />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 -right-4 w-3 h-3 bg-gradient-to-br from-[#A855F7] to-[#EC4899] rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1.5s' }} />
              </div>

              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
                Welcome to Chatter
              </h2>
              
              <p className="text-[#8B5CF6] text-lg mb-6 font-medium leading-relaxed">
                Select a conversation to start messaging, or discover new connections in your chat list.
              </p>

              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#E8E0F5]">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-lg">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Secure Messaging</h3>
                    <p className="text-sm text-[#8B5CF6]">End-to-end encrypted conversations</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#E8E0F5]">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#EC4899] to-[#F97316] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-lg">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Real-time Updates</h3>
                    <p className="text-sm text-[#8B5CF6]">Instant message delivery</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#E8E0F5]">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#A855F7] to-[#7C3AED] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-lg">🌸</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Beautiful Design</h3>
                    <p className="text-sm text-[#8B5CF6]">Elegant and intuitive interface</p>
                  </div>
                </div>
              </div>

              {/* Subtle call to action */}
              <div className="mt-8 p-4 bg-gradient-to-r from-[#F3E8FF]/50 to-[#EDE9FE]/50 rounded-2xl border border-[#E8E0F5]">
                <p className="text-sm text-[#7C3AED] font-medium">
                  💡 Tip: Click on any conversation in the sidebar to start chatting
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatsMain
