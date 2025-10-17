import express, {Request, Response, NextFunction} from "express"
import {router} from './routes'
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../swagger.json"
import path from "path"


const app=express();
const port=3333;

app.use(express.json());
app.use(cors())
app.use("/v1/",router);//inicia o roteador pra enviar os dados entre api e local
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument) )
//inicializa o swagger para a documentação do codigo
app.use(router)


app.use((err:Error, request:Request, response:Response, next:NextFunction )=>{
    if (err instanceof Error){
        return response.status(400).json({
            error:err.message
        })
    }

    return response.status(500).json({
        status:'error',
        message: 'Internal server error.'
    })
})

app.get("/terms", (request:Request, response:Response)=>{
    response.json({
        message:"Termos de serviço"
    })
})

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port} - Projeto final grupo 2`)
})

