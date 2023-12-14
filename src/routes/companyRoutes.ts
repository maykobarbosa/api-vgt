import {  Router } from "express";
import { CompanyController } from "../controllers/CompanyController";
import multer from "multer";
import uploadConfig from "../config/upload";

const companyRoutes = Router()


const Company = new CompanyController() 

const uploadAvatar = multer(uploadConfig.upload("./public/img/company"))

companyRoutes.post("/company/register", 
    uploadAvatar.single("file"),
    (request, response) => Company.create(request, response)            
)
companyRoutes.get("/company/search-by-id/:id/:userId", Company.searchOne)
companyRoutes.get("/company/search-by-id/:id", Company.byId)
companyRoutes.get("/company/search-by-status/:status/:pag/:userId", Company.searchAll)
companyRoutes.get("/company/total/:userId", Company.total)
companyRoutes.put("/company/update", Company.update)
companyRoutes.put("/company/update-avatar", 
    uploadAvatar.single("file"), 
    (request, response) =>Company.updateAvatar(request, response)
)
companyRoutes.delete("/company/delete/:id/:userId", Company.delete)


///investidor

companyRoutes.get("/company/:pag", Company.list)

///admin
companyRoutes.get("/company-by-status/:status/:pag", Company.listByStatus)
companyRoutes.put("/company/valid", Company.validCompany)

export { companyRoutes }