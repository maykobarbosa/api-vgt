import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { StartUpController } from "../controllers/StartUpContoller";
import { startupRoutes } from "./startupRoutes";

const router = Router()


router.use(userRoutes)
router.use(startupRoutes)

        
export { router }