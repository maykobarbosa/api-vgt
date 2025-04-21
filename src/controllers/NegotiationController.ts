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

        try {
            const proposta = await prismaClient.proposta.create({
                data: {
                    titulo,
                    descricao,
                    valor_investimento,
                    participacao_acionaria,
                    companyId,
                    autorId,
                    status: "PENDENTE",
                    statusNegociacao: "PENDENTE"
                }
            })

            await prismaClient.mensagens.create({
                data: {
                    autorId: proposta.autorId,
                    propostaId: proposta.id,
                    mensagem: proposta.descricao,
                    valor_investimento: proposta.valor_investimento,
                    participacao_acionaria: proposta.participacao_acionaria
                }
            })

            return res.status(201).json({
                sucess: "Proposta de investimento criada com sucesso.",
                data: {
                    ...proposta,
                    valor_investimento: proposta.valor_investimento.toString(),
                    participacao_acionaria: proposta.participacao_acionaria.toString()
                }
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

            const propostasAtualizadas = propostas.map(proposta => ({
                ...proposta,
                valor_investimento: proposta.valor_investimento.toString(),
                participacao_acionaria: proposta.participacao_acionaria.toString()
            }))

            return res.status(200).json({
                sucess: "Proposta listadas com sucesso.",
                data: propostasAtualizadas
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar propostas por usuário.", error
            })
        }
    }

    async ListarPropostasPorEmpresa(req: Request, res: Response) {
        const {
            usuarioId,
        } = req.params

        if (!usuarioId) {
            return res.status(400).json({
                msgError: "Usuario não foi informada."
            })
        }

        const empresas = await prismaClient.companies.findMany({
            where: {
                donoId: usuarioId
            },
            select: {
                id: true,
            }
        })

        try {
            const empresaIds = empresas.map(empresa => empresa.id)

            const propostas = await prismaClient.proposta.findMany({
                where: {
                    companyId: {
                        in: empresaIds
                    }
                },
                orderBy: {
                    date_create: "desc"
                }
            })

            const propostasAtualizadas = propostas.map(proposta => ({
                ...proposta,
                valor_investimento: proposta.valor_investimento.toString(),
                participacao_acionaria: proposta.participacao_acionaria.toString()
            }))

            return res.status(200).json({
                success: "Propostas listadas com sucesso.",
                data: propostasAtualizadas
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar propostas por empresa.", error
            })
        }
    }

    async ListarPropostaPorId(req: Request, res: Response) {
        const {
            propostaId
        } = req.params

        if (!propostaId) {
            return res.status(400).json({
                msgError: "Proposta não informada."
            })
        }

        const proposta = await prismaClient.proposta.findUnique({
            where: {
                id: propostaId
            }
        })

        if (!proposta) {
            return res.status(400).json({
                msgError: "Proposta não encontrada no banco de dados."
            })
        }

        try {
            const propostaAtualizada = {
                ...proposta,
                valor_investimento: proposta.valor_investimento.toString(),
                participacao_acionaria: proposta.participacao_acionaria.toString()
            }

            return res.status(200).json({
                success: "Proposta listada com sucesso.",
                data: propostaAtualizada
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar proposta por id.", error
            })
        }
    }

    async ListarMensagens(req: Request, res: Response) {
        const {
            propostaId
        } = req.params

        if (!propostaId) {
            return res.status(400).json({
                msgError: "Proposta não informada."
            })
        }

        const proposta = await prismaClient.proposta.findUnique({
            where: {
                id: propostaId
            }
        })

        if (!proposta) {
            return res.status(400).json({
                msgError: "Proposta não encontrada no banco de dados."
            })
        }
        try {
            const mensagens = await prismaClient.mensagens.findMany({
                where: {
                    propostaId: propostaId
                },
                orderBy: {
                    date_create: "asc"
                }
            })

            const mensagensAtualizadas = mensagens.map(mensagem => ({
                ...mensagem,
                valor_investimento: mensagem.valor_investimento?.toString(),
                participacao_acionaria: mensagem.participacao_acionaria?.toString()
            }))

            return res.status(200).json({
                success: "Mensagens listadas com sucesso.",
                data: mensagensAtualizadas
            })

        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar negociação.", error
            })
        }
    }

    async CriarMensagem(req: Request, res: Response) {
        const {
            propostaId,
            autorId,
            mensagem,
            valor_investimento,
            participacao_acionaria
        } = req.body

        if (!propostaId || !autorId) {
            return res.status(400).json({
                msgError: "Proposta ou autor não informados."
            })
        }

        const proposta = await prismaClient.proposta.findUnique({
            where: {
                id: propostaId
            }
        })

        const autor = await prismaClient.users.findUnique({
            where: {
                id: autorId
            }
        })

        if (!proposta || !autor) {
            return res.status(400).json({
                msgError: "Proposta ou autor não encontrados no banco de dados."
            })
        }

        if (!mensagem) {
            return res.status(400).json({
                msgError: "Mensagem não foi informada."
            })
        }

        try {
            const novaMensagem = await prismaClient.mensagens.create({
                data: {
                    propostaId,
                    autorId,
                    mensagem,
                    valor_investimento: valor_investimento ? valor_investimento : null,
                    participacao_acionaria: participacao_acionaria ? participacao_acionaria : null
                },
            })

            return res.status(201).json({
                success: "Mensagem criada com sucesso.",
                data: {
                    ...novaMensagem,
                    valor_investimento: novaMensagem.valor_investimento?.toString(),
                    participacao_acionaria: novaMensagem.participacao_acionaria?.toString()
                }
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao criar mensagem.", error
            })
        }
    }

    async AtualizarProposta(req: Request, res: Response) {
        const {
            propostaId,
            status
        } = req.body

        if (!propostaId) {
            return res.status(400).json({
                msgError: "Proposta não encontrada"
            })
        }

        const proposta = await prismaClient.proposta.findUnique({
            where: {
                id: propostaId
            }
        })

        if (!proposta) {
            return res.status(400).json({
                msgError: "Proposta não encontrada no banco de dados."
            })
        }

        try {
            const propostaAtualizada = await prismaClient.proposta.update({
                where: {
                    id: propostaId
                },
                data: {
                    status: status
                }
            })

            return res.status(200).json({
                success: "Proposta atualizada com sucesso.",
                data: {
                    ...propostaAtualizada,
                    valor_investimento: propostaAtualizada.valor_investimento.toString(),
                    participacao_acionaria: propostaAtualizada.participacao_acionaria.toString()
                }
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar proposta.", error
            })
        }
    }

    async AtualizarNegociacao(req: Request, res: Response) {
        const {
            propostaId,
            statusNegociacao
        } = req.body

        if (!propostaId) {
            return res.status(400).json({
                msgError: "Proposta não encontrada"
            })
        }

        const proposta = await prismaClient.proposta.findUnique({
            where: {
                id: propostaId
            }
        })

        if (!proposta) {
            return res.status(400).json({
                msgError: "Proposta não encontrada no banco de dados."
            })
        }

        try {
            const propostaAtualizada = await prismaClient.proposta.update({
                where: {
                    id: propostaId
                },
                data: {
                    statusNegociacao: statusNegociacao
                }
            })

            return res.status(200).json({
                success: "Negociação atualizada com sucesso.",
                data: {
                    ...propostaAtualizada,
                    valor_investimento: propostaAtualizada.valor_investimento.toString(),
                    participacao_acionaria: propostaAtualizada.participacao_acionaria.toString()
                }
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar negociação.", error
            })
        }
    }
}