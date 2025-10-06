import {Request, Response, NextFunction} from "express"
import { Payload } from "../services/user/auth/Payload"
import {verify} from "jsonwebtoken"
import prismaClient from "../prisma";

export async function isAuthenticated(request:Request, response:Response, next:NextFunction){

    //para criar um middleware primeiro precisamos verficar o token js do usuário
    const authToken = request.headers.authorization;//atenção a header e headers

    if (!authToken){
        return response.status(401).end;
    }

    const [, token]= authToken.split(" ") // coloca em token o authToken já formatado

    try{
        //verifica o token pelo verify, descriptografando a senha com o codigo no JWT_SECRET
        const {sub,jti} = verify(token,process.env.JWT_SECRET) as Payload;
        //adiciona o jti pra que seja possivel verificar individualmente os tokens

        const revogado = await prismaClient.tokenRevogado.findUnique({
            where:{
                jti:jti
            }
        })

        if(revogado){
            return response.send(401).end()
        }
        
        request.user_id=sub
        return next()
    }catch (error){
        return response.send(401).end()
    }

}




