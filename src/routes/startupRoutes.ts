import {  Router } from "express";
import { StartUpController } from "../controllers/StartUpContoller";



const startupRoutes = Router()


const StartUp = new StartUpController() 

startupRoutes.post("/create/startup", StartUp.create)
startupRoutes.get("/startup/:pag/:search", StartUp.search)
startupRoutes.get("/startup/:pag", StartUp.all)
startupRoutes.get("/startup-count", StartUp.count)
startupRoutes.delete("/startup/:id", StartUp.delete)


export { startupRoutes }