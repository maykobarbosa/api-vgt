import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { deleteFile } from "../config/file";


export class DocsController{
    async create(request: Request, response: Response){
        const {
            companyId,
            title,
            authorId
        } = request.body

        const uri: string = String(request.file?.filename)

        const valid = await prismaClient.companies.findUnique({
            where: {
                id: companyId
            }
        })

        if(!valid){

            deleteFile(`./public/file/company/${uri}`)
            throw Error("Id de empresa inválido")
        }

        const result = await prismaClient.document.create({
            data: {
                companyId,
                title,
                uri,
                authorId
            }
        })

        return response.json(result)
    }

    async get(request:Request, response: Response){
        const {companyId} = request.params

        const result = await prismaClient.document.findMany({
            where:{
                companyId
            }
        })

        return response.json(result)
    }

    async delete(request: Request, response: Response){
        const {id} = request.params

        const valid = await prismaClient.document.findUnique({
            where: {
                id
            }
        })

        if(!valid){
            throw Error("Id inválido")
        }

        const result = await prismaClient.document.delete({
            where:{id}
        })
        deleteFile(`./public/file/company/${valid.uri}`)

        return response.json(result )
    }
}