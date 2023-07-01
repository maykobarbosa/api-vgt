import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class PartnerController {
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
        const validaPartner = await prismaClient.partner.findMany({                
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
        if(validaPartner.length != 0){
            throw Error("A pessoa foi adicionada anteriormente como sócio!")
        }
        const result = await prismaClient.partner.create({
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
        const result = await prismaClient.partner.findMany({                
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
        const releases = await prismaClient.partner.findMany({   
            where: {
                id
            }
        })
        if (releases.length == 0) {
            throw new Error("Sócio não encontrado!")
        }
        await prismaClient.partner.delete({
            where: {
                id
            }            
        })        
        return response.json();            
    }
}