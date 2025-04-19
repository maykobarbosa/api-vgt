import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { checkToken } from "../middlewares/validaToken";

const userRoutes = Router()
const userController = new UserController()

userRoutes.post("/autenticar-usuario", userController.AutenticarUsuario)
userRoutes.post("/registrar-empreendedor", userController.RegistrarContaEmpreendedor)
userRoutes.post("/registrar-investidor", userController.RegistrarContaInvestidor)
userRoutes.get("/listar-usuario/:usuarioId", checkToken, userController.ListarUsuarioPeloId)
userRoutes.get("/listar-investidores", checkToken, userController.ListarInvestidores)
userRoutes.get("/listar-empreendedores", checkToken, userController.ListarEmpreendedores)
userRoutes.put("/atualizar-status-usuario", checkToken, userController.AtualizarStatusUsuario)
userRoutes.delete("/deletar-usuario/:usuarioId", checkToken, userController.DeletarUsuario)

export { userRoutes }