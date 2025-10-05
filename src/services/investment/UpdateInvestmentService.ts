import { UpdateInvestmentRequest } from "../../interfaces/investments/UpdateInvestmentRequest";
import prismaClient from "../../prisma";

type BrapiQuoteResponse = {
  results?: BrapiQuoteItem[];
};


type BrapiQuoteItem = {
  symbol?: string;
  shortName?: string;
  regularMarketPrice?: number;
};

class UpdateInvestmentService{
    private readonly token= process.env.BRAPI_TOKEN;
    private readonly brappiUrl=process.env.BRAPI_URL;

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
        if (!this.token) {
      throw new Error("Token da brapi não configurado. Defina BRAPI_TOKEN no ambiente.");
        }

        const url=new URL(`${this.brappiUrl}/quote/${encodeURIComponent(updatedInvestment.ticker)}`);

        url.searchParams.set("token", this.token);

        const resp = await fetch(url.toString(), {
            method: "GET",
            headers: { Authorization: `Bearer ${this.token}` },
        });

        if (!resp.ok) {
            const text = await resp.text().catch(() => "");
            if (resp.status === 401) {
            throw new Error("Falha de autenticação na brapi (401), verifique o token.");
            }
            throw new Error(`Erro ao consultar a brapi (status ${resp.status}). ${text?.slice(0, 200)}`);
        }

        const data = (await resp.json()) as BrapiQuoteResponse;
        const quote = data?.results?.[0];

        let valorMercado=Number(quote.regularMarketPrice);
        let novoValorInvestido = valorMercado * updatedInvestment.quantity;
        updatedInvestment.investedValue=novoValorInvestido;


        return updatedInvestment;
        
    }
}

export {UpdateInvestmentService}

