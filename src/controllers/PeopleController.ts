import { deleteFile } from "../config/file";
import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class PeopleController {
    async create(request: Request, response: Response){
        const { 
            name,
            office,
            description,
            email,
            contact             
         } = request.body
        const avatar: string = String(request.file?.filename)
        if(email) {
            const result = await prismaClient.people.findMany({                
                where: { 
                    email: {
                                equals: email
                            }
                        }
            })            
            if(result.length != 0){
                deleteFile(`./public/img/people/${avatar}`)
                throw Error("Já possui uma pessoa cadastrada com este e-email!")
            }
        }     
        const result = await prismaClient.people.create({
            data: {
                avatar,
                name,
                office,
                description,
                email,
                contact
            }
        })
        return response.json(result);
    }

    async searchOne(request: Request, response: Response){  
        let {id} = request.params  
        const valida = await prismaClient.people.findMany({
            where: { 
                id
            }
        })      
        if (valida.length == 0) {
            throw new Error("Pessoa não encontrada!")
        }
        const result = await prismaClient.people.findUnique({
            where: { 
                id
            }
        })            
        return response.json(result); 
    }

   
    async total(request: Request, response: Response){  
        const result = await prismaClient.people.count()
        return response.json(result);              
    } 

    async searchAll(request: Request, response: Response){  
        let {pag, name} = request.params  

        const result = await prismaClient.people.findMany({    
            where:{
                name: {
                    contains: name
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

    async delete(request: Request, response: Response){
        let { id } = request.params
        const people = await prismaClient.people.findMany({   
            where: {
                id
            }
        })        
        if (people.length == 0) {
            throw new Error("Pessoa não encontrada!")
        }
        await prismaClient.people.delete({
            where: {
                id
            }            
        })    
        
        deleteFile(`./public/img/people/${people[0].avatar}`)    
        return response.json();            
    }


    async update(request: Request, response: Response){
        const { 
            id,
            name,
            office,
            description,
            email,
            contact  
         } = request.body
        const people = await prismaClient.people.findMany({   
            where: {
                id
            }
        })        
        if (people.length == 0) {
            throw new Error("Pessoa não encontrada!")
        }
        if(email!=people[0].email){
            const people2 = await prismaClient.people.findMany({   
                where: {
                    email
                }
            })            
            if (people2.length > 0) {
                throw new Error("Já existe uma pessoa cadastrada com o e-email informado!")
            }
        }     
        const result = await prismaClient.people.update({
            where: {
                id
            },
            data: {
                name,
                office,
                description,
                email,
                contact  
            }
        })          
        return response.json(result);           
    }
    async updateAvatar(request: Request, response: Response){
        const { 
            id
        } = request.params
        const avatar: string = String(request.file?.filename)
        const people = await prismaClient.people.findMany({   
            where: {
                id
            }
        })        
        if (people.length == 0) {
            deleteFile(`./public/img/people/${avatar}`)
            throw new Error("Pessoa não encontrada!")
        }                           
        const result = await prismaClient.people.update({
            where: {
                id
            },
            data: {
                avatar
            }
        })       
        if(result)   
        deleteFile(`./public/img/people/${people[0].avatar}`)          
        return response.json(result);           
    }
}