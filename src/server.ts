import "express-async-errors"
import express, { NextFunction, Request, Response } from 'express'
import cors from "cors"

import { router } from './routes/routes'


const app = express()
// app.use(limiter);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    // res.header("Origin, X-Requested-With, X-PINGOTHER, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
    // res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
    app.use(cors({
        origin: true
      }))
    next()
  })
app.use(express.json())
app.use(router)

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if(err instanceof Error) {
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


//localhost:3333/

app.use(express.static('public'));
app.listen(36102, ()=>console.log("Servidor rodando na porta 36102!!"))