import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { deleteNotification, deleteNotifications, getNotifications } from '../controller/notificationsController.js'

const notificationRoute = express.Router()


notificationRoute.get('/', protectRoute, getNotifications)
notificationRoute.delete('/', protectRoute, deleteNotifications)
notificationRoute.delete('/:id', protectRoute, deleteNotification)

export default notificationRoute