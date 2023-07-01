import {  Router } from "express";
import { ReleasesController } from "../controllers/ReleasesController";

const releasesRoutes = Router()
const Releases = new ReleasesController() 

releasesRoutes.post("/releases/register", Releases.create)
releasesRoutes.get("/releases/search-by-month-and-year/", Releases.searchMonthYear)
releasesRoutes.get("/releases/search-by-year/", Releases.searchYear)
releasesRoutes.put("/releases/update", Releases.update)
releasesRoutes.delete("/releases/delete/:id", Releases.delete)

export { releasesRoutes }