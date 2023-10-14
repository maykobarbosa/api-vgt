import {  Router } from "express";
import { CompanyControllerMBL } from "../controllers/CompanyControllerMBL";

import { checkToken } from "../middlewares/validaToken";

const companyRoutesMBL = Router()


const Company = new CompanyControllerMBL() 

companyRoutesMBL.post("/mbl/company/auth", Company.authenticate)
companyRoutesMBL.post("/mbl/company/register", Company.create)
companyRoutesMBL.get("/mbl/company/search-by-status/:pag/:status",checkToken, Company.findByStatus)

export { companyRoutesMBL }