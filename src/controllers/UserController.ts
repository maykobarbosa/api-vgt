import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";
import Jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
import { RecoverPassword } from "../templateEmail/recoverPassword";
import crypto from 'crypto';
import { deleteFile } from "../config/file";
import axios from "axios";
import { SendMessageToAdmin, SendMessageToMe } from "../utils/sendMessage";
import { decodeToken } from "../config/decodeToken";
interface Payload extends JwtPayload {
    id: string
    exp: number
}

export class UserController {
    async create(request: Request, response: Response){
        const { 
            email,
            full_name,
            fone,
            password,
            rep_password,
            profile
         } = request.body

        //validar email
        if(email) {
            const result = await prismaClient.users.findMany({                
                where: { 
                    email: {
                                equals: email
                            }
                        }
            })
            
            if(result.length != 0){
                throw Error("Já possui uma conta cadastrada com este e-mail!")
            }
        }       
       
        
        if (password != rep_password) {
            throw Error("As senhas não coincidem")
        }

        const checkPassword = bcrypt.hashSync(password, 10)

        const user = await prismaClient.users.create({
            data: {
                email,
                full_name,
                fone,
                password: checkPassword,
                profile
            }
        })
        await SendMessageToMe(
            fone.toString(), 
            `Olá *${full_name}*, muito obrigado por se cadastrar em nosso sistema, aqui te manterei informado de todas as atualizações, seja muito bem vindo!`
        )
        
        return response.json(user);
    }
    async create2(request: Request, response: Response){
        const { 
            email,
            full_name,
            fone,
            password,

            he_knew,
            business,
            help,
            message,

            profile
         } = request.body

        //validar email
        if(email) {
            const result = await prismaClient.users.findMany({                
                where: { 
                    email: {
                                equals: email
                            }
                        }
            })
            
            if(result.length != 0){
                throw Error("Já possui uma conta cadastrada com este e-mail!")
            }
        }       
               
       
        const checkPassword = bcrypt.hashSync(password, 10)

        const user = await prismaClient.users.create({
            data: {
                email,
                full_name,
                fone,

                he_knew,
                business,
                help,
                message,

                password: checkPassword,
                profile
            }
        })
        await SendMessageToMe(
            fone.toString(), 
            `Olá *${full_name.toUpperCase()}*, muito obrigado por se cadastrar em nosso sistema, aqui te manterei informado de todas as atualizações, seja muito bem vindo!`
        )
        await SendMessageToAdmin(
            `Um novo cadastro foi realizado na VGT\n\nNome: *${full_name.toUpperCase()}*\nTel: *${fone}*\nEmail: ${email}\n\nQual o seu negócio?\n*${business}*\n\nComo podemos te Ajudar?\n*${help}*\n\nOnde conheceu a VGT?\n*${he_knew}*`
        )

        return response.json(user);
    }
    async create3(request: Request, response: Response){
        const { 
            email,
            full_name,
            fone,
            password,
            status,

            how_long_do_you_invest,
            main_investments,
            sources_of_income,
            annual_income_ornet_worth,
            goal,
            what_are_your_growth_expectations,
            link_or_social_networks,

            profile
         } = request.body

        //validar email
        if(email) {
            const result = await prismaClient.users.findMany({                
                where: { 
                    email: {
                                equals: email
                            }
                        }
            })
            
            if(result.length != 0){
                throw Error("Já possui uma conta cadastrada com este e-mail!")
            }
        }       
               
       
        const checkPassword = bcrypt.hashSync(password, 10)

        const user = await prismaClient.users.create({
            data: {
                email,
                full_name,
                fone,
                status,

                how_long_do_you_invest,
                main_investments,
                sources_of_income,
                annual_income_ornet_worth,
                goal,
                what_are_your_growth_expectations,
                link_or_social_networks,

                password: checkPassword,
                
                profile
            }
        })
        // await SendMessageToMe(
        //     fone.toString(), 
        //     `Olá *${full_name.toUpperCase()}*, muito obrigado por se cadastrar em nosso sistema, aqui te manterei informado de todas as atualizações, seja muito bem vindo!`
        // )
        // await SendMessageToAdmin(
        //     `Um novo cadastro foi realizado na VGT\n\nNome: *${full_name.toUpperCase()}*\nTel: *${fone}*\nEmail: ${email}\n\nQual o seu negócio?\n*${business}*\n\nComo podemos te Ajudar?\n*${help}*\n\nOnde conheceu a VGT?\n*${he_knew}*`
        // )

        return response.json(user);
    }
    async createWithGoogle(request: Request, response: Response){
        const { 
            email,
            full_name,
            avatar
         } = request.body

        //validar email
        if(email) {
            const result = await prismaClient.users.findMany({                
                where: { 
                    email: {
                                equals: email
                            }
                        }
            })
            
            if(result.length != 0){
                throw Error("Já possui uma conta cadastrada com este e-mail!")
            }
        }       
       
        
      
        const checkPassword = bcrypt.hashSync("123456", 10)

        const user = await prismaClient.users.create({
            data: {
                avatar,
                email,
                full_name,
                fone: " ",
                password: checkPassword,
                profile: "100"
            }
        })

        return response.json(user);
    }
    async existed(request: Request, response: Response){  
        
        
        const {email} = request.params  
        const result = await prismaClient.users.findUnique({
            where: { 
                email
            }
        })
        
        return response.json(result);   
        
    }
    async consultaOne(request: Request, response: Response){  
        
        
        let {id} = request.params  
        if(id) {
            const result = await prismaClient.users.findMany({
                where: { 
                    id
                }
            })
            
            return response.json(result);   
        }
    }  
    async totalUsers(request: Request, response: Response){  
        const result = await prismaClient.users.count()
        return response.json(result);              
    } 
    async list(request: Request, response: Response){  
        let {pag} = request.params  
        
        const result = await prismaClient.users.findMany({            
            // skip: Number(pag),
            // take: 10,
            orderBy: {
                date_create: 'desc'
            }            
        })
        return response.json(result);   
        
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

        const result = await prismaClient.users.findMany({
            skip: Number(pag) * 20,
            take: 20,
            orderBy: { date_update: "desc" },
        })
        return response.json(result.map((i)=>
          ({
          id:i.id,
          name: i.full_name,
          email:i.email,
          phone:i.fone,
          he_knew:i.he_knew,
          business:i.business,
          help:i.help,
          message:i.message,
          date_update:i.date_update,
          date_create:i.date_create,
        }))); 
    }
    async authenticate(request: Request, response: Response){
        const { email, password } = request.body
      
        if (!email) {
            throw new Error("O e-mail é obrigatório!")
        }
        if (!password) {
            throw new Error("A senha é obrigatória!" )
        }
        ///check if user exists
        const user = await prismaClient.users.findUnique({   
            where: {
                email
            },
            include: {
                companies: true
            }
        })
      
        if (!user) {
          throw new Error("Usuário não encontrado!")
        }
        // check if password match
        const checkPassword = await bcrypt.compare(password, user.password)
      
        if (!checkPassword) {
            throw new Error("E-mail e/ou senha incorretos!")
        }      
        
        if(user.status==="pendente"){
            throw new Error("Seu cadastro ainda não foi aprovado pelo setor de análise!")
        }
        const token = Jwt.sign({
            id: user.id,
        },
            "7d14e4b1831c8aa556f9720b5f74c4d7",
            {
                subject: user.id,
                expiresIn: '1h'
            }
        )
        var isCompanyAproved = false
        const i = user.companies.filter(i=> i.status === "aprovado")
        if(i.length>0){
            isCompanyAproved = true
        }
                
        return response.status(200).json({ msg: "Authentication success!", token, user: {            
            id: user.id,
            email: user.email,
            full_name: user.full_name, 
            fone: user.fone, 
            profile: user.profile,
            isCompanyAproved,
            avatar: `${process.env.URL_PHOTOS_API}/img/people/${user.avatar}`
        }})           
      
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
  
        const result = await prismaClient.users.update({
          where: {
            id: decoded.id
          },
          data: {
            fone: phone
          }
        })
        
        return response.json(result); 
    }
    async refreshToken(request: Request, response: Response){
        const { refreshToken } = request.body;
      
        if (!refreshToken) {
            return response.status(400).send("Refresh token not found");
          }
        
          try {
            // Decodifica o refresh token
            const decoded = Jwt.verify(refreshToken, "7d14e4b1831c8aa556f9720b5f74c4d7") as Payload;
           
            if (decoded.exp < Date.now() / 1000) {
                return response.status(401).send("Token expirado!");
            } else {
               // Procura pelo usuário no banco de dados
                const user = await prismaClient.users.findUnique({
                    where: { 
                        id: decoded.id 
                    },
                    include: {
                        companies: true
                    } 
                });
            
                if (!user) {
                    return response.status(401).send("Invalid refresh token");
                }                         
                
                // Gera um novo token de acesso com uma nova data de expiração
                
               
                const token = Jwt.sign({
                    id: user.id,
                },
                    "7d14e4b1831c8aa556f9720b5f74c4d7",
                    {
                        subject: user.id,
                        expiresIn: '1h'
                    }
                )
                var isCompanyAproved = false
                const i = user.companies.filter(i=> i.status === "aprovado")
                if(i.length>0){
                    isCompanyAproved = true
                }
                
                return response.status(200).json({ msg: "Authentication success!", token, user: {            
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name, 
                    fone: user.fone, 
                    profile: user.profile,
                    isCompanyAproved,
                    avatar: `${process.env.URL_PHOTOS_API}/img/people/${user.avatar}`
                }})           
            }
            

          } catch (err) {
            console.error(err);
            return response.status(500).send("Internal server error");
          }
       
      
    }
    async delete(request: Request, response: Response){
        let { email } = request.params

        await prismaClient.users.delete({
            where: {
                email: email
            }
            
        })        

        return response.json();              
    }
    async update(request: Request, response: Response){
        const { 
            id,
            email,
            full_name,
            fone,
            current_password,
            password,
            rep_password,
            profile
         } = request.body

        if (rep_password != password){
            throw Error("As senhas não coincidem")
        }else if(current_password && password) {

            const user = await prismaClient.users.findUnique({   
                where: {
                    id
                }
            })
          
            if (!user) {
              throw new Error("Usuário não encontrado!")
            }
          
            // check if password match
            const checkPassword = await bcrypt.compare(current_password, user.password)
            const new_password = bcrypt.hashSync(password, 10)
            if (!checkPassword) {
                throw new Error("Senha atual inválida!")
            }

            await prismaClient.users.update({
                where: {
                   id
                },
                data: {
                    email,
                    full_name,                    
                    fone,
                    password: new_password,
                    profile
                }
            })   
        }else{
            await prismaClient.users.update({
                where: {
                    id
                },
                data: {
                    email,
                    full_name,                    
                    fone,
                    profile
                }
            })   
        }
        
        return response.json();       

        
    }
    async sendMailRecover(request: Request, response: Response){
        const { email } = request.body;
      
        if (!email) {
            throw new Error("O e-mail é obrigatório!")
        }
        
        ///check if user exists
        const user = await prismaClient.users.findUnique({   
            where: {
                email
            }
        })
      
        if (!user) {
          throw new Error("Usuário não encontrado!")
        }       
        const token = crypto.randomBytes(3).toString('hex').toUpperCase();
        await prismaClient.users.update({
            where: {
                id: user.id
            },
            data: {
                token_recover_password: token
            }
        }) 
        
        const SMTP_CONFIG = require('../config/smtp')
    
        const transporter = nodemailer.createTransport({
        host: SMTP_CONFIG.host,
        port: SMTP_CONFIG.port,
        secure: false,
        auth: {
            user: SMTP_CONFIG.user,
            pass: SMTP_CONFIG.pass    
        },    
        tls: {
            rejectUnauthorized: false
        }
        });
        const templateEmail = RecoverPassword(user.full_name.toUpperCase(), token)
        const mailOptions = {
            from: SMTP_CONFIG.user,
            to: email,
            subject: "VGT - Redefinição de senha",
            html: templateEmail, 
        };
    
        try {
            const result = await transporter.sendMail(mailOptions);
            return response.json(result);
        } catch (error) {
            return response.json(error)
        }
       
      
    }
    async updatePassword(request: Request, response: Response){
        const { code, pass, confirmPass } = request.body;
        if (pass != confirmPass){
            throw Error("As senhas não coincidem")
        }
        const password = await bcrypt.hashSync(pass, 10)

        const user = await prismaClient.users.findUnique({   
            where: {
                token_recover_password: code
            }
        })
      
        if (!user) {
          throw new Error("Código inválido!")
        }       

        const result = await prismaClient.users.update({
            where: {
                email: user.email                                
            },
            data: {
                token_recover_password: null,
                password: password
            }
        })    
    
        try {
            return response.json(result);
        } catch (error) {
            return response.json(error)
        }
       
      
    }
    async updateAvatar(request: Request, response: Response){
        const { 
            id
        } = request.body
        const avatar: string = String(request.file?.filename)
        const users = await prismaClient.users.findMany({   
            where: {
                id
            }
        })        
        if (users.length == 0) {
            deleteFile(`./public/img/people/${avatar}`)
            throw new Error("Usuário não encontrado!")
        }     
                      
        const result = await prismaClient.users.update({
            where: {
                id
            },
            data: {
                avatar
            }
        })       
        if(result)   
        deleteFile(`./public/img/people/${users[0].avatar}`)          
        return response.json(result);           
    }
    async validUser(request: Request, response: Response){
        const {status, id, authorId} = request.body
        if(id){
            await prismaClient.users.update({
                where: {
                    id
                       
                },
                data: {
                    status,
                    authorId
                }
            })

            return response.json()
        }
}
       
    async findByStatusInvestor(request: Request, response: Response){
        const {status,pag} = request.params

        if(status === "Todos"){
            const result = await prismaClient.users.findMany({
                skip: Number(pag)*10,
                take: 10,
                orderBy: {
                    date_create: 'desc'
                }     
            })
            return response.json(result)
        }else{
            const result = await prismaClient.users.findMany({
                where: {
                    status
                },
                skip: Number(pag)*10,
                take: 10,
                orderBy: {
                    date_create: 'desc'
                }     
            })
            return response.json(result)
        }
        

        return response.json()
    }
}