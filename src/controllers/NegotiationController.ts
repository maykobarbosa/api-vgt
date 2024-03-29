import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { NotificationController } from "./NotificationController";

const notifications = new NotificationController()
export class NegotiationController{
    async initial (request: Request, response: Response){
        const {
            authorId,
            proposed_investment,
            financial_participation,
            investment_purpose,
            investment_return_period,
            message,
            companyId
        } = request.body
        // Remover as vírgulas
        const stringWithoutCommas = proposed_investment.replace(/[$,]/g, "");

        // Converter a string para um número
        const numericValue = parseFloat(stringWithoutCommas);
        const result = await prismaClient.businessProposal.create({
            data: {
                authorId,
                proposed_investment: numericValue,
                financial_participation: parseFloat(financial_participation.replace(/[%]/g, "")),
                investment_purpose,
                investment_return_period,
                message,
                companyId,

                status: "PENDENTE"
            }
        })
        const company = await prismaClient.companies.findUnique({
            where: {
                id: companyId
            }
        })

        if(result&&company){
            notifications.create(company.ownerId, `${company.name.toLocaleUpperCase()} recebeu uma proposta de investimento`)
        }

        return response.json(result)
    }

    async getById (request: Request, response: Response){
        const { id } = request.params

        const result = await prismaClient.businessProposal.findUnique({
            where: {id},
            include: {
                negotiantion: {
                    include: {
                        user: {
                            select: {
                                avatar: true,
                                full_name: true
                            }
                        }
                    },
                    orderBy: {
                        date_create: "asc"
                    }
                },
                user: {
                    select: {
                        avatar: true,
                        full_name: true
                    }
                },
                company: {
                    select: {
                        avatar: true,
                        name: true,
                        ownerId: true
                    }
                }
            }
        })

        response.json(result)
    }

    async report (request: Request, response: Response){
        const {
            authorId,
            proposed_investment,
            financial_participation,
            investment_purpose,
            investment_return_period,
            message,
            companyId,

            businessId,
            report,

            userNotification
        } = request.body
    // Remover as vírgulas
    const stringWithoutCommas = proposed_investment.replace(/[$,]/g, "");

    // Converter a string para um número
    const numericValue = parseFloat(stringWithoutCommas);
        const valid = await prismaClient.businessProposal.findUnique({
            where:{
                id: businessId
            },
            include:{
                company: true
            }
        })
        if(valid&&valid.status==="APROVADO"){
            throw Error("Negociação encerrada! Proposta ACEITA")
        }

        const result = await prismaClient.negotiation.create({
            data:{
                authorId,
                proposed_investment: numericValue,
                financial_participation: parseFloat(financial_participation.replace(/[%]/g, "")),
                investment_purpose,
                investment_return_period,
                message,
                companyId,
    
                businessId,
                report
            }
        })

        if(result){
            await prismaClient.businessProposal.update({
                where:{
                    id: businessId
                },
                data: {
                    status: report
                }
            })
        }
        if(result&&valid){
            notifications.create(userNotification, `A proposta feita para ${valid.company.name.toLocaleUpperCase()} foi respondida.`)
        }

        return response.json(result)
    }

    async getByCompany(request: Request, response: Response){
        const {
            id
        } = request.params

        const result = await prismaClient.businessProposal.findMany({
            where: {
                companyId: id
            }
        })

        return response.json(result)
    }

    async getByInvestor(request: Request, response: Response){
        const {
            id, status, pag
        } = request.params


        const filtro: any = {};
        if(status!=="ALL"){
            filtro.status = { equals: status } 
        }
        const result = await prismaClient.businessProposal.findMany({
            where: {
                AND: [
                    filtro,
                    {   
                        authorId: id
                        
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
                user: {
                    select: {
                        avatar: true,
                        full_name: true
                    }
                }
            },
            skip: Number(pag) * 15,
            take: 15,
            orderBy: { date_create: "desc" },
        })
        const total = await prismaClient.businessProposal.count({
            where: {
                AND: [
                    filtro,
                    {                           
                        authorId: id
                    }
                ]        
            },
           
        })

        return response.json({result, total})
    }

    async getByClient(request: Request, response: Response){
        const {
            id, status, pag
        } = request.params


        const filtro: any = {};
        if(status!=="ALL"){
            filtro.status = { equals: status } 
        }

        const result = await prismaClient.businessProposal.findMany({
            where: {
                AND: [
                    filtro,
                    {   
                        company: {
                            ownerId: id
                        }
                    }
                ]                
            },
            include:{
                // company: true,
                user: {
                    select: {
                        avatar: true,
                        full_name: true
                    }
                }
            },
            skip: Number(pag) * 15,
            take: 15,
            orderBy: { date_create: "desc" },
        })
        const total = await prismaClient.businessProposal.count({
            where: {
                AND: [
                    filtro,
                    {   
                        company: {
                            ownerId: id
                        }
                    }
                ]        
            },
           
        })

        return response.json({result, total})
    }

    async getByClientOpened(request: Request, response: Response){
        const {
            id
        } = request.params


        const result = await prismaClient.businessProposal.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            {
                                status: "CONTRAPROPOSTA"
                            },
                            {
                                status: "PENDENTE"
                            }
                        ]
                    },
                    {
                        company: {
                            ownerId: id
                        }
                    }
                ]                
            },
            include:{
                company: true
            }
        })

        return response.json(result)
    }
}