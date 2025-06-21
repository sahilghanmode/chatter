import {Video, Phone, Search, LogOut, MoreVertical} from "lucide-react"

const Header = () => {
  return (
    <div className='bg-gradient-to-r from-white via-[#FDF7FF] to-[#F8F4FF] border-b border-[#E8E0F5] px-4 py-3 shadow-sm backdrop-blur-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
              { 'Messages'}
            </h1>
        </div>

        <div className='flex items-center space-x-2'>
            <button 
            //   onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-50 transition-all duration-200 hover:scale-105"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5 text-red-500" />
            </button>

            <button className="p-2 rounded-full hover:bg-[#F3E8FF] transition-all duration-200 hover:scale-105">
                <MoreVertical className="w-5 h-5 text-[#7C3AED]" />
            </button>
        </div>
      </div>
    </div>
  )
}

export default Header
