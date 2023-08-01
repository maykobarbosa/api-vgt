import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class GroupController {
    async create(request: Request, response: Response){
        const { 
            authorId,            
            companyId,
            email
         } = request.body

         var user = await prismaClient.users.findUnique({
            where: {            
                id: authorId
            }            
        })
        if(!user){
            user = await prismaClient.users.findUnique({
                where: {
                    email: authorId
                }
            })
        }

        if(!user){            
            throw new Error("Usuário authenticado não foi cadastrado!")
        }
        const valida = await prismaClient.companies.findMany({                
            where: { 
                AND: [
                    {
                        ownerId: {
                            equals: user.id
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
        const validaUser = await prismaClient.users.findUnique({                
            where: { 
               email
            }
        })
        if(!validaUser){
            throw new Error("Não existe usuário com o e-mail informado!")
        }

        const validaGroup = await prismaClient.group.findMany({                
            where: { 
                AND: [
                    {
                        memberId: {
                            equals: validaUser.id
                        }
                    },
                    {
                        companyId
                    }
                ]
            }
        })
        if(validaGroup.length != 0){
            throw new Error("O membro já possui acesso à empresa ou um convite enviado!")
        }
        const result = await prismaClient.group.create({
            data: {
                authorId: user.id,
                viewedNotification: false,
                companyId,
                memberId: validaUser.id,
                status: "PENDENTE" 
            }
        })
        return response.json(result);
    }
    
    async delete(request: Request, response: Response){
        let { id, userId } = request.params
        
        var user = await prismaClient.users.findUnique({
            where: {            
                id: userId
            }            
        })
        if(!user){
            user = await prismaClient.users.findUnique({
                where: {
                    email: userId
                }
            })
        }

        if(!user){            
            throw new Error("Usuário authenticado não foi cadastrado!")
        }
        const group = await prismaClient.group.findMany({   
            where: {
                AND: [
                    { 
                        id
                    },
                    {
                        authorId: {
                            equals: user.id
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
            status,
            viewedNotification
         } = request.body
        const group = await prismaClient.group.findMany({   
            where: {
                id               
            },   
        })        
        if (group.length == 0) {
            throw new Error("ID inválido!")
        }
        
        const result = await prismaClient.group.update({
            where: {
                id
            },
            data: {
                status,
                viewedNotification,
            }
        })   
        return response.json(result);           
    }

    async findPending(request: Request, response: Response){
        const { 
            memberId
         } = request.params
        var user = await prismaClient.users.findUnique({
            where: {            
                id: memberId
            }            
        })
        if(!user){
            user = await prismaClient.users.findUnique({
                where: {
                    email: memberId
                }
            })
        }

        if(!user){            
            throw new Error("Usuário authenticado não foi cadastrado!")
        }
        const group = await prismaClient.group.findMany({   
            where: {
                AND: [
                    { 
                        memberId: user.id
                    },
                    {
                        status:"PENDENTE"
                    }
                ]               
            }, 
            include:{
                company: {
                    select: {
                        avatar: true,
                        name: true
                    }
                },
            }  
        })        
        
        return response.json(group);           
    }

    async findAnswered(request: Request, response: Response){
        const { 
            authorId
         } = request.params
         var user = await prismaClient.users.findUnique({
            where: {            
                id: authorId
            }            
        })
        if(!user){
            user = await prismaClient.users.findUnique({
                where: {
                    email: authorId
                }
            })
        }

        if(!user){            
            throw new Error("Usuário authenticado não foi cadastrado!")
        }
        const group = await prismaClient.group.findMany({   
            where: {
                AND: [
                    { 
                        authorId: user.id
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
            include:{
                member: {
                    select: {
                        avatar: true,
                        full_name: true
                    }
                },
            }   
        })        
        
        return response.json(group);           
    }
}