import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class CollaboratorController {
    async create(request: Request, response: Response){
        const { 
            companyId,
            peopleId
        } = request.body      
        const validaCompany = await prismaClient.companies.findMany({                
            where: { 
                id: {
                    equals:companyId
                }
            }
        })
        if(validaCompany.length == 0){
            throw Error("Empresa não encontrada!")
        }
        const validaPeople = await prismaClient.people.findMany({                
            where: { 
                id: {
                    equals:peopleId
                }
            }
        })
        if(validaPeople.length == 0){
            throw Error("Pessoa não encontrada!")
        }
        const validaCollaborator = await prismaClient.collaborator.findMany({                
            where: { 
                AND: [
                    {
                        peopleId
                    },
                    {
                        companyId
                    }
                ]
                
            }
        })
        if(validaCollaborator.length != 0){
            throw Error("A pessoa foi adicionada anteriormente como colaborador!")
        }
        const result = await prismaClient.collaborator.create({
            data: {
                companyId,
                peopleId
            }
        })
        return response.json(result);
    }
    async searchByCompany(request: Request, response: Response){  
        const { 
            companyId            
        } = request.params
        const validaCompany = await prismaClient.companies.findMany({                
            where: { 
                id: {
                    equals:companyId
                }
            }
        })
        if(validaCompany.length == 0){
            throw Error("Empresa não encontrada!")
        }
        const result = await prismaClient.collaborator.findMany({                
            where: { 
                companyId
            },
            include: {
                people: true
            }
        })     
        return response.json(result);  
    }
    
    async delete(request: Request, response: Response){
        let { id } = request.params
        const releases = await prismaClient.collaborator.findMany({   
            where: {
                id
            }
        })
        if (releases.length == 0) {
            throw new Error("Colaborador não encontrado!")
        }
        await prismaClient.collaborator.delete({
            where: {
                id
            }            
        })        
        return response.json();            
    }
}