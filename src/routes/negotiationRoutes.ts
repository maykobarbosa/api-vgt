import { Router } from "express";
import { NegotiationController } from "../controllers/NegotiationController";

const negotiationRoutes = Router()


const negotiation = new NegotiationController()
negotiationRoutes.post("/business-proposal", negotiation.initial)


export { negotiationRoutes }