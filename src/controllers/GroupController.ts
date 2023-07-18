import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class GroupController {
    async create(request: Request, response: Response){
        const { 
            authorId,            
            companyId,
            memberId,
            status 
         } = request.body
        const valida = await prismaClient.companies.findMany({                
            where: { 
                AND: [
                    {
                        ownerId: {
                            equals: authorId
                        }
                    },
                    {
                        id:{
                            equals: companyId
                        }
                    }
                ]
            }
        })
        if(valida.length == 0){
            throw new Error("Empresa não encontrada, ou você não tem acesso!")
        }
        const validaGroup = await prismaClient.group.findMany({                
            where: { 
                AND: [
                    {
                        memberId
                    },
                    {
                        companyId
                    }
                ]
            }
        })
        if(validaGroup.length != 0){
            throw new Error("O membro já possui acesso à empresa!")
        }
        const result = await prismaClient.group.create({
            data: {
                authorId,
                viewedNotification: false,
                companyId,
                memberId,
                status 
            }
        })
        return response.json(result);
    }
    
    async delete(request: Request, response: Response){
        let { id, userId } = request.params
        const group = await prismaClient.group.findMany({   
            where: {
                AND: [
                    { 
                        id
                    },
                    {
                        authorId: {
                            equals: userId
                        }
                    }

                ]
               
            },   
        })
        if (group.length == 0) {
            throw new Error("Você não tem acesso!")
        }
        await prismaClient.group.delete({
            where: {
                id
            }            
        })        
        return response.json();            
    }

    async update(request: Request, response: Response){
        const { 
            id,
            memberId,
            status,
            viewedNotification
         } = request.body
        const group = await prismaClient.group.findMany({   
            where: {
                AND: [
                    { 
                        id
                    },
                    {
                        memberId
                    }
                ]
               
            },   
        })        
        if (group.length == 0) {
            throw new Error("Você não tem acesso!")
        }
        
        const result = await prismaClient.group.update({
            where: {
                id
            },
            data: {
                status,
                viewedNotification  
            }
        })   
        return response.json(result);           
    }

    async findPending(request: Request, response: Response){
        const { 
            memberId
         } = request.params
        const group = await prismaClient.group.findMany({   
            where: {
                AND: [
                    { 
                        memberId
                    },
                    {
                        status:"PENDENTE"
                    }
                ]
               
            },   
        })        
        
        return response.json(group);           
    }

    async findAnswered(request: Request, response: Response){
        const { 
            authorId
         } = request.params
        const group = await prismaClient.group.findMany({   
            where: {
                AND: [
                    { 
                        authorId
                    },
                    {
                        status:{
                            not: "PENDENTE"
                        }
                    },
                    {
                        viewedNotification: false
                    }
                ]
               
            },   
        })        
        
        return response.json(group);           
    }
}