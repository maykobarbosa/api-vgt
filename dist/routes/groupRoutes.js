"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRoutes = void 0;
var express_1 = require("express");
var GroupController_1 = require("../controllers/GroupController");
var groupRoutes = (0, express_1.Router)();
exports.groupRoutes = groupRoutes;
var Group = new GroupController_1.GroupController();
//cadastrar membro no grupo
groupRoutes.post("/group/register", Group.create);
//retornar todos os convites pendentes para o convidado
groupRoutes.get("/group/find_pending/:memberId", Group.findPending);
//retornar todos os convites respondidos não visualizados
groupRoutes.get("/group/find_answered/:authorId", Group.findAnswered);
//remove membro do grupo
groupRoutes.delete("/group/delete/:id/:userId", Group.delete);
//atualizar o status e viewedNotification
groupRoutes.put("/group/update", Group.update);
//# sourceMappingURL=groupRoutes.js.map