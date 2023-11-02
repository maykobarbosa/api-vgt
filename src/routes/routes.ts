import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { startupRoutes } from "./startupRoutes";
import { peopleRoutes } from "./peopleRoutes";
import { companyRoutes } from "./companyRoutes";
import { releasesRoutes } from "./releasesRoutes";
import { partnerRoutes } from "./partnerRoutes";
import { collaboratorRoutes } from "./collaboratorRoutes";
import { groupRoutes } from "./groupRoutes";
import { valuationRoutes } from "./valuationRoutes";
import { messageRoutes } from "./messageRoutes";


const router = Router()

router.use(userRoutes)
router.use(startupRoutes)
router.use(peopleRoutes)
router.use(companyRoutes)
router.use(releasesRoutes)
router.use(partnerRoutes)
router.use(collaboratorRoutes)
router.use(groupRoutes)
router.use(valuationRoutes)     
router.use(messageRoutes)  

export { router }