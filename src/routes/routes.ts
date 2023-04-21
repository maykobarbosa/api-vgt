import { Request, Response, Router } from "express";
import { userRoutes } from "./userRoutes";
import nodemailer from 'nodemailer';

const router = Router()

//User
router.use(userRoutes)




export { router }