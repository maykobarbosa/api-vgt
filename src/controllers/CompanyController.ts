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
                equity,
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
        let {pag, name, userId} = request.params  
        if(name=="null"){
            var result = await prismaClient.companies.findMany({    
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
                // skip: Number(pag),
                // take: 10,
                orderBy: {
                    date_create: 'desc'
                }            
            })
        }else{
            var result = await prismaClient.companies.findMany({    
                where:{
                    AND: [
                        { 
                            name: {
                                contains: name
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
                    _count: {
                        select: {
                            partner: true,
                            collaborator: true
                        }
                    }
                },     
                // skip: Number(pag),
                // take: 10,
                orderBy: {
                    date_create: 'desc'
                }            
            })
        }
        
        return response.json(result); 
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