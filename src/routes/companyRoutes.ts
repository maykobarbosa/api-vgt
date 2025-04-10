import { Router } from "express";
import { CompanyController } from "../controllers/CompanyController";
import multer from "multer";
import uploadConfig from "../config/upload";

const companyRoutes = Router()


const Company = new CompanyController()

const uploadAvatar = multer(uploadConfig.upload("./public/img/company"))

export { companyRoutes }