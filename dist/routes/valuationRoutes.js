"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valuationRoutes = void 0;
var express_1 = require("express");
var ValuationController_1 = require("../controllers/ValuationController");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../config/upload"));
var uploadFile = (0, multer_1.default)(upload_1.default.upload("./public/file/valuation"));
var valuationRoutes = (0, express_1.Router)();
exports.valuationRoutes = valuationRoutes;
var Valuation = new ValuationController_1.ValuationController();
valuationRoutes.post("/valuation/register", uploadFile.single('file'), Valuation.create);
valuationRoutes.get("/valuation/list/:companyId", Valuation.list);
valuationRoutes.get("/valuation/current/:companyId", Valuation.current);
valuationRoutes.delete("/valuation/delete/:id", Valuation.delete);
//# sourceMappingURL=valuationRoutes.js.map