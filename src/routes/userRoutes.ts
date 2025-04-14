import { Router } from "express";
import { UserController } from "../controllers/UserController";
//import { checkToken } from "../middlewares/validaToken";

const userRoutes = Router()
const userController = new UserController()

userRoutes.post("/autenticar-usuario", userController.AutenticarUsuario)
userRoutes.post("/registrar-empreendedor", userController.RegistrarContaEmpreendedor)
userRoutes.post("/registrar-investidor", userController.RegistrarContaInvestidor)
userRoutes.get("/listar-usuario/:usuarioId", userController.ListarUsuarioPeloId)

export { userRoutes }