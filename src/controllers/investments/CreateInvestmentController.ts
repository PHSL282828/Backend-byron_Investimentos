import { CreateInvestmentService } from "../../services/investment/CreateInvestmentService";
import {Request, Response} from "express"

class CreateInvestmentController{

    async handle (request:Request, response:Response){
        const {name,ticker,investedValue,quantity,user_id} = request.body;
        const createInvestmentService = new CreateInvestmentService();
        const investment= await createInvestmentService.execute({name,ticker,investedValue,quantity,user_id});
        return response.json(investment);

    }


}
export {CreateInvestmentController}

