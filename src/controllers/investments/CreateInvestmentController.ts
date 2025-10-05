import { CreateInvestmentService } from "../../services/investments/CreateInvestmentService";
import {Request, Response} from "express"

class CreateInvestmentController{

    async handle (request:Request, response:Response){
        const {name,ticker,investedValue,quantity,user_id} = request.body;
        const createInvestmentService = new CreateInvestmentService();
        const investment= createInvestmentService.execute({name,ticker,investedValue,quantity,user_id});
        return response.json(investment);

    }

}

