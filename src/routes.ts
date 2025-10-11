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
router.get("/investments", isAuthenticated, new GetInvestmentController().handle);
router.put("/investments", isAuthenticated, new UpdateInvestmentController().handle);
router.delete("/investments", isAuthenticated, new RemoveInvestmentController().handle);
router.get("/investments/all", isAuthenticated, new GetAllInvestmentsController().handle);

export {router}