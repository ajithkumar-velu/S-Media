import express from 'express'
import dotenv from 'dotenv'
import connectDB from './lib/db.js'
import authRouter from './router/authRouter.js'
import cookieParser from 'cookie-parser'
import userRouter from './router/userRouter.js'
import { v2 as cloudinary } from 'cloudinary'
import postRoute from './router/postRoute.js'
import notificationRoute from './router/notificationRoute.js'
import cors from 'cors'
dotenv.config()

const PORT = process.env.PORT 
const app = express()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded( {limit: "10mb", extends: true}))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/posts', postRoute)
app.use('/api/notifications', notificationRoute)

app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`);    
    connectDB()
})
