"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partnerRoutes = void 0;
var express_1 = require("express");
var PartnerController_1 = require("../controllers/PartnerController");
var partnerRoutes = (0, express_1.Router)();
exports.partnerRoutes = partnerRoutes;
var Partner = new PartnerController_1.PartnerController();
partnerRoutes.post("/partner/register", Partner.create);
partnerRoutes.get("/partner/search-by-company/:companyId", Partner.searchByCompany);
partnerRoutes.delete("/partner/delete/:id", Partner.delete);
//# sourceMappingURL=partnerRoutes.js.map