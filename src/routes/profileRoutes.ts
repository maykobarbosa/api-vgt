import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController";
import multer from "multer";
import uploadConfig from "../config/upload";
import { checkToken } from "../middlewares/validaToken";

const profileRoutes = Router()

const profileController = new ProfileController()
const uploadAvatar = multer(uploadConfig.upload("./public/img/users"))

profileRoutes.put("/update-socials", profileController.AtualizarRedesSociais)
profileRoutes.put("/update-avatar", uploadAvatar.single("avatar"), profileController.AtualizarAvatar)
profileRoutes.put("/update-bio", profileController.AtualizarBiografia)
profileRoutes.put("/update-location", profileController.AtualizarLocalizacao)
profileRoutes.put("/update-phone", profileController.AtualizarTelefone)
profileRoutes.put("/update-name", profileController.AtualizarNome)
profileRoutes.put("/update-email", profileController.AtualizarEmail)

export { profileRoutes }