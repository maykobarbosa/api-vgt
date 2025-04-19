import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { uploadFileToS3 } from "../utils/S3/uploadFIleS3";
import { getPresignedUrl } from "../utils/S3/getPresignedUrl";

export class CompanyController {
    async CriarNovaEmpresa(req: Request, res: Response) {
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

        const logotipo = req.file

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

        try {
            // Fazer upload do logotipo para o S3.
            const logotipoUrl = await uploadFileToS3(logotipo, donoId)
            const patrimonioInt = parseInt(patrimonio)
            const reservaFinanceiraInt = parseInt(reserva_financeira)
            const projecaoCrescimentoInt = parseInt(projecao_crescimento)

            if (isNaN(patrimonioInt) || isNaN(reservaFinanceiraInt) || isNaN(projecaoCrescimentoInt)) {
                return res.status(400).json({
                    msgError: "Campos numéricos inválidos."
                })
            }

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
                    patrimonio: patrimonioInt,
                    reserva_financeira: reservaFinanceiraInt,
                    acordo_operacional,
                    estrutura_governanca,
                    projecao_crescimento: projecaoCrescimentoInt,
                    projecao_futura,
                    competidores,
                    donoId,
                    logotipo: logotipoUrl,
                }
            })

            const empresaAtualizada = {
                ...novaEmpresa,
                patrimonio: patrimonioInt.toString(),
                reserva_financeira: reservaFinanceiraInt.toString(),
            }

            // Retornar a empresa criada.
            return res.status(201).json({
                sucess: "Empresa criada com sucesso.",
                data: empresaAtualizada
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao criar nova empresa.", error
            })
        }
    }

    async AnexarDocumentosEmpresa(req: Request, res: Response) {
        const {
            companyId,
        } = req.body

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const imposto = files["imposto"]?.[0];
        const ytd = files["ytd"]?.[0];
        const despesas = files["despesas"]?.[0];
        const dividas = files["dividas"]?.[0];
        const receitas = files["receitas"]?.[0];
        const contratos_firmados = files["contratos_firmados"]?.[0];
        const contratos_pendentes = files["contratos_pendentes"]?.[0];

        if (!companyId) {
            return res.status(400).json({
                msgError: "CompanyId não foi informado."
            })
        }

        const empresa = await prismaClient.companies.findUnique({
            where: {
                id: companyId
            }
        })

        if (!empresa) {
            return res.status(400).json({
                msgError: "Empresa não foi encontrada no banco de dados."
            })
        }

        if (!imposto && !ytd && !despesas && !dividas && !receitas && !contratos_firmados && !contratos_pendentes) {
            return res.status(400).json({
                msgError: "Nenhum documento foi informado."
            })
        }

        try {
            let documents: any = {}

            if (imposto) {
                documents.imposto = await uploadFileToS3(imposto, companyId)
            }

            if (ytd) {
                documents.YTD = await uploadFileToS3(ytd, companyId)
            }

            if (despesas) {
                documents.despesas = await uploadFileToS3(despesas, companyId)
            }

            if (dividas) {
                documents.dividas = await uploadFileToS3(dividas, companyId)
            }

            if (receitas) {
                documents.receitas = await uploadFileToS3(receitas, companyId)
            }

            if (contratos_firmados) {
                documents.contratos_firmados = await uploadFileToS3(contratos_firmados, companyId)
            }

            if (contratos_pendentes) {
                documents.contratos_pendentes = await uploadFileToS3(contratos_pendentes, companyId)
            }

            await prismaClient.companies.update({
                where: {
                    id: companyId
                },
                data: documents,
            })


            return res.status(200).json({
                sucess: "Documentos anexados com sucesso.",
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao anexar documentos.", error
            })
        }
    }

    async ListarEmpresasPeloUsuarioId(req: Request, res: Response) {
        const { donoId } = req.params;

        try {
            const empresas = await prismaClient.companies.findMany({
                where: { donoId }
            });

            const empresasComUrl = await Promise.all(
                empresas.map(async (empresa) => {
                    const urlLogotipo = await getPresignedUrl(empresa.logotipo);
                    const urlImposto = empresa.imposto
                        ? await getPresignedUrl(empresa.imposto)
                        : null;
                    const urlYtd = empresa.YTD
                        ? await getPresignedUrl(empresa.YTD)
                        : null;
                    const urlDespesas = empresa.despesas
                        ? await getPresignedUrl(empresa.despesas)
                        : null;
                    const urlDividas = empresa.dividas
                        ? await getPresignedUrl(empresa.dividas)
                        : null;
                    const urlReceitas = empresa.receitas
                        ? await getPresignedUrl(empresa.receitas)
                        : null;
                    const urlContratosFirmados = empresa.contratos_firmados
                        ? await getPresignedUrl(empresa.contratos_firmados)
                        : null;
                    const urlContratosPendentes = empresa.contratos_pendentes
                        ? await getPresignedUrl(empresa.contratos_pendentes)
                        : null;

                    const docs = [
                        urlImposto,
                        urlYtd,
                        urlDespesas,
                        urlDividas,
                        urlReceitas,
                        urlContratosFirmados,
                        urlContratosPendentes,
                    ];

                    const documentsCount = docs.filter((u) => u != null).length;

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
                        quantidade_documentos: documentsCount,
                        porcentagem: empresa.status === "ANALISE" ? 50 : 100,
                        patrimonio: empresa.patrimonio.toString(),
                        reserva_financeira: empresa.reserva_financeira.toString(),
                    };
                })
            );

            return res.status(200).json({
                sucess: "Empresas listadas com sucesso.",
                data: empresasComUrl,
            });
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar empresas.",
                error,
            });
        }
    }

    async ListarEmpresasAprovadas(req: Request, res: Response) {
        try {
            const empresas = await prismaClient.companies.findMany({
                where: {
                    status: "APROVADO"
                }
            })

            const empresasComUrl = await Promise.all(empresas.map(async (empresa) => {
                const urlLogotipo = await getPresignedUrl(empresa.logotipo)

                return {
                    id: empresa.id,
                    nome: empresa.nome,
                    email: empresa.email,
                    setor: empresa.setor,
                    biografia: empresa.biografia,
                    contato: empresa.contato,
                    endereco: empresa.endereco,
                    instagram: empresa.instagram,
                    facebook: empresa.facebook,
                    linkedin: empresa.linkedin,
                    youtube: empresa.youtube,
                    x: empresa.x,
                    site: empresa.site,
                    patrimonio: empresa.patrimonio.toString(),
                    reserva: empresa.reserva_financeira.toString(),
                    projecao_crescimento: empresa.projecao_crescimento,
                    donoId: empresa.donoId,
                    logotipo: urlLogotipo,
                }
            }))

            return res.status(200).json({
                sucess: "Empresas aprovadas foram listadas com sucesso.",
                data: empresasComUrl
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar empresas por status.", error
            })
        }
    }

    async ListarEmpresaPorId(req: Request, res: Response) {
        const {
            empresaId
        } = req.params

        if (!empresaId) {
            return res.status(400).json({
                msgError: "Empresa não foi informada."
            })
        }

        const empresa = await prismaClient.companies.findUnique({
            where: {
                id: empresaId
            }
        })

        if (!empresa) {
            return res.status(400).json({
                msgError: "Empresa não foi encontrada no banco de dados."
            })
        }

        try {
            return res.status(200).json({
                sucess: "Empresa listada com sucesso.",
                data: {
                    id: empresa.id,
                    nome: empresa.nome,
                    email: empresa.email,
                    setor: empresa.setor,
                    biografia: empresa.biografia,
                    contato: empresa.contato,
                    endereco: empresa.endereco,
                    instagram: empresa.instagram,
                    facebook: empresa.facebook,
                    linkedin: empresa.linkedin,
                    youtube: empresa.youtube,
                    x: empresa.x,
                    site: empresa.site,
                    patrimonio: empresa.patrimonio.toString(),
                    reserva_financeira: empresa.reserva_financeira.toString(),
                    acordo_operacional: empresa.acordo_operacional,
                    estrutura_governanca: empresa.estrutura_governanca,
                    projecao_crescimento: empresa.projecao_crescimento,
                    projecao_futura: empresa.projecao_futura,
                    competidores: empresa.competidores,
                    donoId: empresa.donoId,
                    logotipo: await getPresignedUrl(empresa.logotipo),
                    imposto: empresa.imposto ? await getPresignedUrl(empresa.imposto) : null,
                    YTD: empresa.YTD ? await getPresignedUrl(empresa.YTD) : null,
                    despesas: empresa.despesas ? await getPresignedUrl(empresa.despesas) : null,
                    dividas: empresa.dividas ? await getPresignedUrl(empresa.dividas) : null,
                    receitas: empresa.receitas ? await getPresignedUrl(empresa.receitas) : null,
                    contratos_firmados: empresa.contratos_firmados ? await getPresignedUrl(empresa.contratos_firmados) : null,
                    contratos_pendentes: empresa.contratos_pendentes ? await getPresignedUrl(empresa.contratos_pendentes) : null,
                    status: empresa.status
                }
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar empresas por status.", error
            })
        }
    }

    async ListarTodasAsEmpresas(req: Request, res: Response) {
        try {
            const empresas = await prismaClient.companies.findMany()

            const empresasComUrl = await Promise.all(empresas.map(async (empresa) => {
                const urlLogotipo = await getPresignedUrl(empresa.logotipo)
                const urlImposto = empresa.imposto ? await getPresignedUrl(empresa.imposto) : null
                const urlYtd = empresa.YTD ? await getPresignedUrl(empresa.YTD) : null
                const urlDespesas = empresa.despesas ? await getPresignedUrl(empresa.despesas) : null
                const urlDividas = empresa.dividas ? await getPresignedUrl(empresa.dividas) : null
                const urlReceitas = empresa.receitas ? await getPresignedUrl(empresa.receitas) : null
                const urlContratosFirmados = empresa.contratos_firmados ? await getPresignedUrl(empresa.contratos_firmados) : null
                const urlContratosPendentes = empresa.contratos_pendentes ? await getPresignedUrl(empresa.contratos_pendentes) : null

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
                    patrimonio: empresa.patrimonio.toString(),
                    reserva_financeira: empresa.reserva_financeira.toString(),
                }
            }))

            return res.status(200).json({
                sucess: "Todas as empresas foram listadas com sucesso.",
                data: empresasComUrl
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao listar todas as empresas.", error
            })
        }
    }

    async AtualizarStatusEmpresa(req: Request, res: Response) {
        const {
            companyId,
            status
        } = req.body

        if (!companyId) {
            return res.status(400).json({
                msgError: "Empresa não foi informada."
            })
        }

        const empresa = await prismaClient.companies.findUnique({
            where: {
                id: companyId
            }
        })

        if (!empresa) {
            return res.status(400).json({
                msgError: "Empresa não foi encontrada no banco de dados."
            })
        }

        if (!status) {
            return res.status(400).json({
                msgError: "Status não foi informado."
            })
        }

        try {
            const empresaAtualizada = await prismaClient.companies.update({
                where: {
                    id: companyId
                },
                data: {
                    status: status
                }
            })

            return res.status(200).json({
                sucess: "Status da empresa foi atualizado com sucesso.",
                data: {
                    ...empresaAtualizada,
                    patrimonio: empresa.patrimonio.toString(),
                    reserva_financeira: empresa.reserva_financeira.toString(),
                    acordo_operacional: empresa.acordo_operacional,
                    estrutura_governanca: empresa.estrutura_governanca,
                    projecao_crescimento: empresa.projecao_crescimento,
                    projecao_futura: empresa.projecao_futura,
                    competidores: empresa.competidores,
                    logotipo: await getPresignedUrl(empresaAtualizada.logotipo),
                    imposto: empresaAtualizada.imposto ? await getPresignedUrl(empresaAtualizada.imposto) : null,
                    YTD: empresaAtualizada.YTD ? await getPresignedUrl(empresaAtualizada.YTD) : null,
                    despesas: empresaAtualizada.despesas ? await getPresignedUrl(empresaAtualizada.despesas) : null,
                    dividas: empresaAtualizada.dividas ? await getPresignedUrl(empresaAtualizada.dividas) : null,
                    receitas: empresaAtualizada.receitas ? await getPresignedUrl(empresaAtualizada.receitas) : null,
                    contratos_firmados: empresaAtualizada.contratos_firmados ? await getPresignedUrl(empresaAtualizada.contratos_firmados) : null,
                    contratos_pendentes: empresaAtualizada.contratos_pendentes ? await getPresignedUrl(empresaAtualizada.contratos_pendentes) : null,
                }
            })
        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao atualizar status da empresa.", error
            })
        }
    }

    async DeletarEmpresa(req: Request, res: Response) {
        const {
            companyId
        } = req.params

        if (!companyId) {
            return res.status(400).json({
                msgError: "Empresa não foi informada."
            })
        }

        const empresa = await prismaClient.companies.findUnique({
            where: {
                id: companyId
            }
        })

        if (!empresa) {
            return res.status(400).json({
                msgError: "Empresa não foi encontrada no banco de dados."
            })
        }

        if (empresa.status !== "LIXEIRA") {
            return res.status(400).json({
                msgError: "Empresa não está na lixeira, ela não pode ser deletada definitivamente."
            })
        }

        try {
            await prismaClient.companies.delete({
                where: {
                    id: companyId
                }
            })

            return res.status(200).json({
                success: "Empresa deletada com sucesso!"
            })

        } catch (error) {
            return res.status(500).json({
                msgServerError: "Erro ao deletar empresa.", error
            })
        }
    }
}