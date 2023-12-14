"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.peopleRoutes = void 0;
var express_1 = require("express");
var PeopleController_1 = require("../controllers/PeopleController");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../config/upload"));
var peopleRoutes = (0, express_1.Router)();
exports.peopleRoutes = peopleRoutes;
var People = new PeopleController_1.PeopleController();
var uploadAvatar = (0, multer_1.default)(upload_1.default.upload("./public/img/people"));
peopleRoutes.post("/people/register", uploadAvatar.single("file"), function (request, response) { return People.create(request, response); });
peopleRoutes.get("/people/search-by-id/:id", People.searchOne);
peopleRoutes.post("/people/search-by-name/", People.searchAll);
peopleRoutes.get("/people/total", People.total);
peopleRoutes.put("/people/update", People.update);
peopleRoutes.put("/people/update-avatar/", uploadAvatar.single("file"), function (request, response) { return People.updateAvatar(request, response); });
peopleRoutes.delete("/people/delete/:id", People.delete);
//# sourceMappingURL=peopleRoutes.js.map