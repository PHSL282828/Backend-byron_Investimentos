import prismaClient from "../../prisma";
import {Request,Response} from "express"
import { CreateUserService } from "../../services/user/CreateUserService";


class CreateUserController{

    async handle(request:Request, response:Response){
        const {name,email,password}=request.body;//desestrutura a requisição e  joga os valores para as variaveis dentro de {}
        const createUserService= new CreateUserService();
        const newUser= await createUserService.execute({name,email,password});
        return response.json(newUser);
    }

}

export {CreateUserController};




