import {  Router } from "express";
import { PartnerController } from "../controllers/PartnerController";

const partnerRoutes = Router()
const Partner = new PartnerController() 

partnerRoutes.post("/partner/register", Partner.create)
partnerRoutes.get("/partner/search-by-company/:companyId", Partner.searchByCompany)
partnerRoutes.delete("/partner/delete/:id", Partner.delete)

export { partnerRoutes }