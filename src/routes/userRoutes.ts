import {  Router } from "express";
import { UserController } from "../controllers/UserController";


const userRoutes = Router()


const User = new UserController() 

//criar usuario
userRoutes.post("/user", User.create)
//login User
userRoutes.post("/auth", User.authenticate)
//refresh token
userRoutes.post("/refresh-token-auth", User.refreshToken)
//filtro Users
// userRoutes.post("/users/consulta", User.consulta)
//Busca user
userRoutes.get("/users/consulta/:id", User.consultaOne)
//listart Users
userRoutes.get("/users/:pag", User.list)
//qtd de Users
userRoutes.get("/users-count", User.totalUsers)

//atualiza users
userRoutes.put("/users", User.update)
//delete users
userRoutes.delete("/users/:email", User.delete)

//Recuperar senha
userRoutes.post('/recover-password', User.sendMailRecover)

userRoutes.post('/create-password', User.updatePassword)

export { userRoutes }