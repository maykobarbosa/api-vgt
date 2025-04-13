import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { getPresignedUrl } from "../utils/S3/getPresignedUrl";
import { deleteFileFromS3 } from "../utils/S3/deleteFileFromS3";
import { uploadFileToS3 } from "../utils/S3/uploadFIleS3";

export class ProfileController {
    async AtualizarNome(req: Request, res: Response) {
        const {
            novoNome,
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

        if (!novoNome) {
            return res.status(400).json({
                msgError: "Campo com o novo nome não foi informado."
            })
        }

        try {
            const novoNomeUsuario = await prismaClient.users.update({
                where: {
                    id: usuarioId
                },
                data: {
                    nome: novoNome
                },
                select: {
                    nome: true,
                }
            })

            return res.status(200).json({
                sucess: "Nome do usuário foi atualizado com sucesso.",
                data: novoNomeUsuario
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar o nome do usuário."
            })
        }
    }

    async AtualizarEmail(req: Request, res: Response) {
        const {
            novoEmail,
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

        if (!novoEmail) {
            return res.status(400).json({
                msgError: "Campo com o novo email não foi informado."
            })
        }

        try {
            const novoEmailUsuario = await prismaClient.users.update({
                where: {
                    id: usuarioId
                },
                data: {
                    email: novoEmail
                },
                select: {
                    email: true,
                }
            })

            return res.status(200).json({
                sucess: "Email do usuário foi atualizado com sucesso.",
                data: novoEmailUsuario
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar o email do usuário."
            })
        }
    }

    async AtualizarTelefone(req: Request, res: Response) {
        const {
            novoTelefone,
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

        if (!novoTelefone) {
            return res.status(400).json({
                msgError: "Campo com o novo telefone não foi informado."
            })
        }

        try {
            const novoTelefoneUsuario = await prismaClient.users.update({
                where: {
                    id: usuarioId
                },
                data: {
                    telefone: novoTelefone
                },
                select: {
                    telefone: true,
                }
            })

            return res.status(200).json({
                sucess: "Telefone do usuário foi atualizado com sucesso.",
                data: novoTelefoneUsuario
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar o telefone do usuário."
            })
        }
    }

    async AtualizarLocalizacao(req: Request, res: Response) {
        const {
            novaLocalizacao,
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

        if (!novaLocalizacao) {
            return res.status(400).json({
                msgError: "Campo com a nova localização não foi informado."
            })
        }

        try {
            const novaLocalizacaoUsuario = await prismaClient.users.update({
                where: {
                    id: usuarioId
                },
                data: {
                    localizacao: novaLocalizacao
                },
                select: {
                    localizacao: true,
                }
            })

            return res.status(200).json({
                sucess: "Localização do usuário foi atualizado com sucesso.",
                data: novaLocalizacaoUsuario
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar o localização do usuário."
            })
        }
    }

    async AtualizarBiografia(req: Request, res: Response) {
        const {
            novaBiografia,
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

        if (!novaBiografia) {
            return res.status(400).json({
                msgError: "Campo com a nova biografia não foi informado."
            })
        }

        try {
            const novaBiografiaUsuario = await prismaClient.users.update({
                where: {
                    id: usuarioId
                },
                data: {
                    biografia: novaBiografia
                },
                select: {
                    biografia: true,
                }
            })

            return res.status(200).json({
                sucess: "Biografia do usuário foi atualizado com sucesso.",
                data: novaBiografiaUsuario
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar o biografia do usuário."
            })
        }
    }

    async AtualizarAvatar(req: Request, res: Response) {
        const {
            usuarioId
        } = req.body

        const avatar = req.file


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

        if (!avatar) {
            return res.status(400).json({
                msgError: "Avatar não foi informado."
            })
        }

        try {
            if (usuario.avatar) {
                await deleteFileFromS3(usuario.avatar)
            }

            const avatarUrl = await uploadFileToS3(avatar, usuarioId)

            const avatarAtualizado = await prismaClient.users.update({
                where: {
                    id: usuarioId
                },
                data: {
                    avatar: avatarUrl
                },
                select: {
                    avatar: true
                }
            })

            return res.status(200).json({
                sucess: "Avatar do usuário foi atualizado com sucesso.",
                data: avatarAtualizado
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar o avatar do usuário."
            })
        }
    }

    async AtualizarRedesSociais(req: Request, res: Response) {
        const {
            usuarioId,
            instagram,
            facebook,
            linkedin,
            website
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

        if (!instagram && !facebook && !linkedin && !website) {
            return res.status(400).json({
                msgError: "Nenhuma rede social foi informada."
            })
        }

        try {
            let redes: any = {}

            if (instagram) {
                redes.instagram = instagram
            }

            if (facebook) {
                redes.facebook = facebook
            }

            if (linkedin) {
                redes.linkedin = linkedin
            }

            if (website) {
                redes.website = website
            }

            const redesAtualizadas = await prismaClient.users.update({
                where: {
                    id: usuarioId
                },
                data: redes,
                select: {
                    instagram: true,
                    facebook: true,
                    linkedin: true,
                    website: true
                }
            })

            return res.status(200).json({
                sucess: "Redes sociais do usuário foram atualizadas com sucesso.",
                data: redesAtualizadas
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar as redes sociais do usuário."
            })
        }
    }
}
