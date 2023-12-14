"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.releasesRoutes = void 0;
var express_1 = require("express");
var ReleasesController_1 = require("../controllers/ReleasesController");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../config/upload"));
var uploadFile = (0, multer_1.default)(upload_1.default.upload("./public/file/releases"));
var releasesRoutes = (0, express_1.Router)();
exports.releasesRoutes = releasesRoutes;
var Releases = new ReleasesController_1.ReleasesController();
releasesRoutes.post("/releases/register", uploadFile.single('file'), Releases.create);
releasesRoutes.get("/releases/search-by-month-and-year/", Releases.searchMonthYear);
releasesRoutes.get("/releases/search-by-year/:year/:companyId", Releases.searchYear);
releasesRoutes.put("/releases/update", Releases.update);
releasesRoutes.delete("/releases/delete/:id", Releases.delete);
//# sourceMappingURL=releasesRoutes.js.map