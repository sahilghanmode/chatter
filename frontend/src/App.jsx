import './App.css'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Auth from './pages/auth/Auth'
import Verify from './pages/verifyOtp/Verify'
import ChatsMain from './pages/Chats/ChatsMain'
import {io} from "socket.io-client"

function App() {

  const socket=io(import.meta.env.VITE_API_ENDPOINT)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth/>} />
        <Route path='/verify/:userEmail' element={<Verify/>}/>
        <Route path='/chats' element={<ChatsMain/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
