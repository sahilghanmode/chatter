import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import authRoute from "./routes/authRoutes.js"
import cors from "cors"

dotenv.config()

const app=express()

app.use(cors({
    origin:process.env.VITE_ENDPOINT,
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)

app.listen(process.env.PORT,()=>{console.log(`port running on ${process.env.PORT}`)})

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('databse connected successfully')
}).catch((e)=>console.log("error connecting db",{e}))