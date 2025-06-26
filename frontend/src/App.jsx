import './App.css'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Auth from './pages/auth/Auth'
import Verify from './pages/verifyOtp/Verify'
import ChatsMain from './pages/Chats/ChatsMain'
import { useEffect, useState } from 'react'
import { axiosInstance } from './utils/axios.js'
import { useDispatch } from 'react-redux'
import { setUser } from '../utils/userSlice.js'
import { socket } from './utils/socket.js'

function App() {

  const dispatch=useDispatch()
  useEffect(() => {
    const getCurrentUser = async function () {
      try {
        const storedUser= sessionStorage.getItem("authToken")
        if(!storedUser){
          const { data } = await axiosInstance.get('/auth/getCurrentUser', { withCredentials: true, })
          if (data) {
            dispatch(setUser(data))
            socket.connect()
          }
          
        }

        if (storedUser) {
          const parsedUser=JSON.parse(storedUser)
            dispatch(setUser(parsedUser))
            socket.connect()
          }

      } catch (error) {
        console.log(error);
      }
    }

    getCurrentUser()
  }, []);


  useEffect(()=>{
    socket.on("connect",()=>{
      console.log("connected",socket.id)
    })

    return ()=>{
      socket.off("connect")
    }
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth/>} />
        <Route path='/verify/:userEmail' element={<Verify/>}/>
        <Route path='/chats' element={<ChatsMain socket={socket}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
