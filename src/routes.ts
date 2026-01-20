import {Router, Request, Response} from "express"
import { CreateUserController } from "./controllers/user/CreateUserController";
import { LoginUserController } from "./controllers/user/auth/LoginUserController";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { CreateInvestmentController } from "./controllers/investments/CreateInvestmentController";
import { GetInvestmentController } from "./controllers/investments/GetInvestmentController";
import { UpdateInvestmentController } from "./controllers/investments/UpdateInvestmentController";
import { RemoveInvestmentController } from "./controllers/investments/RemoveInvestmentController";
import { GetAllInvestmentsController } from "./controllers/investments/GetAllInvestmentsController";
import { LogoutUserController } from "./controllers/user/auth/LogoutUserController";
import { GetInvestmentsByUserController } from "./controllers/investments/GetInvestmentsByUserController";


const router = Router();
router.get('/test', (request:Request, response:Response)=>{
    return response.json({ok:true})
})

//rotas de usuário
router.post("/user", new CreateUserController().handle);
router.post("/user/login", new LoginUserController().handle);
router.post("/user/logout",isAuthenticated, new LogoutUserController().handle);

//rotas de investimento
router.post("/investments", isAuthenticated, new CreateInvestmentController().handle);
router.get("/investments/user", isAuthenticated, new GetInvestmentsByUserController().handle)
router.get("/investments/get", isAuthenticated, new GetInvestmentController().handle);
router.put("/investments/edit", isAuthenticated, new UpdateInvestmentController().handle);
router.delete("/investments/remove", isAuthenticated, new RemoveInvestmentController().handle);
router.get("/investments/all", isAuthenticated, new GetAllInvestmentsController().handle);

export {router}