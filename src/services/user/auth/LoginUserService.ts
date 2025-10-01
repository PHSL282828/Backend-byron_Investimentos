import {compare} from "bcryptjs"
import {sign} from "jsonwebtoken"
import prismaClient from "../../../prisma/index"
import { LoginUserRequest } from "../../../interfaces/user/LoginUserRequest"



class LoginUserService{

    async execute ({email,password}: LoginUserRequest){
        
        const normalizedEmail = email?.trim().toLowerCase();
        if (!normalizedEmail){
            throw new Error ("Email necessário para login")
        }
        if(!password){
            throw new Error ("Senha necessária para login")
        }

        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        });

        const passwordMatch = await compare(password, user.password);// compara a senha com a senha com hash

        if(!user || !passwordMatch){
            throw new Error("Email ou senha incorretos");
        }

        const token = sign({
            name:user.name,
            email:user.email
        },
        process.env.JWT_SECRET as string,
        {
            subject:user.id,
            expiresIn: "1d"
            //estamos mexendo com investimentos, então um tempo mais curto para o token
            //é mais apropriado
        }
    
    );
    return {
                id:user.id,
                name: user.name,
                email:user.email,
                token: token
                
            };
    }

}

export {LoginUserService}