"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = void 0;
var express_1 = require("express");
var MessageContoller_1 = require("../controllers/MessageContoller");
var validaToken_1 = require("../middlewares/validaToken");
var messageRoutes = (0, express_1.Router)();
exports.messageRoutes = messageRoutes;
var message = new MessageContoller_1.MessageController();
messageRoutes.post("/message/sendText", validaToken_1.checkToken, message.sendText);
//# sourceMappingURL=messageRoutes.js.map