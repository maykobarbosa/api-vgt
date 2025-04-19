import "express-async-errors"
import express, { NextFunction, Request, Response } from 'express'
import cors from "cors"

import { router } from './routes/routes'


const app = express()
// app.use(limiter);
const allowedOrigins = process.env.URL_FRONT?.split(',') || [];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Cache-Control',
        'Pragma',
        'Accept',
        'Expires' // 👈 novo header liberado aqui
    ],
    credentials: true
}));


app.use(express.json())
app.use(router)

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof Error) {
            return response.status(400).json({
                message: err.message,
            })
        }

        return response.status(500).json({
            status: "error",
            message: "Erro interno no servidor"
        })
    }
)

app.use(express.static('public'));
app.listen(36102, () => console.log("Servidor rodando na porta 36102!!"))

process.on('SIGINT', () => {
    console.log('Encerrando o servidor...')
    process.exit(0)
})

process.on('SIGTERM', () => {
    console.log('Encerrando o servidor...')
    process.exit(0)
})