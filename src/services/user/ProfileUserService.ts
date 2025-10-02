import prismaClient from "../../prisma";
import { ProfileUserRequest } from "../../interfaces/user/ProfileUserRequest";

class ProfileUserService {
    async execute({user_id}:ProfileUserRequest){

        if (!user_id){
            throw new Error ("Email não enviado");
        }

        const userData = await prismaClient.user.findFirst({
            where:{
                id:user_id
            },
            select:{
                name:true,
                email:true,

            },
        })

        return userData;
    }
}



export {ProfileUserService}