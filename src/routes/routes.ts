import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { startupRoutes } from "./startupRoutes";
import { peopleRoutes } from "./peopleRoutes";


const router = Router()


router.use(userRoutes)
router.use(startupRoutes)
router.use(peopleRoutes)

        
export { router }