import {  Router } from "express";
import { ValuationController } from "../controllers/ValuationController";
import multer from "multer";
import uploadConfig from "../config/upload";

const uploadFile = multer(uploadConfig.upload("./public/file/valuation"))
const valuationRoutes = Router()
const Valuation = new ValuationController() 

valuationRoutes.post("/valuation/register", uploadFile.single('file'), Valuation.create)
valuationRoutes.get("/valuation/list/:companyId/:pag", Valuation.list)
valuationRoutes.delete("/valuation/delete/:id", Valuation.delete)

export { valuationRoutes }