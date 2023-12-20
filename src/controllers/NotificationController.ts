import { prismaClient } from "../database/prismaClient";

export class NotificationController{
    async create(
        userId: string,
        message: string,
        link?: string
    ){
         await prismaClient.notifications.create({
            data:{
                userId,
                message,
                link,
                viewed: false
            }
         })
    }
}