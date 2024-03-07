import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

interface LeadInput {
    company: string;
    email: string;
    valuation: number;
    type: string;
    date: string;
    name_of_person_responsible?: string;
    whatsapp_of_person_responsible?: string;
    foundation_date?: string;
    site?: string;
    segmento?: string;
    business_model?: string;
    locality?: string;
    investment_stage?: string;
    operational_stage?: string;
    arr?: number;
    mrr?: number;
    ntm?: number;
    profit_margin?: number;
    burnrate?: number;
    breakeven?: string;
    runrate?: string;
    projected_revenue_for_the_year?: number;
    projected_ebitda?: number;
    immobilized?: number;
    current_annual_investment?: number;
    annual_investment_next_5_years?: number;
    cash_and_stock_value?: number;
    debt?: number;
}

export class LeadsController{
    async create(request: Request, response: Response){
        const input: LeadInput = request.body;

        try {
            const result = await prismaClient.leads.create({
                data: {
                    company: input.company,
                    email: input.email,
                    valuation: input.valuation,
                    type: input.type,
                    date: input.date,
                    ...Object.fromEntries(
                        Object.entries(input).filter(([_, v]) => v !== undefined)
                    ),
                  },
                });
    
            return response.json(result)
        } catch (error) {
            console.log(error)
            throw Error("Erro")
        }      
        
    }

    async get(request:Request, response: Response){
        const {page} = request.query

        if(!page){
            throw Error("Informe a página")
        }
        
        const result = await prismaClient.leads.findMany({            
            skip: Number(page) * 20,
            take: 20,
            orderBy: { date_create: "desc" },
        })

        return response.json(result)
    }
}