import {  Router } from "express";
import { PeopleController } from "../controllers/PeopleController";
import multer from "multer";
import uploadConfig from "../config/upload";

const peopleRoutes = Router()

const People = new PeopleController() 

const uploadAvatar = multer(uploadConfig.upload("./public/img/people"))
peopleRoutes.post("/people/register", 
    uploadAvatar.single("file"),
    (request,response) => People.create(request,response)
)
peopleRoutes.get("/people/search-by-id/:id", People.searchOne)
peopleRoutes.post("/people/search-by-name/", People.searchAll)
peopleRoutes.get("/people/total", People.total)
peopleRoutes.put("/people/update", People.update)
peopleRoutes.put("/people/update-avatar/", 
    uploadAvatar.single("file"),
    (request,response) => People.updateAvatar(request,response)
)
peopleRoutes.delete("/people/delete/:id", People.delete)


export { peopleRoutes }