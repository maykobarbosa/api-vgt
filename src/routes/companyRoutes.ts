import { Router } from "express";
import { CompanyController } from "../controllers/CompanyController";
import multer from "multer";
import uploadConfig from "../config/upload";
import { checkToken } from "../middlewares/validaToken";
const companyRoutes = Router()

const companyController = new CompanyController()

const uploadAvatar = multer(uploadConfig.upload("./public/img/company"))

companyRoutes.post("/create-company", checkToken,
    uploadAvatar.single("logotipo"),
    companyController.CriarNovaEmpresa)

companyRoutes.put("/upload-documents", checkToken,
    uploadAvatar.fields([
        { name: "imposto", maxCount: 1 },
        { name: "ytd", maxCount: 1 },
        { name: "despesas", maxCount: 1 },
        { name: "dividas", maxCount: 1 },
        { name: "receitas", maxCount: 1 },
        { name: "contratos_firmados", maxCount: 1 },
        { name: "contratos_pendentes", maxCount: 1 }
    ]),
    companyController.AnexarDocumentosEmpresa)

companyRoutes.get("/list-companies/:donoId", checkToken,
    companyController.ListarEmpresasPeloUsuarioId)

companyRoutes.get("/list-companies-approved", checkToken,
    companyController.ListarEmpresasAprovadas)

companyRoutes.get("/list-company-by-id/:empresaId", checkToken,
    companyController.ListarEmpresaPorId)

companyRoutes.get("/list-all-companies", checkToken,
    companyController.ListarTodasAsEmpresas)

companyRoutes.put("/update-company-status", checkToken,
    companyController.AtualizarStatusEmpresa)

export { companyRoutes }