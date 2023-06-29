import {  Router } from "express";
import { PeopleController } from "../controllers/PeopleController";



const peopleRoutes = Router()


const People = new PeopleController() 

peopleRoutes.post("/people/register", People.create)
peopleRoutes.get("/people/search-by-id/:id", People.searchOne)
peopleRoutes.get("/people/search-by-name/:name/:pag", People.searchAll)
peopleRoutes.get("/people/total", People.total)
peopleRoutes.put("/people/update", People.update)
peopleRoutes.delete("/people/delete/:id", People.delete)


export { peopleRoutes }