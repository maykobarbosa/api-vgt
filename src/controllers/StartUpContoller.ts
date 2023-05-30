import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";


export class StartUpController {
    async create(request: Request, response: Response){
        const { 
            companyName ,
            describe,
            sizeCompany,
            presentationLink,
            usefulLink,
            city,
            phone
         } = request.body
        await prismaClient.startUp.create({
            data: {
                companyName ,
                describe,
                sizeCompany,
                presentationLink,
                usefulLink,
                city,
                phone
            }
        })

        return response.json();
    }
    async all(request: Request, response: Response){
        let {pag} = request.params  
        
        const result = await prismaClient.startUp.findMany({            
            skip: Number(pag),
            take: 10,
            orderBy: {
                date_create: 'desc'
            }            
        })
       
        return response.json(result);
    }
    async search(request: Request, response: Response){
        let {pag, search } = request.params  
        
        const result = await prismaClient.startUp.findMany({     
            where:{
                companyName: {
                    contains: search
                }              
            },       
            skip: Number(pag),
            take: 10,
            orderBy: {
                date_create: 'desc'
            }            
        })
       
        return response.json(result);
    }
   
    async count(request: Request, response: Response){       
        
        const result = await prismaClient.startUp.count()
       
        return response.json(result);
    }

    async delete(request: Request, response: Response){
        let { id } = request.params

        await prismaClient.startUp.delete({
            where: {
                id: id
            }
            
        })   
        return response.json();      
    }
}