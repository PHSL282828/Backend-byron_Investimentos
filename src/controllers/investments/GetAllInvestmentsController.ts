import {Request,Response} from "express"
import { GetAllInvestmentService } from "../../services/investment/GetAllInvestmentsService"

class GetAllInvestmentsController{

    async handle(request:Request, response:Response){
       const getAllInvestmentsService= new GetAllInvestmentService();
       const investmentList= await getAllInvestmentsService.execute();
       return response.json(investmentList)
    }


}
export {GetAllInvestmentsController}



