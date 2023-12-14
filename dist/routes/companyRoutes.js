"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRoutes = void 0;
var express_1 = require("express");
var CompanyController_1 = require("../controllers/CompanyController");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../config/upload"));
var companyRoutes = (0, express_1.Router)();
exports.companyRoutes = companyRoutes;
var Company = new CompanyController_1.CompanyController();
var uploadAvatar = (0, multer_1.default)(upload_1.default.upload("./public/img/company"));
companyRoutes.post("/company/register", uploadAvatar.single("file"), function (request, response) { return Company.create(request, response); });
companyRoutes.get("/company/search-by-id/:id/:userId", Company.searchOne);
companyRoutes.get("/company/search-by-id/:id", Company.byId);
companyRoutes.get("/company/search-by-status/:status/:pag/:userId", Company.searchAll);
companyRoutes.get("/company/total/:userId", Company.total);
companyRoutes.put("/company/update", Company.update);
companyRoutes.put("/company/update-avatar", uploadAvatar.single("file"), function (request, response) { return Company.updateAvatar(request, response); });
companyRoutes.delete("/company/delete/:id/:userId", Company.delete);
///investidor
companyRoutes.get("/company/:pag", Company.list);
///admin
companyRoutes.get("/company-by-status/:status/:pag", Company.listByStatus);
companyRoutes.put("/company/valid", Company.validCompany);
//# sourceMappingURL=companyRoutes.js.map