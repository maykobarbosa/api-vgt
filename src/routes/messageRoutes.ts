import {  Router } from "express";
import { MessageController } from "../controllers/MessageContoller";
import { checkToken } from "../middlewares/validaToken";



const messageRoutes = Router()


const message = new MessageController() 

messageRoutes.post("/message/sendText", checkToken, message.sendText)


export { messageRoutes }