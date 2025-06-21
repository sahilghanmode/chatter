import { Eye, EyeOff, Lock, Mail, MessageCircle, User } from "lucide-react"
import { useState } from 'react'
import { signup } from '../../../apis/authApi.js'
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast"

const Auth = () => {

    const [isLogin, setIsLogin] = useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const [isLoading,setIsLoading]=useState(false)
    const [formData, setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [error,setError]=useState("")

    const navigate=useNavigate()

    const handleInputChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (isLogin) {
            } else {
            const signupRes = await signup(formData)

            if (signupRes.success) {
                toast.success(signupRes.message)
                navigate(`/verify/${formData.email}`)
            } else {
                toast.error(signupRes.error || "Signup failed. Please try again.");
            }
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className='min-h-screen bg-gradient-to-br from-[#FEFBFF] via-white to-[#F3E8FF] flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <div className='w-20 h-20 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl'>
                        <MessageCircle className='w-10 h-10 text-white' />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
                        Chatter
                    </h1>

                    <p className="text-[#8B5CF6] mt-2 font-medium">
                        {isLogin ? 'Welcome back' : 'Create your account'}
                    </p>
                </div>

                <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#E8E0F5] p-8 '>
                    <div className='flex  mb-6'>
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 px-4 rounded-full font-semibold transition-all duration-300 cursor-pointer ${isLogin
                                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-lg'
                                    : 'text-[#8B5CF6] hover:bg-[#F3E8FF]'
                                }`}
                        >
                            Sign In
                        </button>

                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 px-4 rounded-full font-semibold transition-all duration-300 cursor-pointer ${!isLogin
                                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-lg'
                                    : 'text-[#8B5CF6] hover:bg-[#F3E8FF]'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div>

                        <form onSubmit={handleSubmit}  className="space-y-4">
                            {!isLogin && (
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8B5CF6]" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        // value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-4 py-4 bg-white border border-[#E8E0F5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] transition-all placeholder-[#A78BFA] shadow-sm hover:shadow-md"
                                        required={!isLogin}
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8B5CF6]" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    // value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-[#E8E0F5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] transition-all placeholder-[#A78BFA] shadow-sm hover:shadow-md"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8B5CF6]" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter your password"
                                    // value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-12 py-4 bg-white border border-[#E8E0F5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] transition-all placeholder-[#A78BFA] shadow-sm hover:shadow-md"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B5CF6] hover:text-[#7C3AED] transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* {error && (
                                <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-red-600 text-sm font-medium">
                                    {error}
                                </div>
                            )} */}

                            <button
                                type="submit"
                                // disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-semibold rounded-2xl hover:from-[#6D28D9] hover:to-[#DB2777] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 cursor-pointer"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                                    </div>
                                ) : (
                                    isLogin ? 'Sign In' : 'Create Account'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
