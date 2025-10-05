import { GetInvestmentRequest } from "../../interfaces/investments/GetInvesmentRequest";
import prismaClient from "../../prisma";

class GetInvestmentService{
    async execute({investment_id}:GetInvestmentRequest){

        if (!investment_id){
            throw new Error("O id do investimento precisa ser enviado");
        }
        const investment = await prismaClient.investment.findFirst({
            where:{
                id:investment_id
            },
            select:{
                id:true,
                name:true,
                ticker:true,
                investedValue:true,
                quantity:true,
                user_id:true
            }

        });

        if(!investment){
            throw new Error("Investmento não encontrado")
        }

        return investment;

    }
}

export {GetInvestmentService}


