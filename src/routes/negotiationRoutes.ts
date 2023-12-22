import { Router } from "express";
import { NegotiationController } from "../controllers/NegotiationController";

const negotiationRoutes = Router()


const negotiation = new NegotiationController()
negotiationRoutes.post("/business-proposal", negotiation.initial)
negotiationRoutes.get("/business-proposal/:id", negotiation.getById)
negotiationRoutes.get("/business-proposal/by-client/:id/:status/:pag", negotiation.getByClient)
negotiationRoutes.get("/business-proposal/by-investor/:id/:status/:pag", negotiation.getByInvestor)


negotiationRoutes.post("/business-proposal/report", negotiation.report)

export { negotiationRoutes }