import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";
import { deleteFile } from "../config/file";
import { error } from "console";

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
                ownerId: user.id,
                authorId: user.id
            }
        })
        return response.json(result);
    }

    async searchOne(request: Request, response: Response){  
        let {id, userId} = request.params  
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
                                    equals: user.id
                                }
                            },
                            {
                                group: {  ///verifica se faz parte do grupo
                                    some: {
                                        AND: [
                                            {
                                                memberId: {
                                                    equals: user.id
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
      
        const result = await prismaClient.companies.count({
            where:{
                OR: [
                    {
                        ownerId: {
                            equals: user.id
                        }
                    },
                    {
                        group: { ///verifica se faz parte do grupo
                            every: {
                                AND: [
                                    {
                                        memberId: {
                                            equals: user.id
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

    async searchAll(request: Request, response: Response) {
        const { pag, name, userId } = request.params;


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
      
        const where: any = {
          OR: [
            {
              ownerId: {
                equals: user.id
              }
            },
            {
              group: {
                some: {
                  AND: [
                    {
                      memberId: {
                        equals: user.id
                      },
                      status: "APROVADO"
                    }
                  ]
                }
              }
            }
          ]
        };
      
        if (name && name !== "null") {
          where.OR.push({
            name: {
              contains: name
            }
          });
        }
      
        const result = await prismaClient.companies.findMany({
          where,
          include: {
            realeases: {
              orderBy: [
                {
                  year: "desc"
                },
                {
                  month: "desc"
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
          orderBy: {
            date_create: 'desc'
          }
        });
      
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
                                    equals: user.id
                                }
                            },
                            {
                                group: {  ///verifica se faz parte do grupo
                                    some: {
                                        memberId: {
                                            equals: user.id
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
                authorId: user.id
            }
        })   
        return response.json(result);           
    }
    async updateAvatar(request: Request, response: Response){
        const { 
            id,
            userId
        } = request.body
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
        const avatar: string = String(request.file?.filename)
        const companies = await prismaClient.companies.findMany({   
            where: {
                AND: [
                    { 
                        id
                    },                    
                    {
                        ownerId: {
                            equals: user.id
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