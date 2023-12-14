"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../config/upload"));
var validaToken_1 = require("../middlewares/validaToken");
var userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
var User = new UserController_1.UserController();
var uploadAvatar = (0, multer_1.default)(upload_1.default.upload("./public/img/people"));
//criar usuario
userRoutes.post("/user", uploadAvatar.single("file"), function (request, response) { return User.create(request, response); });
//procurando investimento
userRoutes.post("/user2", User.create2);
//investidor
userRoutes.post("/user3", User.create3);
//criar usuario após login google
userRoutes.post("/user-with-google", User.createWithGoogle);
//login User
userRoutes.post("/auth", User.authenticate);
// userRoutes.post("/auth2", User.authenticate2)
//refresh token
userRoutes.post("/refresh-token-auth", User.refreshToken);
//filtro Users
// userRoutes.post("/users/consulta", User.consulta)
//verifica se existe
userRoutes.get("/users/verifica/:email", User.existed);
//Busca user
userRoutes.get("/users/consulta/:id", User.consultaOne);
//listart Users
userRoutes.get("/users/:pag", User.list);
userRoutes.get("/users/search-by-status/:pag", User.findByStatus);
//qtd de Users
userRoutes.get("/users-count", User.totalUsers);
//atualiza users
userRoutes.put("/users", User.update);
userRoutes.put("/users/update-avatar/", uploadAvatar.single("file"), function (request, response) { return User.updateAvatar(request, response); });
//delete users
userRoutes.delete("/users/:email", User.delete);
//Recuperar senha
userRoutes.post('/recover-password', User.sendMailRecover);
userRoutes.post('/create-password', User.updatePassword);
userRoutes.put("/user/update/phone", validaToken_1.checkToken, User.updatePhone);
userRoutes.put("/valid-user", User.validUser);
userRoutes.get("/users/by-status-investor/:status/:pag", User.findByStatusInvestor);
//# sourceMappingURL=userRoutes.js.map