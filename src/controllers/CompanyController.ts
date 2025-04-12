import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { uploadFileToS3 } from "../utils/S3/uploadFIleS3";

export class CompanyController {
    async createCompany(req: Request, res: Response) {
        const {
            nome,
            email,
            setor,
            cnpj,
            contato,
            endereco,
            biografia,
            instagram,
            facebook,
            linkedin,
            youtube,
            x,
            site,
            patrimonio,
            reserva_financeira,
            acordo_operacional,
            estrutura_governanca,
            projecao_crescimento,
            projecao_futura,
            competidores,
            donoId
        } = req.body

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const logotipo = files["logotipo"]?.[0];
        const imposto = files["imposto"]?.[0];
        const ytd = files["ytd"]?.[0];
        const despesas = files["despesas"]?.[0];
        const dividas = files["dividas"]?.[0];
        const receitas = files["receitas"]?.[0];
        const contratos = files["contratos"]?.[0];


        // Verificar se existe donoId.
        if (!donoId) {
            return res.status(400).json({
                msgError: "DonoID não informado."
            })
        }

        // Buscar o usuário no banco de dados.
        const validarDonoId = await prismaClient.users.findUnique({
            where: {
                id: donoId
            }
        })

        // Verificar se o usuário existe no banco de dados.
        if (!validarDonoId) {
            return res.status(400).json({
                msgError: "DonoId não encontrado no banco de dados."
            })
        }

        // Verificar campos do primeiro passo.
        if (!nome || !email || !setor || !endereco || !cnpj || !contato || !logotipo) {
            return res.status(400).json({
                msgError: "Preencha os campos obrigatórios do primeiro passo."
            })
        }

        // Verificar campos do segundo passo.
        if (!patrimonio || !reserva_financeira || !acordo_operacional || !estrutura_governanca || !projecao_crescimento || !projecao_futura || !competidores) {
            return res.status(400).json({
                msgError: "Preencha os campos obrigatórios do segundo passo."
            })
        }

        // Verificar campos do terceiro passo.
        if (!imposto || !ytd || !despesas || !dividas || !receitas || !contratos) {
            return res.status(400).json({
                msgError: "Preencha os campos obrigatórios do terceiro passo."
            })
        }

        try {
            // Fazer upload do logotipo para o S3.
            const logotipoUrl = await uploadFileToS3(logotipo, donoId)
            const impostoUrl = await uploadFileToS3(imposto, donoId)
            const ytdurl = await uploadFileToS3(ytd, donoId)
            const despesasUrl = await uploadFileToS3(despesas, donoId)
            const dividasUrl = await uploadFileToS3(dividas, donoId)
            const receitasUrl = await uploadFileToS3(receitas, donoId)
            const contratosUrl = await uploadFileToS3(contratos, donoId)

            // Tentativa de criar a empresa no banco de dados.
            const novaEmpresa = await prismaClient.companies.create({
                data: {
                    nome,
                    email,
                    setor,
                    cnpj,
                    contato,
                    endereco,
                    biografia,
                    instagram,
                    facebook,
                    youtube,
                    linkedin,
                    x,
                    site,
                    patrimonio,
                    reserva_financeira,
                    acordo_operacional,
                    estrutura_governanca,
                    projecao_crescimento,
                    projecao_futura,
                    competidores,
                    donoId,
                    logotipo: logotipoUrl,
                    imposto: impostoUrl,
                    YTD: ytdurl,
                    despesas: despesasUrl,
                    dividas: dividasUrl,
                    caixa: receitasUrl,
                    contratos: contratosUrl
                }
            })

            // Retornar a empresa criada.
            return res.status(201).json({
                sucess: "Empresa criada com sucesso.",
                data: novaEmpresa
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao criar nova empresa.", error
            })
        }
    }
}