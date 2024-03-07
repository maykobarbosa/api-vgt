import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";


export class LeadsController{
    async create(request: Request, response: Response){
        const {
            company,
            email,
            valuation,
            type,
            date
        } = request.body

        try {
            const result = await prismaClient.leads.create({
                data: {
                    company,
                    email,
                    valuation,
                    type,
                    date
                }
            })
    
            return response.json(result)
        } catch (error) {
            console.log(error)
            throw Error("Erro")
        }      
        
    }

    async get(request:Request, response: Response){
        const {page} = request.query

        if(!page){
            throw Error("Informe a página")
        }
        
        const result = await prismaClient.leads.findMany({            
            skip: Number(page) * 20,
            take: 20,
            orderBy: { date_create: "desc" },
        })

        return response.json(result)
    }
}