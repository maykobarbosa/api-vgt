import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";
import { getPresignedUrl } from "../utils/S3/getPresignedUrl";

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
                    avatar: "",
                    status: "PENDENTE"
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
                    status: "APROVADO"
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
            return res.json({
                invalido: "Credenciais inválidas."
            })
        }

        const validarSenha = await bcrypt.compare(senha, user.senha)

        if (!validarSenha) {
            return res.json({
                invalido: "Credenciais inválidas."
            })
        }

        if (user.status === "PENDENTE") {
            return res.json({
                pendente: "Sua conta ainda está em revisão, aguarde a aprovação."
            })
        }

        if (user.status === "RECUSADO") {
            return res.json({
                recusado: "Sua conta foi recusada, você não pode acessar a plataforma."
            })
        }

        if (user.status === "LIXEIRA") {
            return res.json({
                lixeira: "Sua conta foi removida da plataforma, entre em contato com o suporte."
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

        try {
            const avatar = user.avatar ? await getPresignedUrl(user.avatar) : "";

            return res.status(200).json({
                msg: "Usuário autenticado com sucesso!",
                token,
                user: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    tipo_usuario: user.type,
                    avatar: avatar,
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
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao autenticar usuário!"
            })
        }
    }

    async ListarUsuarioPeloId(req: Request, res: Response) {
        const {
            usuarioId
        } = req.params

        if (!usuarioId) {
            return res.status(400).json({
                msgError: "Usuário não foi informado."
            })
        }

        const usuario = await prismaClient.users.findUnique({
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(400).json({
                msgError: "Usuário não foi encontrado no banco de dados."
            })
        }

        try {
            const usuarioComUrl = {
                id: usuario.id,
                avatar: usuario.avatar ? await getPresignedUrl(usuario.avatar) : "",
                nome: usuario.nome,
                email: usuario.email,
                status: usuario.status,
                telefone: usuario.telefone,
                data_nascimento: usuario.data_nascimento,
                tempo_experiencia: usuario.tempo_experiencia,
                tipos_investimento: usuario.tipos_investimento,
                fontes_renda: usuario.fontes_renda,
                renda_anual: usuario.renda_anual,
                biografia: usuario.biografia,
                instagram: usuario.instagram,
                facebook: usuario.facebook,
                linkedin: usuario.linkedin,
                website: usuario.website,
            }

            return res.status(200).json({
                sucess: "Usuário listado com sucesso!",
                data: usuarioComUrl
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar usuário pelo ID."
            })
        }
    }

    async ListarInvestidores(req: Request, res: Response) {
        try {
            const usuarios = await prismaClient.users.findMany({
                where: {
                    type: "INVESTIDOR"
                }
            })

            const usuariosComUrl = await Promise.all(
                usuarios.map(async (usuario) => {
                    return {
                        ...usuario,
                        avatar: usuario.avatar ? await getPresignedUrl(usuario.avatar) : "",
                    };
                })
            );

            return res.status(200).json({
                sucess: "Usuários listado com sucesso!",
                data: usuariosComUrl
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar todos os usuários."
            })
        }
    }

    async ListarEmpreendedores(req: Request, res: Response) {
        try {
            const usuarios = await prismaClient.users.findMany({
                where: {
                    type: "EMPREENDEDOR"
                }
            })

            const usuariosComUrl = await Promise.all(
                usuarios.map(async (usuario) => {
                    return {
                        ...usuario,
                        avatar: usuario.avatar ? await getPresignedUrl(usuario.avatar) : "",
                    };
                })
            );

            return res.status(200).json({
                sucess: "Usuários listado com sucesso!",
                data: usuariosComUrl
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar todos os usuários."
            })
        }
    }

    async AtualizarStatusUsuario(req: Request, res: Response) {
        const {
            status,
            usuarioId
        } = req.body

        if (!usuarioId) {
            return res.status(400).json({
                msgError: "Usuário não foi informado."
            })
        }

        const usuario = await prismaClient.users.findUnique({
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(400).json({
                msgError: "Usuário não foi encontrado no banco de dados."
            })
        }

        if (!status) {
            return res.status(400).json({
                msgError: "Status não foi informado."
            })
        }

        try {
            const usuarioAtualizado = await prismaClient.users.update({
                where: {
                    id: usuarioId
                },
                data: {
                    status,
                }
            })

            return res.status(200).json({
                sucess: "Status do usuário atualizado com sucesso!",
                data: {
                    ...usuarioAtualizado,
                    avatar: usuarioAtualizado.avatar ? await getPresignedUrl(usuarioAtualizado.avatar) : ""
                }
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar status do usuário."
            })
        }
    }

    async DeletarUsuario(req: Request, res: Response) {
        const {
            usuarioId
        } = req.params

        if (!usuarioId) {
            return res.status(400).json({
                msgError: "Usuário não foi informado."
            })
        }

        const usuario = await prismaClient.users.findUnique({
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(400).json({
                msgError: "Usuário não foi encontrado no banco de dados."
            })
        }

        if (usuario.status !== "LIXEIRA") {
            return res.status(400).json({
                msgError: "Usuário não está na lixeira, ele não pode ser deletado definitivamente."
            })
        }

        try {
            await prismaClient.users.delete({
                where: {
                    id: usuarioId
                }
            })

            return res.status(200).json({
                success: "Usuário deletado com sucesso!"
            });
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            return res.status(500).json({
                msgServerError: "Erro interno ao deletar usuário."
            });
        }
    }
}