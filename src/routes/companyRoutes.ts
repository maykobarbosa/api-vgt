import { Router } from "express";
import { CompanyController } from "../controllers/CompanyController";
import multer from "multer";
import uploadConfig from "../config/upload";

const companyRoutes = Router()

const companyController = new CompanyController()

const uploadAvatar = multer(uploadConfig.upload("./public/img/company"))

companyRoutes.post("/create-company",
    uploadAvatar.fields([
        { name: "logotipo", maxCount: 1 },
        { name: "imposto", maxCount: 1 },
        { name: "ytd", maxCount: 1 },
        { name: "despesas", maxCount: 1 },
        { name: "dividas", maxCount: 1 },
        { name: "receitas", maxCount: 1 },
        { name: "contratos", maxCount: 1 }
    ]),
    companyController.createCompany)

export { companyRoutes }