import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { uploadFileToS3 } from "../utils/S3/uploadFIleS3";
import { getPresignedUrl } from "../utils/S3/getPresignedUrl";

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
        const contratos_firmados = files["contratos_firmados"]?.[0];
        const contratos_pendentes = files["contratos_pendentes"]?.[0];


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
        if (!imposto || !ytd || !despesas || !dividas || !receitas || !contratos_firmados || !contratos_pendentes) {
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
            const contratosUrl = await uploadFileToS3(contratos_firmados, donoId)
            const contratosPendentesUrl = await uploadFileToS3(contratos_pendentes, donoId)

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
                    receitas: receitasUrl,
                    contratos_firmados: contratosUrl,
                    contratos_pendentes: contratosPendentesUrl
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

    async listCompanies(req: Request, res: Response) {
        const {
            donoId
        } = req.params

        try {
            const empresas = await prismaClient.companies.findMany({
                where: {
                    donoId: donoId
                }
            })

            const empresasComUrl = await Promise.all(empresas.map(async (empresa) => {
                const urlLogotipo = await getPresignedUrl(empresa.logotipo)
                const urlImposto = await getPresignedUrl(empresa.imposto)
                const urlYtd = await getPresignedUrl(empresa.YTD)
                const urlDespesas = await getPresignedUrl(empresa.despesas)
                const urlDividas = await getPresignedUrl(empresa.dividas)
                const urlReceitas = await getPresignedUrl(empresa.receitas)
                const urlContratosFirmados = await getPresignedUrl(empresa.contratos_firmados)
                const urlContratosPendentes = await getPresignedUrl(empresa.contratos_pendentes)

                return {
                    ...empresa,
                    logotipo: urlLogotipo,
                    imposto: urlImposto,
                    YTD: urlYtd,
                    despesas: urlDespesas,
                    dividas: urlDividas,
                    receitas: urlReceitas,
                    contratos_firmados: urlContratosFirmados,
                    contratos_pendentes: urlContratosPendentes,
                    porcentagem: empresa.status === "ANALISE" ? 50 : 100
                }
            }))

            return res.status(200).json({
                sucess: "Empresas listadas com sucesso.",
                data: empresasComUrl
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar empresas.", error
            })
        }
    }
}