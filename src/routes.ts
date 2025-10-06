import {Router, Request, Response} from "express"
import { CreateUserController } from "./controllers/user/CreateUserController";
import { LoginUserController } from "./controllers/user/auth/LoginUserController";

const router = Router();
router.get('/test', (request:Request, response:Response)=>{
    return response.json({ok:true})
})

//rotas de usuário
router.post("/user", new CreateUserController().handle);
router.post("/user/login", new LoginUserController().handle);

export {router}