import {  Router } from "express";
import { UserController } from "../controllers/UserController";
import multer from "multer";

import uploadConfig from "../config/upload";
import { checkToken } from "../middlewares/validaToken";

const userRoutes = Router()


const User = new UserController() 

const uploadAvatar = multer(uploadConfig.upload("./public/img/people"))
//criar usuario
userRoutes.post("/user", 
    uploadAvatar.single("file"),
    (request,response) => User.create(request,response)
)
//procurando investimento
userRoutes.post("/user2", User.create2)
//investidor
userRoutes.post("/user3", User.create3)

//criar usuario após login google
userRoutes.post("/user-with-google", User.createWithGoogle)
//login User
userRoutes.post("/auth", User.authenticate)
// userRoutes.post("/auth2", User.authenticate2)
//refresh token
userRoutes.post("/refresh-token-auth", User.refreshToken)
//filtro Users
// userRoutes.post("/users/consulta", User.consulta)
//verifica se existe
userRoutes.get("/users/verifica/:email", User.existed)
//Busca user
userRoutes.get("/users/consulta/:id", User.consultaOne)
//listart Users
userRoutes.get("/users/:pag", User.list)
userRoutes.get("/users/search-by-status/:pag", User.findByStatus)
//qtd de Users
userRoutes.get("/users-count", User.totalUsers)

//atualiza users
userRoutes.put("/users", User.update)
userRoutes.put("/users/update-avatar/", 
    uploadAvatar.single("file"),
    (request,response) => User.updateAvatar(request,response)
)
//delete users
userRoutes.delete("/users/:email", User.delete)

//Recuperar senha
userRoutes.post('/recover-password', User.sendMailRecover)

userRoutes.post('/create-password', User.updatePassword)

userRoutes.put("/user/update/phone", checkToken, User.updatePhone)

userRoutes.put("/valid-user", User.validUser)
userRoutes.get("/users/by-status-investor/:status/:pag/:search", User.findByStatusInvestor)



export { userRoutes }