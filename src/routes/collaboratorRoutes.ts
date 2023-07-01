import {  Router } from "express";
import { CollaboratorController } from "../controllers/CollaboratorController";

const collaboratorRoutes = Router()
const Collaborator = new CollaboratorController() 

collaboratorRoutes.post("/collaborator/register", Collaborator.create)
collaboratorRoutes.get("/collaborator/search-by-company/:companyId", Collaborator.searchByCompany)
collaboratorRoutes.delete("/collaborator/delete/:id", Collaborator.delete)

export { collaboratorRoutes }