import {Request, Response} from "express"
import { ProfileUserRequest } from "../../interfaces/user/ProfileUserRequest"
import { ProfileUserService } from "../../services/user/ProfileUserService"

class ProfileUserController{
    async handle(request:Request, response:Response){
        const {user_id}:ProfileUserRequest = request.body;
        const profileUserService= new ProfileUserService();
        const userData= await profileUserService.execute({user_id});
        return response.json(userData);
    }
}

export {ProfileUserController}




