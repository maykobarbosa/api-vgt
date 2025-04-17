import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { checkToken } from "../middlewares/validaToken";

const userRoutes = Router()
const userController = new UserController()

userRoutes.post("/autenticar-usuario", checkToken, userController.AutenticarUsuario)
userRoutes.post("/registrar-empreendedor", checkToken, userController.RegistrarContaEmpreendedor)
userRoutes.post("/registrar-investidor", checkToken, userController.RegistrarContaInvestidor)
userRoutes.get("/listar-usuario/:usuarioId", checkToken, userController.ListarUsuarioPeloId)
userRoutes.get("/listar-investidores", checkToken, userController.ListarInvestidores)
userRoutes.get("/listar-empreendedores", checkToken, userController.ListarEmpreendedores)
userRoutes.put("/atualizar-status-usuario", checkToken, userController.AtualizarStatusUsuario)

export { userRoutes }