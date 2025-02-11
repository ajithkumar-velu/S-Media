import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { followUnfollowUser, getSuggestedUsers, getUser, updateUser } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post('/profile/:username', protectRoute, getUser)
userRouter.post('/suggested', protectRoute, getSuggestedUsers)
userRouter.post('/follow/:id', protectRoute, followUnfollowUser)
userRouter.post('/update', protectRoute, updateUser)


export default userRouter