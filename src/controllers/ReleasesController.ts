import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class ReleasesController {
    async create(request: Request, response: Response){
        const { 
            companyId,
            month,
            year,
            lucroLiquido,
            receitaLiquida,
            despesaBruta,
            authorId
        } = request.body     
        const docs: string = String(request.file?.filename)

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
        if(month > 12 || month == 0){
            throw Error("Mês inválido!")
        }
        const validaID = await prismaClient.companies.findMany({                
            where: { 
                id: {
                    equals:companyId
                }
            }
        })
        if(validaID.length == 0){
            throw Error("Empresa não encontrada!")
        }
        const validaAuthor = await prismaClient.users.findMany({                
            where: { 
                id: {
                    equals: user.id
                }
            }
        })
        if(validaAuthor.length == 0){
            throw Error("Autor não encontrado!")
        }
        const validaReleases = await prismaClient.releases.findMany({                
            where: { 
                AND: [
                    {
                        companyId
                    },
                    {
                        month: Number(month)
                    },
                    {
                        year: Number(year)
                    }
                ]
            }
        })
        if(validaReleases.length != 0){
            throw Error(`Você só pode fazer um lançamento por mês!`)
        }        
        const result = await prismaClient.releases.create({
            data: {
                companyId,
                month: Number(month),
                year: Number(year),
                valuation: 0,
                lucroLiquido: Number(lucroLiquido),
                receitaLiquida: Number(receitaLiquida),
                despesaBruta: Number(despesaBruta),
                docs,
                authorId: user.id
            }
        })
        return response.json(result);
    }
    async searchMonthYear(request: Request, response: Response){  
        const { 
            companyId,
            month,
            year
        } = request.body
        const result = await prismaClient.releases.findMany({                
            where: { 
                AND: [
                    {
                        companyId
                    },
                    {
                        month
                    },
                    {
                        year
                    }
                ]
            }
        })
        // if (result.length == 0) {
        //     throw new Error("Não existe lançamento para o período informado!")
        // }        
        return response.json(result[0]);  
    }
    async searchYear(request: Request, response: Response){  
        const { 
            companyId,
            year
        } = request.params
        const result = await prismaClient.releases.findMany({                
            where: { 
                AND: [
                    {
                        companyId
                    },
                    {
                        year: Number(year)
                    }
                ]
            },
            include:{
                author: true
            },
            orderBy: {
                month: "asc"
            }
        })
        // if (result.length == 0) {
        //     throw new Error("Não existe lançamento para o ano informado!")
        // }        
        return response.json(result);  
    }
    async delete(request: Request, response: Response){
        let { id } = request.params
        const releases = await prismaClient.releases.findMany({   
            where: {
                id
            }
        })
        if (releases.length == 0) {
            throw new Error("Lançamento não encontrado!")
        }
        await prismaClient.releases.delete({
            where: {
                id
            }            
        })        
        return response.json();            
    }
    async update(request: Request, response: Response){
        const { 
            id,
            // valuation,
            lucroLiquido,
            receitaLiquida,
            despesaBruta,
            authorId
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
        const releases = await prismaClient.releases.findMany({   
            where: {
                id
            }
        })
        const validaAuthor = await prismaClient.users.findMany({                
            where: { 
                id: {
                    equals:user.id
                }
            }
        })
        if(validaAuthor.length == 0){
            throw Error("Autor não encontrado!")
        }
        if (releases.length == 0) {
            throw new Error("Lançamento não encontrado!")
        }       
        const result = await prismaClient.releases.update({
            where: {
                id
            },
            data: {
                // valuation,
                lucroLiquido,
                receitaLiquida,
                despesaBruta,
                authorId: user.id
            }
        })   
        return response.json(result);           
    }
}