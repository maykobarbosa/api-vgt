import {  Router } from "express";
import { ReleasesController } from "../controllers/ReleasesController";
import multer from "multer";
import uploadConfig from "../config/upload";

const uploadFile = multer(uploadConfig.upload("./public/file/releases"))
const releasesRoutes = Router()
const Releases = new ReleasesController() 

releasesRoutes.post("/releases/register", uploadFile.single('file'), Releases.create)
releasesRoutes.get("/releases/search-by-month-and-year/", Releases.searchMonthYear)
releasesRoutes.get("/releases/search-by-year/:year/:companyId", Releases.searchYear)
releasesRoutes.put("/releases/update", Releases.update)
releasesRoutes.delete("/releases/delete/:id", Releases.delete)

export { releasesRoutes }