import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";

export class UserController {
    async RegistrarContaInvestidor(req: Request, res: Response) {
        const {
            nome,
            telefone,
            data_nascimento,
            email,
            senha,
            tempo_experiencia,
            tipos_investimento,
            fontes_renda,
            renda_anual,
        } = req.body

        if (!nome || !telefone || !data_nascimento || !email || !senha || !tempo_experiencia || !tipos_investimento || !fontes_renda || !renda_anual) {
            return res.status(400).json({
                msgError: "Todos os campos são obrigatórios!"
            })
        }

        const emailExistente = await prismaClient.users.findUnique({
            where: {
                email
            }
        })

        if (emailExistente) {
            return res.status(400).json({
                msgError: `Já existe uma conta cadastrada com este e-mail: ${email}`
            })
        }

        const passwordHash = await bcrypt.hash(senha, 10)

        try {
            const novoInvestidor = await prismaClient.users.create({
                data: {
                    nome,
                    telefone,
                    data_nascimento,
                    email,
                    senha: passwordHash,
                    tempo_experiencia,
                    tipos_investimento,
                    fontes_renda,
                    renda_anual,
                    type: "INVESTIDOR",
                    avatar: ""
                }
            })

            return res.status(201).json(novoInvestidor)
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao criar conta investidor!"
            })
        }
    }

    async RegistrarContaEmpreendedor(req: Request, res: Response) {
        const {
            nome,
            telefone,
            data_nascimento,
            email,
            senha
        } = req.body

        if (!nome || !telefone || !data_nascimento || !email || !senha) {
            return res.status(400).json({
                msgError: "Todos os campos são obrigatórios!"
            })
        }

        const emailExistente = await prismaClient.users.findUnique({
            where: {
                email
            }
        })

        if (emailExistente) {
            return res.status(400).json({
                msgError: "Já existe uma conta cadastrada com este e-mail: ${email}"
            })
        }

        const passwordHash = await bcrypt.hash(senha, 10)

        try {
            const novoEmpreendedor = await prismaClient.users.create({
                data: {
                    nome,
                    telefone,
                    data_nascimento,
                    email,
                    senha: passwordHash,
                    type: "EMPREENDEDOR",
                    avatar: "",
                }
            })

            return res.status(201).json(novoEmpreendedor)
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao criar conta empreendedor!"
            })
        }
    }

    async AutenticarUsuario(req: Request, res: Response) {
        const {
            email,
            senha
        } = req.body

        if (!email || !senha) {
            return res.status(400).json({
                msgError: "Email e senha são obrigatórios!"
            })
        }

        const user = await prismaClient.users.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(400).json({
                msgError: "E-mail não foi encontrado!"
            })
        }

        const validarSenha = await bcrypt.compare(senha, user.senha)

        if (!validarSenha) {
            return res.status(400).json({
                msgError: "Senha inválida!"
            })
        }

        const token = sign({
            id: user.id,
            email: user.email,
            type: user.type
        }, process.env.JWT_SECRET as string, {
            subject: user.id,
            expiresIn: "1h"
        })

        return res.status(200).json({
            msg: "Usuário autenticado com sucesso!",
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                tipo_usuario: user.type,
                avatar: user.avatar,
                isAdmin: user.Administrador,
                telefone: user.telefone,
                data_nascimento: user.data_nascimento,
                renda_anual: user.renda_anual,
                fontes_renda: user.fontes_renda,
                tipos_investimento: user.tipos_investimento,
                tempo_experiencia: user.tempo_experiencia,
                localizacao: user.localizacao,
                instragram: user.instagram,
                facebook: user.facebook,
                linkedin: user.linkedin,
                website: user.website,
                biografia: user.biografia,
            }
        })
    }
}