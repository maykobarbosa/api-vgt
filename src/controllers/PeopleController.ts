import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";
import Jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
import { RecoverPassword } from "../templateEmail/recoverPassword";
import crypto from 'crypto';
interface Payload extends JwtPayload {
    id: string
    exp: number
}

export class PeopleController {
    async create(request: Request, response: Response){
        const { 
            name,
            office,
            description,
            mail,
            contact             
         } = request.body

        //validar mail
        if(mail) {
            const result = await prismaClient.people.findMany({                
                where: { 
                    mail: {
                                equals: mail
                            }
                        }
            })
            
            if(result.length != 0){
                throw Error("Já possui uma pessoa cadastrada com este e-mail!")
            }
        }       
       
        await prismaClient.people.create({
            data: {
                name,
                office,
                description,
                mail,
                contact
            }
        })

        return response.status(201);
    }

    async searchOne(request: Request, response: Response){  
        
        
        let {id} = request.params  
        if(id) {
            const result = await prismaClient.people.findMany({
                where: { 
                    id
                }
            })
            
            return response.json(result);   
        }
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
        let { mail } = request.params

        await prismaClient.people.deleteMany({
            where: {
                mail: mail
            }
            
        })        
        return response.json();            
    }


    async update(request: Request, response: Response){
        const { 
            id,
            name,
            office,
            description,
            mail,
            contact  
         } = request.body


        const people = await prismaClient.people.findUnique({   
            where: {
                id
            }
        })
        
        if (!people) {
            throw new Error("Pessoa não encontrada!")
        }
          
            
        await prismaClient.people.update({
            where: {
                id
            },
            data: {
                name,
                office,
                description,
                mail,
                contact  
            }
        })           
        
        return response.json();       

        
    }

    
   

}