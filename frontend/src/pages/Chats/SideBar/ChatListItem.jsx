import React from 'react'

const ChatListItem = ({chat,onClick}) => {
  return (
    <div
    onClick={onClick}
      className={`flex items-center p-4 cursor-pointer transition-all duration-200 border-b border-[#F3E8FF] hover:scale-[1.02] ${
        // isActive 
        //   ? 'bg-gradient-to-r from-[#F3E8FF] via-[#EDE9FE] to-[#F3E8FF] border-l-4 border-l-[#7C3AED] shadow-md' 
        //   : 
          'hover:bg-gradient-to-r hover:from-[#FEFBFF] hover:to-[#F8F4FF] hover:shadow-sm'
      }`}
    >
      <div className="relative flex-shrink-0">
        <img
        //   src={otherUser.avatar}
          alt={chat.user.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
        />
        {/* <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
          otherUser.status === 'online' ? 'bg-[#7C3AED]' : 
          otherUser.status === 'away' ? 'bg-[#F59E0B]' : 'bg-gray-400'
        }`} /> */}
      </div>

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 truncate">
            {chat.user.name}
          </h3>
          {/* {chat.lastMessage && (
            <span className="text-xs text-[#8B5CF6] flex-shrink-0 font-medium">
              {formatTime(lastMessage.timestamp)}
            </span>
          )} */}
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 truncate flex-1">
            {/* {chat.isTyping ? (
              <span className="text-[#8B5CF6] italic font-medium">typing...</span>
            ) : lastMessage ? (
              lastMessage.content
            ) : (
              'Start a conversation'
            )} */}
            {chat.lastMessage}
          </p>
          {chat.unreadCount > 0 && (
            <span className="ml-2 bg-gradient-to-r from-[#EC4899] to-[#F97316] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 font-bold shadow-md">
              {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatListItem
