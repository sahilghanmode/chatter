import React from 'react'

const Message = ({message,isOwn}) => {

  console.log(message)

    const formatTime = (input, locale = 'en-IN') => {
        const date = new Date(input);

        if (isNaN(date.getTime())) return 'Invalid time';

        return date.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };


  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
            isOwn
              ? 'bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] text-white rounded-br-md'
              : 'bg-white border border-[#E8E0F5] text-gray-800 rounded-bl-md hover:border-[#D8B4FE]'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <div className={`flex items-center justify-end mt-2 space-x-1 ${
            isOwn ? 'text-white/80' : 'text-[#8B5CF6]'
          }`}>
            <span className="text-xs font-medium">
              {formatTime(message.timestamp)}
            </span>
            {/* {isOwn && (
              <div className="flex items-center">
                {message.isRead ? (
                  <CheckCheck className="w-3 h-3 text-[#FDE68A]" />
                ) : (
                  <Check className="w-3 h-3" />
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
