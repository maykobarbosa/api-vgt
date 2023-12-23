import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";
import { deleteFile } from "../config/file";

export class CompanyController {
    async create(request: Request, response: Response){
        const { 
            name,
            description,
            sector,
            address,
            city,
            state,
            zip,
            email,
            phone,
            website,
            equity,
            cnpj,
            has_assets,
            growth_projection,
            main_competitors_of_the_company,
            has_a_governance_structure,
            has_an_operating_agreement,
            have_reserva,
            future_projections,

            authorId    
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
                name,
                description,
                sector,
                address,
                city,
                state,
                zip,
                email,
                phone,
                website,
                cnpj,

                has_assets:has_assets==="1"?true:false,
                growth_projection,
                main_competitors_of_the_company,
                has_a_governance_structure: has_a_governance_structure==="1"?true:false,
                has_an_operating_agreement: has_an_operating_agreement==="1"?true:false,
                have_reserva: have_reserva==="1"?true:false,
                future_projections,


                equity,
                status: "pending" ,
                ownerId: authorId,
                authorId
            }
        })
        return response.json(result);
    }

    async searchOne(request: Request, response: Response){  
        let {id, userId} = request.params  
        const companies = await prismaClient.companies.findMany({   
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
                },
                _count: {
                    select: {
                        partner: true,
                        collaborator: true
                    }
                }
            },
            where: {
                AND: [
                    { 
                        id
                    },
                    {
                        OR: [
                            {
                                ownerId: {
                                    equals: userId
                                }
                            },
                            {
                                group: {  ///verifica se faz parte do grupo
                                    some: {
                                        AND: [
                                            {
                                                memberId: {
                                                    equals: userId
                                                },
                                                status: "APROVADO"
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    }

                ]
               
            },   
        })
        if (companies.length == 0) {
            throw new Error("Empresa não encontrada, ou você não tem acesso!")
        }
        return response.json(companies[0]);  
    }

    async byId(request: Request, response: Response){  
        let {id} = request.params  
        const result = await prismaClient.companies.findUnique({   
            where: {id},
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
                },
                _count: {
                    select: {
                        partner: true,
                        collaborator: true
                    }
                }
            },
              
        })
        if (!result) {
            throw new Error("Empresa não encontrada!")
        }
        return response.json(result);  
    }
   
    async total(request: Request, response: Response){  

        let {userId} = request.params  
        const result = await prismaClient.companies.count({
            where:{
                OR: [
                    {
                        ownerId: {
                            equals: userId
                        }
                    },
                    {
                        group: { ///verifica se faz parte do grupo
                            some: {
                                AND: [
                                    {
                                        memberId: {
                                            equals: userId
                                        },
                                        status: "APROVADO"
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
        })
        return response.json(result);              
    } 

    async searchAll(request: Request, response: Response){  
        let {pag, status, userId} = request.params  
        if(status=="dashboard"){
            var result = await prismaClient.companies.findMany({    
                where:{
                    AND: [
                       
                        {
                            OR: [
                                {
                                    ownerId: {
                                        equals: userId
                                    }
                                },
                                {
                                    group: { ///verifica se faz parte do grupo
                                        some: {
                                            AND: [
                                                {
                                                    memberId: {
                                                        equals: userId
                                                    },
                                                    status: "APROVADO"
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                        
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
                    },
                    valuation: {
                        orderBy: { date_create: "desc"},
                        take: 1
                    },
                    _count: {
                        select: {
                            partner: true,
                            collaborator: true
                        }
                    }
                },
                
                orderBy: {
                    date_create: 'desc'
                }            
            })
            var total = await prismaClient.companies.count({    
                where:{
                    AND: [
                       
                        {
                            OR: [
                                {
                                    ownerId: {
                                        equals: userId
                                    }
                                },
                                {
                                    group: { ///verifica se faz parte do grupo
                                        some: {
                                            AND: [
                                                {
                                                    memberId: {
                                                        equals: userId
                                                    },
                                                    status: "APROVADO"
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                        
                }
            })
        }else if(status=="all"){
            var result = await prismaClient.companies.findMany({    
                where:{
                    AND: [
                       
                        {
                            OR: [
                                {
                                    ownerId: {
                                        equals: userId
                                    }
                                },
                                {
                                    group: { ///verifica se faz parte do grupo
                                        some: {
                                            AND: [
                                                {
                                                    memberId: {
                                                        equals: userId
                                                    },
                                                    status: "APROVADO"
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                        
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
                    },
                    valuation: {
                        orderBy: { date_create: "desc"},
                        take: 1
                    },
                    _count: {
                        select: {
                            partner: true,
                            collaborator: true
                        }
                    }
                },
                
                skip: Number(pag)*12,
                take: 12,
                orderBy: {
                    date_create: 'desc'
                }            
            })
            var total = await prismaClient.companies.count({    
                where:{
                    AND: [
                       
                        {
                            OR: [
                                {
                                    ownerId: {
                                        equals: userId
                                    }
                                },
                                {
                                    group: { ///verifica se faz parte do grupo
                                        some: {
                                            AND: [
                                                {
                                                    memberId: {
                                                        equals: userId
                                                    },
                                                    status: "APROVADO"
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                        
                }
            })

        }else{
            var result = await prismaClient.companies.findMany({    
                where:{
                    AND: [
                        { 
                            status: {
                                equals: status
                            }
                        },
                        
                        {
                            OR: [
                                {
                                    ownerId: {
                                        equals: userId
                                    }
                                },
                                {
                                    group: {  ///verifica se faz parte do grupo
                                        some: {
                                            AND: [
                                                {
                                                    memberId: {
                                                        equals: userId
                                                    },
                                                    status: "APROVADO"
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }

                    ]
                   
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
                    },
                    valuation: {
                        orderBy: { date_create: "desc"},
                        take: 1
                    },
                    _count: {
                        select: {
                            partner: true,
                            collaborator: true
                        }
                    }
                },     
                
                skip: Number(pag)*12,
                take: 12,
                orderBy: {
                    date_create: 'desc'
                }            
            })
            var total = await prismaClient.companies.count({    
                where:{
                    AND: [
                        { 
                            status: {
                                equals: status
                            }
                        },
                        
                        {
                            OR: [
                                {
                                    ownerId: {
                                        equals: userId
                                    }
                                },
                                {
                                    group: {  ///verifica se faz parte do grupo
                                        some: {
                                            AND: [
                                                {
                                                    memberId: {
                                                        equals: userId
                                                    },
                                                    status: "APROVADO"
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }

                    ]
                   
                },
            })   
        }
        
        return response.json({
            companies: result,
            total
        });  
    }

    async list(request: Request, response: Response){  
        let {pag} = request.params  
        
        var result = await prismaClient.companies.findMany({     
            where: {
                status: {
                    equals: "approved"
                }
            },
            skip: Number(pag)*9,
            take: 9,
            orderBy: {
                date_create: 'desc'
            }            
        })        
        var total = await prismaClient.companies.count({
            where: {
                status: {
                    equals: "approved"
                }
            },
        })

        return response.json({
            companies: result,
            total
        }); 
    }
    async listByStatus(request: Request, response: Response){  
        let {status,pag, search} = request.params  
        let params = search
        if(params==="null"){
            params=""
        }

        if(status === "all"){
            var result = await prismaClient.companies.findMany({     
                where: {
                    name: {
                        contains: params
                    }
                },
                skip: Number(pag)*9,
                take: 9,
                orderBy: {
                    date_create: 'desc'
                }            
            })        
            var total = await prismaClient.companies.count({where: {
                name: {
                    contains: params
                }
            },})
    
            return response.json({
                companies: result,
                total
            });
        }else{
            var result = await prismaClient.companies.findMany({     
                where: {
                    AND: [
                        {
                            name: {
                                contains: params
                            }
                        },
                        {
                            status: {
                                equals: status
                            }
                        }
                    ]                   
                },
                skip: Number(pag)*9,
                take: 9,
                orderBy: {
                    date_create: 'desc'
                }            
            })        
            var total = await prismaClient.companies.count({
                where: {
                    AND: [
                        {
                            name: {
                                contains: params
                            }
                        },
                        {
                            status: {
                                equals: status
                            }
                        }
                    ]                   
                },
            })
    
            return response.json({
                companies: result,
                total
            }); 
        }

        }
       
    async validCompany(request: Request, response: Response){
        const {status, id, authorId} = request.body

        const result = await prismaClient.companies.update({
            where: id,
            data: {
                status,
                authorId
            }
        })

        return response.json(result)
    }

    async delete(request: Request, response: Response){
        let { id, userId } = request.params
        const companies = await prismaClient.companies.findMany({   
            where: {
                AND: [
                    { 
                        id
                    },
                    {
                        OR: [
                            {
                                ownerId: {
                                    equals: userId
                                }
                            },
                            {
                                group: {  ///verifica se faz parte do grupo
                                    some: {
                                        memberId: {
                                            equals: userId
                                        }
                                    }
                                }
                            }
                        ]
                    }

                ]
               
            },   
        })
        if (companies.length == 0) {
            throw new Error("Empresa não encontrada, ou você não tem acesso!")
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
            name,
            description,
            sector,
            address,
            city,
            state,
            zip,
            email,
            phone,
            website,
            equity,
            authorId  
        } = request.body
        const companies = await prismaClient.companies.findMany({   
            where: {
                id                    
            },   
        })
        if (companies.length == 0) {
            throw new Error("Empresa não encontrada, ou você não tem permissão para esta ação!")
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
                name,
                description,
                sector,
                address,
                city,
                state,
                zip,
                email,
                phone,
                website,
                equity,
                authorId
            }
        })   
        return response.json(result);           
    }

    async updateAvatar(request: Request, response: Response){
        const { 
            id,
            userId
        } = request.body
        const avatar: string = String(request.file?.filename)
        const companies = await prismaClient.companies.findMany({   
            where: {
                AND: [
                    { 
                        id
                    },                    
                    {
                        ownerId: {
                            equals: userId
                        }
                    },                           

                ]
               
            },   
        })
        if (companies.length == 0) {
            deleteFile(`./public/img/company/${avatar}`)
            throw new Error("Empresa não encontrada, ou você não tem acesso!")
        }     
                      
        const result = await prismaClient.companies.update({
            where: {
                id
            },
            data: {
                avatar,
                authorId: userId 
            }
        })       
        if(result)   
        deleteFile(`./public/img/company/${companies[0].avatar}`)          
        return response.json(result);           
    }
}