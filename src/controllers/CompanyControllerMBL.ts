import { deleteFile } from "../config/file";
import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

import Jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { decodeToken } from "../config/decodeToken";

export class CompanyControllerMBL {
    async create(request: Request, response: Response){
        const {
            name,
            email,
            phone,
            cell_phone,
            password,
            he_knew,
            business,
            help,
            message
        } = request.body;

        const resale_tax_certificate: string = String(request.file?.filename)
             

        if(email) {
            const valida = await prismaClient.company.findMany({                
                where: { 
                    email: {
                            equals: email
                        }
                    }
            })
            if(valida.length != 0){
                deleteFile(`./public/img/company/${resale_tax_certificate}`)
                throw Error("You already have an account with this email!")
            }
        }  
        const checkPassword = await bcrypt.hashSync(password, 10)
        const company = await prismaClient.company.create({
            data: {
              name,
              email,
              phone,
              cell_phone,
              password: checkPassword,
              he_knew,
              business,
              help,
              message
            },
        });
        return response.json(company);       
    }

    async authenticate(request: Request, response: Response){
        const { email, password } = request.body
      
        if (!email) {
            throw new Error("Email is required!")
        }
        if (!password) {
            throw new Error("Password is required!" )
        }
        ///check if user exists
        const user = await prismaClient.company.findUnique({   
            where: {
                email
            }
        })
      
        if (!user) {
          throw new Error("Invalid username and password")
        }
      
        // check if password match
        const checkPassword = await bcrypt.compare(password, user.password)
      
        if (!checkPassword) {
            throw new Error("Invalid username and password")
        }
      
        const token = Jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin
            },
            "7d14e4b1831c8aa556f9720b5f74c4d7",
            {
                subject: user.id,
                expiresIn: '30min'
            }
          )

        
        return response.status(200).json({ msg: "Authentication success!", token, user: {            
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            company_name: user.company_name, 
            phone: user.phone, 
            cell_phone : user.cell_phone
        }})
    }
    async findByStatus(request: Request, response: Response){  
        let {pag} = request.params          
        const authHeader = request.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        const secret = process.env.SECRET_JWT;
    
        if (!token) {
          return response.status(401).json({ message: "Invalid token" });
        }
    
        const decoded = decodeToken(token, String(secret));
        if (!decoded) {
          throw Error("Error decoding token!");
        }
        if(!decoded.isAdmin){
            throw Error("Access denied")
        }

        const result = await prismaClient.company.findMany({
            skip: Number(pag) * 20,
            take: 20,
            orderBy: { date_update: "desc" },
        })
        return response.json(result); 
    }

    



}