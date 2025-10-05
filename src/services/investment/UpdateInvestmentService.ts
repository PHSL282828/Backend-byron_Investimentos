import { UpdateInvestmentRequest } from "../../interfaces/investments/UpdateInvestmentRequest";
import prismaClient from "../../prisma";


class UpdateInvestmentService{
    async execute({investment_id, quantity}:UpdateInvestmentRequest){
        if(!investment_id){
            throw new Error("O id do investimento deve ser enviado");
        }

        const updatedInvestment= await prismaClient.investment.update({
            where:{
                id:investment_id
            },
            data:{
                quantity: Number(quantity)
            }
        })
        return updatedInvestment;
        
    }
}

export {UpdateInvestmentService}

