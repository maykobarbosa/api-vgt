import { Router } from "express";
import { DocsController } from "../controllers/DocsController";
import multer from "multer";
import uploadConfig from "../config/upload";

const docsRoutes = Router()

const Docs = new DocsController()
const uploadFile = multer(uploadConfig.upload("./public/file/company"))

docsRoutes.post("/docs/upload", uploadFile.single("file"), Docs.create)
docsRoutes.get("/docs/:companyId", Docs.get)
docsRoutes.delete("/docs/:id", Docs.delete)

export { docsRoutes }