"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collaboratorRoutes = void 0;
var express_1 = require("express");
var CollaboratorController_1 = require("../controllers/CollaboratorController");
var collaboratorRoutes = (0, express_1.Router)();
exports.collaboratorRoutes = collaboratorRoutes;
var Collaborator = new CollaboratorController_1.CollaboratorController();
collaboratorRoutes.post("/collaborator/register", Collaborator.create);
collaboratorRoutes.get("/collaborator/search-by-company/:companyId", Collaborator.searchByCompany);
collaboratorRoutes.delete("/collaborator/delete/:id", Collaborator.delete);
//# sourceMappingURL=collaboratorRoutes.js.map