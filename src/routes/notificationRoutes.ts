import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController";

const notificationRoutes = Router()

const notification = new NotificationController()
notificationRoutes.get("/notification/:userId", notification.find)
notificationRoutes.put("/notification/:id", notification.view)

export { notificationRoutes }