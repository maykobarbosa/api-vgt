import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { companyRoutes } from "./companyRoutes";
import { profileRoutes } from "./profileRoutes";
import { negotiationRoutes } from "./NegotiationRoutes";


const router = Router()

router.use(userRoutes)
router.use(companyRoutes)
router.use(profileRoutes)
router.use(negotiationRoutes)

export { router }