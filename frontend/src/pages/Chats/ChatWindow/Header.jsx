import { MoreVertical, Phone, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Header = ({user, socket}) => {

  const [isOnline, setIsOnline]=useState(false)
  useEffect(()=>{
    const userId=user._id
  
    const handleOnline=(userId)=>{
        console.log("woorking",userId)
        setIsOnline(true)
      
    }
    console.log(userId)
    socket.on("user-online",(userId)=>{
      handleOnline(userId)
    })
  },[])

  return (
    <div className='bg-gradient-to-r from-white via-[#FDF7FF] to-[#F8F4FF] border-b border-[#E8E0F5] px-4 py-3 shadow-sm backdrop-blur-sm'>
      <div className='flex item-center justify-between'>
        <div className='flex items-center space-x-3'>
            <div className='flex w-[1100px] space-x-2 '>
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-lg"
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                  isOnline == true ? 'bg-[#7C3AED]' : 
                  isOnline == false ? 'bg-[#F59E0B]' : 'bg-gray-400'
                }`} />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{user.name}</h2>
                <p className="text-xs text-[#8B5CF6]">
                  {isOnline === true ? 'Online' : 
                   isOnline === false ? 'Away' : 
                   user.lastSeen ? `Last seen ${user.lastSeen}` : 'Offline'}
                </p>
              </div>
            </div>

            <div className='flex item-center space-x-2'>
              <button className="p-2 rounded-full hover:bg-[#F3E8FF] transition-all duration-200 hover:scale-105">
                <Video className="w-5 h-5 text-[#7C3AED]" />
              </button>
              <button className="p-2 rounded-full hover:bg-[#F3E8FF] transition-all duration-200 hover:scale-105">
                <Phone className="w-5 h-5 text-[#7C3AED]" />
              </button>

              <button className="p-2 rounded-full hover:bg-[#F3E8FF] transition-all duration-200 hover:scale-105">
                <MoreVertical className="w-5 h-5 text-[#7C3AED]" />
                </button>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Header
