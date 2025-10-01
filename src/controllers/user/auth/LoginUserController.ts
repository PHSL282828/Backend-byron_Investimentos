import {Request,Response} from "express"
import { LoginUserRequest } from "../../../interfaces/user/LoginUserRequest"
import { LoginUserService } from "../../../services/user/auth/LoginUserService"

class LoginUserController {


    async handle(request:Request, response:Response){
        const {email,password}:LoginUserRequest= request.body;
        const loginUserService= new LoginUserService();
        const loginRes=await loginUserService.execute({email,password})
        return response.json(loginRes)



    }

}

export {LoginUserController}