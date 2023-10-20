import { deleteFile } from "../config/file";
import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

import Jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { decodeToken } from "../config/decodeToken";
import axios from "axios";

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

       

        if(email) {
            const valida = await prismaClient.company.findMany({                
                where: { 
                    email: {
                            equals: email
                        }
                    }
            })
            if(valida.length != 0){
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

            const apiUrl = "https://app.whatsgw.com.br/api/WhatsGw/Send";
            // Construa o objeto JSON com os dados da mensagem
            const messageData = {
              "apikey" : "22590b11-eee2-4235-a551-62b17ef42df3",
              "phone_number" : "18639492315",
              "contact_phone_number" : phone.toString(),
              "message_custom_id" : "yoursoftwareid",
              "message_type" : "text",
              "message_body" : `Olá *${name}*, muito obrigado por se cadastrar em nosso sistema, aqui te manterei informado de todas as atualizações, seja muito bem vindo!`,
              "check_status" : "1"
            };
            console.log(messageData)
            // Envie a mensagem via WhatsApp
            axios
              .post(apiUrl, messageData)
              .then((response) => {
                console.log("Mensagem enviada com sucesso:", response.data);
                // Lide com a resposta da API, se necessário
              })
              .catch((error) => {
                console.error("Erro ao enviar a mensagem:", error);
                // Lide com erros, se necessário
              });
        
            const apiUrl2 = "https://app.whatsgw.com.br/api/WhatsGw/Send";
            // Construa o objeto JSON com os dados da mensagem
            const messageData2 = {
              "apikey" : "22590b11-eee2-4235-a551-62b17ef42df3",
              "phone_number" : "18639492315",
              "contact_phone_number" : "16892623068",
              "message_custom_id" : "yoursoftwareid",
              "message_type" : "text",
              "message_body" : `Um novo cadastro foi realizado na VGT\n\nNome: *${name}*\nTel: *${phone}*\nEmail: ${email}\n\nQual o seu negócio?\n*${business}*\n\nComo podemos te Ajudar?\n*${help}*\n\nOnde conheceu a VGT?\n*${he_knew}*`,
              "check_status" : "1"
            };
            console.log(messageData)
            // Envie a mensagem via WhatsApp
            axios
              .post(apiUrl2, messageData2)
              .then((response) => {
                console.log("Mensagem enviada com sucesso:", response.data);
                // Lide com a resposta da API, se necessário
              })
              .catch((error) => {
                console.error("Erro ao enviar a mensagem:", error);
                // Lide com erros, se necessário
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
                expiresIn: '1h'
            }
        )

        
        return response.status(200).json({ msg: "Authentication success!", token, user: {            
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            full_name: user.name, 
            fone: user.phone, 
            cell_phone : user.cell_phone
        }})
    }
    async findByStatus(request: Request, response: Response){  
        let {pag} = request.params          
        const authHeader = request.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        const secret = "7d14e4b1831c8aa556f9720b5f74c4d7"
    
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

    
    async updatePhone(request: Request, response: Response){  
      let {phone} = request.body          
      const authHeader = request.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      const secret = "7d14e4b1831c8aa556f9720b5f74c4d7"
  
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

      const result = await prismaClient.company.update({
        where: {
          id: decoded.id
        },
        data: {
          phone
        }
      })
      
      return response.json(result); 
  }
}