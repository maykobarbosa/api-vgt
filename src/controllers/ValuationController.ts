import { deleteFile } from "../config/file";
import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class ValuationController {
    async create(request: Request, response: Response){
        const { 
            value,
            companyId,
            authorId
        } = request.body   
        const docs: string = String(request.file?.filename)
        var user = await prismaClient.users.findUnique({
            where: {            
                id: authorId
            }            
        })
        

        if(!user){      
            deleteFile(`./public/file/valuation/${docs}`)        
            throw new Error("Usuário authenticado não foi cadastrado!")
        }
        const validaID = await prismaClient.companies.findMany({                
            where: { 
                id: {
                    equals:companyId
                }
            }
        })
        if(validaID.length == 0){
            deleteFile(`./public/file/valuation/${docs}`)   
            throw Error("Empresa não encontrada!")
        }
             
        const result = await prismaClient.valuation.create({
            data: {
                companyId,
                value: Number(value),
                docs,
                authorId: user.id
            }
        })
        return response.json(result);
    }
   
    async list(request: Request, response: Response){  
        const { 
            companyId
        } = request.params
        const result = await prismaClient.valuation.findMany({                
            where: {
                companyId
                
            },
            include:{
                author: true
            },
            orderBy: {
                date_create: "desc"
            },
            // skip: Number(pag) * 20,
            // take: 20,
        })
             
        return response.json(result);  
    }

    async current(request: Request, response: Response){  
        const { 
            companyId
        } = request.params
        const result = await prismaClient.valuation.findFirst({                
            where: {
                companyId
                
            },
            orderBy: {
                date_create: "desc"
            },
            take: 1
            // skip: Number(pag) * 20,
            // take: 20,
        })
             
        return response.json(result);  
    }

    async delete(request: Request, response: Response){
        let { id } = request.params
        const valuation = await prismaClient.valuation.findMany({   
            where: {
                id
            }
        })
        if (valuation.length == 0) {
            throw new Error("Valuation não encontrado!")
        }
        await prismaClient.valuation.delete({
            where: {
                id
            }            
        })        

        deleteFile(`./public/file/valuation/${valuation[0].docs}`)  
        return response.json();            
    }    
}