import { UpdateInvestmentService } from "../../services/investment/UpdateInvestmentService"
import {Request, Response} from "express"

class UpdateInvestmentController{

    async handle(request:Request, response:Response){
        const investment_id= request.query.investment_id as string;
        const {quantity}=request.body;
        const updateInvestmentService = new UpdateInvestmentService();
        const updatedInvestment=  await updateInvestmentService.execute({investment_id, quantity});
        return response.json(updatedInvestment)
    }


}
export {UpdateInvestmentController}



