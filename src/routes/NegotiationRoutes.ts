import { Router } from "express";
import { NegotiationController } from "../controllers/NegotiationController";
//import { checkToken } from "../middlewares/validaToken";

const negotiationRoutes = Router()
const negotiationController = new NegotiationController()

negotiationRoutes.post("/create-proposal", negotiationController.CriarProposta)
negotiationRoutes.get("/list-proposals/:usuarioId", negotiationController.ListarPropostasPorUsuario)
negotiationRoutes.get("/list-proposals-by-company/:companyId", negotiationController.ListarPropostasPorEmpresa)

export { negotiationRoutes }