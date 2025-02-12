import express from 'express'
import { getMe, login, logout, profile, signin } from '../controller/authController.js'
import protectRoute from '../middleware/protectRoute.js'

const authRouter = express.Router()

authRouter.post("/signin", signin)
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/me", protectRoute, getMe)

authRouter.put("/update-profile", protectRoute, profile)

export default authRouter