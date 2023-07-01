import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";
import { deleteFile } from "../config/file";
import { Prisma } from "@prisma/client";

export class CompanyController {
    async create(request: Request, response: Response){
        const { 
            name      
         } = request.body
        const avatar: string = String(request.file?.filename)
        if(name) {
            const valida = await prismaClient.companies.findMany({                
                where: { 
                    name: {
                            equals: name
                        }
                    }
            })
            if(valida.length != 0){
                deleteFile(`./public/img/company/${avatar}`)
                throw Error("Já possui uma empresa cadastrada com este nome!")
            }
        }       
        const result = await prismaClient.companies.create({
            data: {
                avatar,
                name
            }
        })
        return response.json(result);
    }

    async searchOne(request: Request, response: Response){  
        let {id} = request.params  
        const companies = await prismaClient.companies.findMany({   
            where: {
                id
            }
        })
        if (companies.length == 0) {
            throw new Error("Empresa não encontrada!")
        }
        const result = await prismaClient.companies.findUnique({
            where: { 
                id
            }
        })
        return response.json(result);  
    }

   
    async total(request: Request, response: Response){  
        const result = await prismaClient.companies.count()
        return response.json(result);              
    } 

    async searchAll(request: Request, response: Response){  
        let {pag, name} = request.body  
        if(name==""){
            var result = await prismaClient.companies.findMany({    
                include: {
                    realeases: {
                        orderBy: [
                            {
                                year: "desc",
                            },
                            {
                                month: "desc",
                            }
                        ],
                        take: 1 // Limita a consulta para trazer apenas o registro mais recente da TabelaB.
                    }
                },
                skip: Number(pag),
                take: 10,
                orderBy: {
                    date_create: 'desc'
                }            
            })
        }else{
            var result = await prismaClient.companies.findMany({    
                where:{
                    name: {
                        contains: name
                    }
                },   
                include: {
                    realeases: {
                        orderBy: [
                            {
                                year: "desc",
                            },
                            {
                                month: "desc",
                            }
                        ],
                        take: 1 // Limita a consulta para trazer apenas o registro mais recente da TabelaB.
                    }
                },     
                skip: Number(pag),
                take: 10,
                orderBy: {
                    date_create: 'desc'
                }            
            })
        }
        
        return response.json(result); 
    }

    async delete(request: Request, response: Response){
        let { id } = request.params
        const companies = await prismaClient.companies.findMany({   
            where: {
                id
            }
        })
        if (companies.length == 0) {
            throw new Error("Empresa não encontrada!")
        }
        await prismaClient.companies.delete({
            where: {
                id
            }            
        })        
        deleteFile(`./public/img/company/${companies[0].avatar}`)
        return response.json();            
    }


    async update(request: Request, response: Response){
        const { 
            id,
            name
        } = request.body
        const companies = await prismaClient.companies.findMany({   
            where: {
                id
            }
        })
        if (companies.length == 0) {
            throw new Error("Empresa não encontrada!")
        }
        if(name!=companies[0].name){
            const result = await prismaClient.companies.findMany({   
                where: {
                    name
                }
            })
            
            if (result.length > 0) {
                throw new Error("Já existe uma empresa cadastrada com o nome informado!")
            }
        }    
        const result = await prismaClient.companies.update({
            where: {
                id
            },
            data: {
                name
            }
        })   
        return response.json(result);           
    }
    async updateAvatar(request: Request, response: Response){
        const { 
            id
        } = request.params
        const avatar: string = String(request.file?.filename)
        const companies = await prismaClient.companies.findMany({   
            where: {
                id
            }
        })        
        if (companies.length == 0) {
            deleteFile(`./public/img/company/${avatar}`)
            throw new Error("Empresa não encontrada!")
        }     
                      
        const result = await prismaClient.companies.update({
            where: {
                id
            },
            data: {
                avatar
            }
        })       
        if(result)   
        deleteFile(`./public/img/company/${companies[0].avatar}`)          
        return response.json(result);           
    }
}