import { Search } from 'lucide-react'
import React from 'react'
import ChatListItem from './ChatListItem'

const ChatList = ({conversations,onChatSelect}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-gradient-to-r from-white via-[#FDF7FF] to-[#F8F4FF] border-b border-[#E8E0F5]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8B5CF6]" />
          <input
            type="text"
            placeholder="Search conversations..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#E8E0F5] rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] transition-all placeholder-[#A78BFA] shadow-sm hover:shadow-md"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length == 0 ? (
          <div className="flex items-center justify-center h-32 text-[#8B5CF6]">
            <p className="font-medium">No conversations found</p>
          </div>
        ) : (
          conversations.map(chat => (
            <ChatListItem
              key={chat._id}
              chat={chat}
            //   currentUserId={currentUserId}
            //   isActive={activeChat === chat.id}
            onClick={() => onChatSelect(chat)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default ChatList
