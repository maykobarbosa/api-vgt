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

        return response.json();
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
    // async consulta(request: Request, response: Response){  
        
    //     const {id, nome, cpf, matricula, perfil, pag } = request.body
    //     if(id) {
    //         const result = await prismaClient.users.findMany({
    //             // skip: Number(pag),
    //             // take: 10,
    //             orderBy: {
    //                 full_name: "asc"
    //             },
    //             where: { 
                   
    //                         id: {
    //                             equals: id
    //                         }
                       
                    
    //             }
    //         })
            
    //         return response.json(result);   
    //     }else if(perfil){
    //         const result = await prismaClient.users.findMany({
    //             // skip: Number(pag),
    //             // take: 10,
    //             orderBy: {
    //                 full_name: "asc"
    //             },
    //             where: { 
    //                 AND: [
    //                     {
    //                         perfil: {
    //                             equals: perfil
    //                         }
    //                     },
    //                     {
    //                         OR: [
    //                             {
    //                                 nome_completo: {
    //                                     contains: nome
    //                                 }
    //                             },
    //                             {
    //                                 nome_guerra: {
    //                                     contains: nome
    //                                 }
    //                             }
    //                         ]    
    //                     }
    //                 ]
                                   
    //             }   
    //         })
            
    //         return response.json(result); 
    //     }else if(nome) {
    //         const result = await prismaClient.users.findMany({
    //             // skip: Number(pag),
    //             // take: 10,
    //             orderBy: {
    //                 nome_completo: "asc"
    //             },
    //             where: { 
    //                 OR: [
    //                     {
    //                         nome_completo: {
    //                             contains: nome
    //                         }
    //                     },
    //                     {
    //                         nome_guerra: {
    //                             contains: nome
    //                         }
    //                     }
    //                 ]
                    
    //             }
    //         })
            
    //         return response.json(result);   
    //     }else if(cpf){
    //         const result = await prismaClient.users.findMany({
    //             // skip: Number(pag),
    //             // take: 10,
    //             orderBy: {
    //                 nome_completo: "asc"
    //             },
    //             where: { 
    //                 cpf: {
    //                     contains: cpf
    //                 }
    //             }         
    //         })
            
    //         return response.json(result); 
    //     }else if(matricula){
    //         const result = await prismaClient.users.findMany({
    //             // skip: Number(pag),
    //             // take: 10,
    //             orderBy: {
    //                 nome_completo: "asc"
    //             },
    //             where: { 
    //                 matricula: {
    //                     contains: matricula
    //                 }
    //             }         
    //         })
            
    //         return response.json(result); 
        
    //     }
    // }

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
            }
        })
      
        if (!user) {
          throw new Error("Usuário não encontrado!")
        }
      
        // check if password match
        const checkPassword = await bcrypt.compare(password, user.password)
      
        if (!checkPassword) {
            throw new Error("Senha inválida!")
        }      
        
        const token = Jwt.sign({
                id: user.id,
                full_name: user.full_name,
                profile: user.profile,
                email: user.email
            },
            "7d14e4b1831c8aa556f9720b5f74c4d7",
            {
                subject: user.id,
                expiresIn: '30min'
            }
          )

        
        return response.status(200).json({ msg: "Autenticação realizada com sucesso!", token, user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            fone: user.fone,
            profile: user.profile
        }})
       
      
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
                const user = await prismaClient.users.findUnique({ where: { id: decoded.id } });
            
                if (!user) {
                    return response.status(401).send("Invalid refresh token");
                }                         
                
                // Gera um novo token de acesso com uma nova data de expiração
                
                const token = Jwt.sign({
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    fone: user.fone,
                    profile: user.profile
                },"7d14e4b1831c8aa556f9720b5f74c4d7",
                {
                    subject: user.id,
                    expiresIn: '30min'
                }
            )

        
            return response.status(200).json({ msg: "Autenticação realizada com sucesso!", token, user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                fone: user.fone,
                profile: user.profile
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
            subject: "NOCTUA - Redefinição de senha",
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
}