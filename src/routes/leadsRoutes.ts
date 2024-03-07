import { Router } from "express";
import { LeadsController } from "../controllers/LeadsController";
import { basicAuthMiddleware } from "../middlewares/validaToken";

const leadsRoutes = Router()

const Leads = new LeadsController()

leadsRoutes.post("/leads", basicAuthMiddleware, Leads.create)
leadsRoutes.get("/leads", Leads.get)

export { leadsRoutes }