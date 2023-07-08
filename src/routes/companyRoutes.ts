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
companyRoutes.get("/company/search-by-id/:id", Company.searchOne)
companyRoutes.get("/company/search-by-name/:name/:pag", Company.searchAll)
companyRoutes.get("/company/total", Company.total)
companyRoutes.put("/company/update", Company.update)
companyRoutes.put("/company/update-avatar/:id", 
    uploadAvatar.single("file"), 
    (request, response) =>Company.updateAvatar(request, response)
)
companyRoutes.delete("/company/delete/:id", Company.delete)


export { companyRoutes }