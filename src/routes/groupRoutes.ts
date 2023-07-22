import {  Router } from "express";
import { GroupController } from "../controllers/GroupController";

const groupRoutes = Router()
const Group = new GroupController() 

//cadastrar membro no grupo
groupRoutes.post("/group/register", Group.create)
//retornar todos os convites pendentes para o convidado
groupRoutes.get("/group/find_pending/:memberId", Group.findPending)
//retornar todos os convites respondidos não visualizados
groupRoutes.get("/group/find_answered/:authorId", Group.findAnswered)
//remove membro do grupo
groupRoutes.delete("/group/delete/:id/:userId", Group.delete)
//atualizar o status e viewedNotification
groupRoutes.put("/group/update", Group.update)
export { groupRoutes }