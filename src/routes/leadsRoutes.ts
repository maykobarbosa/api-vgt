import { Router } from "express";
import { LeadsController } from "../controllers/Leads";
import { basicAuthMiddleware } from "../middlewares/validaToken";

const leadsRoutes = Router()

const Leads = new LeadsController()

leadsRoutes.post("/leads", basicAuthMiddleware, Leads.create)
leadsRoutes.get("/docs/:companyId", Leads.get)

export { leadsRoutes }