import { RemoveInvestmentService } from "../../services/investment/RemoveInvestmentService";
import {Request, Response} from "express"

class RemoveInvestmentController {

    async handle(request:Request, response:Response){

        const investment_id=request.query.investment_id as string;
        const removeInvestmentService = new RemoveInvestmentService();
        const investment = await removeInvestmentService.execute({investment_id});
        return response.json (investment)


    }


}

export{RemoveInvestmentController};

