import { axiosInstance } from "../src/utils/axios.js"

export const login=async()=>{

}

export const signup = async (formData) => {
  const { name, email, password } = formData;

  try {
    const signupRes = await axiosInstance.post('/auth/signup', { name, email, password });

    if (!signupRes.data.success) {
      return { error: signupRes.data.message };
    }

    const otpRes = await axiosInstance.post('/auth/send-otp', { email });

    if (!otpRes.data.success) {
      return { error: otpRes.data.message };
    }

    return { success: true, message: "Signup and OTP sent successfully" };

  } catch (error) {
    console.error("Error in signup API call:", error);

    const message = error.response?.data?.message || "Something went wrong. Please try again.";
    return { error: message };
  }
};

export const verify=async(code,userEmail)=>{
  try {
    const res=await axiosInstance.post('/auth/verify',{otp:code,email:userEmail})
    if(!res.data.success){
      return {error: res.data.message}
    }
    return {success:true, message:res.data.message}
    
  } catch (error) {
    console.log("error in verify api calling function",{error})
    const message=error.response?.data?.message || "Something went wrong"
    return {error:message}
  }
}

