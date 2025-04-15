import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class NegotiationController {
    async CriarProposta(req: Request, res: Response) {
        const {
            titulo,
            descricao,
            valor_investimento,
            participacao_acionaria,
            companyId,
            autorId
        } = req.body

        if (!autorId || !companyId) {
            return res.status(400).json({
                msgError: "Autor ou empresa não foram informados."
            })
        }

        const autor = await prismaClient.users.findUnique({
            where: {
                id: autorId
            }
        })

        const empresa = await prismaClient.companies.findUnique({
            where: {
                id: companyId
            }
        })

        if (!autor || !empresa) {
            return res.status(400).json({
                msgError: "Autor ou empresa não foram encontrados no banco de dados."
            })
        }

        if (!titulo || !descricao || !valor_investimento || !participacao_acionaria) {
            return res.status(400).json({
                msgError: "Todos os campos são obrigatórios."
            })
        }

        const propostaExistente = await prismaClient.proposta.findFirst({
            where: {
                companyId,
                autorId
            }
        })

        if (propostaExistente) {
            return res.status(400).json({
                msgError: "Você já possui uma proposta para esta empresa."
            })
        }

        if (propostaExistente) {
            return res.status(400).json({

            })
        }
        try {
            const proposta = await prismaClient.proposta.create({
                data: {
                    titulo,
                    descricao,
                    valor_investimento,
                    participacao_acionaria,
                    companyId,
                    autorId,
                    status: "PENDENTE"
                }
            })

            return res.status(201).json({
                sucess: "Proposta de investimento criada com sucesso.",
                data: proposta
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao criar uma proposta de investimento.", error
            })
        }
    }

    async ListarPropostasPorUsuario(req: Request, res: Response) {
        const { usuarioId } = req.params

        if (!usuarioId) {
            return res.status(400).json({
                msgError: "Usuário não informado."
            })
        }

        const usuario = await prismaClient.users.findUnique({
            where: {
                id: usuarioId
            }
        })

        if (!usuario) {
            return res.status(400).json({
                msgError: "Usuário não encontrado."
            })
        }

        try {
            const propostas = await prismaClient.proposta.findMany({
                where: {
                    autorId: usuarioId
                }
            })

            return res.status(200).json({
                sucess: "Proposta listadas com sucesso.",
                data: propostas
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar propostas por usuário.", error
            })
        }
    }
}