import { Router } from "express";
import { NegotiationController } from "../controllers/NegotiationController";
import { checkToken } from "../middlewares/validaToken";

const negotiationRoutes = Router()
const negotiationController = new NegotiationController()

negotiationRoutes.post("/create-proposal", checkToken, negotiationController.CriarProposta)
negotiationRoutes.get("/list-proposals/:usuarioId", checkToken, negotiationController.ListarPropostasPorUsuario)
negotiationRoutes.get("/list-proposals-by-company/:usuarioId", checkToken, negotiationController.ListarPropostasPorEmpresa)
negotiationRoutes.get("/list-proposal-by-id/:propostaId", checkToken, negotiationController.ListarPropostaPorId)
negotiationRoutes.get("/list-messages/:propostaId", checkToken, negotiationController.ListarMensagens)
negotiationRoutes.post("/send-message-to-entrepreneur", checkToken, negotiationController.CriarMensagem)

export { negotiationRoutes }