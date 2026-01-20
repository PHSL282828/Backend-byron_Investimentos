import { GetInvestmentsByUserService } from "../../services/investment/GetInvestmentByUserService";
import {Request, Response} from "express"

class GetInvestmentsByUserController {

    async handle(request:Request, response:Response){

        const user_id=request.query.user_id as string;
        const getInvestmentService = new GetInvestmentsByUserService();
        const investment = await getInvestmentService.execute({user_id});
        return response.json (investment)


    }


}

export {GetInvestmentsByUserController}