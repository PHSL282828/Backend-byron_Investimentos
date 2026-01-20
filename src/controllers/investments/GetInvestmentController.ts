import { GetInvestmentService } from "../../services/investment/GetInvestmentService"
import {Request, Response} from "express"

class GetInvestmentController {

    async handle(request:Request, response:Response){

        const investment_id=request.query.investment_id as string;
        const getInvestmentService = new GetInvestmentService();
        const investment = await getInvestmentService.execute({investment_id});
        return response.json (investment)


    }


}

export {GetInvestmentController}


