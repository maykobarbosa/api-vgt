import bcrypt from "bcrypt";
import crypto from "crypto";
import { prismaClient } from "../src/database/prismaClient"

async function main() {
    const user = await prismaClient.users.findUnique({
        where: {
            email: "admin@admin.com"
        }
    })

    if (user) {
        await prismaClient.users.delete({
            where: {
                email: "admin@admin.com"
            }
        })
    }

    const senha = crypto.randomBytes(3).toString("hex").toUpperCase()
    const senhaHash = await bcrypt.hash(senha, 10)

    const criarContaAdmin = async () => await prismaClient.users.create({
        data: {
            type: "ADMINISTRADOR",
            status: "APROVADO",
            avatar: "",
            email: "admin@admin.com",
            senha: senhaHash,
            nome: "Administrador",
            telefone: "+1 (407) 600-4501",
            data_nascimento: "",
        }
    })

    console.log({
        email: "admin@admin.com",
        senha: senha
    })
    criarContaAdmin()
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prismaClient.$disconnect()
    })



