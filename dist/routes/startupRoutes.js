"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startupRoutes = void 0;
var express_1 = require("express");
var StartUpContoller_1 = require("../controllers/StartUpContoller");
var startupRoutes = (0, express_1.Router)();
exports.startupRoutes = startupRoutes;
var StartUp = new StartUpContoller_1.StartUpController();
startupRoutes.post("/create/startup", StartUp.create);
startupRoutes.get("/startup/:pag/:search", StartUp.search);
startupRoutes.get("/startup/:pag", StartUp.all);
startupRoutes.get("/startup-count", StartUp.count);
startupRoutes.delete("/startup/:id", StartUp.delete);
//# sourceMappingURL=startupRoutes.js.map