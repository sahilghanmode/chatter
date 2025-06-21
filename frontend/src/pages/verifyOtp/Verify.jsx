import { Shield, ArrowLeft, RefreshCw } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import { verify } from '../../../apis/authApi'

const Verify = () => {
    const { userEmail } = useParams()
    const navigate = useNavigate()

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [timeLeft, setTimeLeft] = useState(300)
    const inputRefs = useRef([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        setError("")

        if (value && index < 5) {
            setTimeout(() => {
                const nextInput = inputRefs.current[index + 1];
                if (nextInput) {
                    nextInput.focus();
                    nextInput.select();
                }
            }, 50);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        // Redirect if no pending user
        if (!userEmail) {
            navigate('/auth');
            return;
        }

        // Timer countdown
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [userEmail, navigate]);

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").slice(0, 6)
        const newOtp = [...otp]

        for (let i = 0; i < pastedData.length && i < 6; i++) {
            if (/^\d$/.test(pastedData[i])) {
                newOtp[i] = pastedData[i]
            }
        }

        setOtp(newOtp)
        setError("")

        const nextEmptyIndex = newOtp.findIndex((digit) => digit === "")
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
        inputRefs.current[focusIndex]?.focus()
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        setError("")
        const code=otp.join('')

        if (code.length !== 6) {
            setError('Please enter all 6 digits of the verification code.');
            return;
        }
        try {
            const verifyRes=await verify(code,userEmail)
            if(verifyRes.success){
                toast.success(verifyRes.message)

            }else{
                toast.error(verifyRes.error)
            }
        } catch (error) {
            console.log("error during verifying otp",{otp})
            setError("An unexpected error occurred. Please try again.");
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#FEFBFF] via-white to-[#F3E8FF] flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <div className="flex items-center mb-8">
                        <button
                            onClick={() => navigate('/auth')}
                            className="p-2 rounded-full hover:bg-[#F3E8FF] transition-all duration-200 mr-4"
                        >
                            <ArrowLeft className="w-6 h-6 text-[#7C3AED]" />
                        </button>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
                            Verify Your Email
                        </h1>
                    </div>

                    <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#E8E0F5] p-8'>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                Check Your Email
                            </h2>
                            <p className="text-[#8B5CF6] text-sm">
                                We've sent a 6-digit verification code to<br />
                                <span className="font-semibold">{userEmail}</span>
                            </p>
                        </div>

                        <div className="flex justify-center space-x-3 mb-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl font-bold bg-white border-2 border-[#E8E0F5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] transition-all shadow-sm hover:shadow-md"
                                    disabled={isLoading}
                                />
                            ))}
                        </div>

                        <div className="text-center mb-4">
                            <p className="text-[#8B5CF6] text-sm">
                                {timeLeft > 0 ? (
                                    <>Time remaining: <span className="font-bold text-[#7C3AED]">{formatTime(timeLeft)}</span></>
                                ) : (
                                    <span className="text-red-500 font-medium">Verification code expired</span>
                                )}
                            </p>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || otp.some(digit => digit === '') || timeLeft === 0}
                            className="w-full py-4 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-semibold rounded-2xl hover:from-[#6D28D9] hover:to-[#DB2777] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 mb-4"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Verifying...</span>
                                </div>
                            ) : (
                                'Verify Email'
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                // onClick={handleResendOTP}
                                disabled={timeLeft > 0}
                                className="text-[#8B5CF6] hover:text-[#7C3AED] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Resend Code</span>
                            </button>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default Verify
