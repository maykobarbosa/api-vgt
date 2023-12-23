import { Request, Response } from "express";
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
    async find(request: Request, response: Response){
        const {userId} = request.params

        const result = await prismaClient.notifications.findMany({
            where: {
                AND: [
                    {
                        userId
                    },
                    {
                        viewed: {
                            equals: false
                        }
                    }
                ]
            }
        })

        return response.json(result)
    }

    async view(request: Request, response: Response){
        const {id} = request.params

        const result = await prismaClient.notifications.update({
            where: {
                id
            },
            data: {
                viewed: true
            }
        })

        return response.json(result)
    }
}