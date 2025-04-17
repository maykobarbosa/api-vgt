import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController";
import multer from "multer";
import uploadConfig from "../config/upload";
import { checkToken } from "../middlewares/validaToken";

const profileRoutes = Router()

const profileController = new ProfileController()
const uploadAvatar = multer(uploadConfig.upload("./public/img/users"))

profileRoutes.put("/update-socials", checkToken, profileController.AtualizarRedesSociais)
profileRoutes.put("/update-avatar", checkToken, uploadAvatar.single("avatar"), profileController.AtualizarAvatar)
profileRoutes.put("/update-bio", checkToken, profileController.AtualizarBiografia)
profileRoutes.put("/update-location", checkToken, profileController.AtualizarLocalizacao)
profileRoutes.put("/update-phone", checkToken, profileController.AtualizarTelefone)
profileRoutes.put("/update-name", checkToken, profileController.AtualizarNome)
profileRoutes.put("/update-email", checkToken, profileController.AtualizarEmail)

export { profileRoutes }