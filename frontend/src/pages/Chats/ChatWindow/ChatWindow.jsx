import React from 'react'
import { useEffect } from 'react'
import { axiosInstance } from '../../../utils/axios.js'
import { useState } from 'react'
import Message from './Message.jsx'
import {useSelector} from "react-redux"
import { selectUser } from '../../../../utils/userSlice.js'
import Header from './Header.jsx'
import MessageInput from './MessageInput.jsx'

const ChatWindow = ({chat}) => {


    const user=useSelector(selectUser)
    const [messages,setMessages]=useState([])
    useEffect(()=>{
        const getConversation=async()=>{
            const conversationId=chat._id
            const res=await axiosInstance.get(`/chats/getConversation/${conversationId}`)
            if(res.data.success){
                setMessages(res.data.messages)
            }
        }
        getConversation()
    },[chat])

    const onSendMessage=()=>{
      console.log("object")
    }


  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#FEFBFF] via-white to-[#F8F4FF]">
      <Header user={chat.user} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => {
          const isOwn = message.sender._id === user._id;
        //   const showAvatar = !isOwn && (
        //     index === 0 || 
        //     chat.messages[index - 1].senderId !== message.senderId
        //   );
          
          return (
            <Message
              key={message._id}
              message={message}
              isOwn={isOwn}
            //   showAvatar={showAvatar}
            />
          );
        })}
        {/* {chat.isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-[#E8E0F5] rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )} */}
        {/* <div ref={messagesEndRef} /> */}
      </div>

      <MessageInput onSendMessage={onSendMessage} /> 
    </div>
  )
}

export default ChatWindow
