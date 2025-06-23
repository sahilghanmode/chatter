import React from 'react'
import Header from './Header'
import ChatList from './ChatList'

const SideBar = ({conversations,onChatSelect}) => {

  return (
    <div className="w-80 bg-gradient-to-b from-white via-[#FEFBFF] to-[#F8F4FF] border-r border-[#E8E0F5] shadow-lg flex flex-col h-full">
      <Header 
        title="Messages" 
        showSearch={true}
      />
      <ChatList
        conversations={conversations}
        // currentUserId={user.id}
        // activeChat={activeChat}
        onChatSelect={onChatSelect}
      /> 
    </div>
  )
}

export default SideBar
