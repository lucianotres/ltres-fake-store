import { Cotacao } from "@/types/cotacao";
import axios from "axios";

const api = axios.create({
    baseURL: "https://economia.awesomeapi.com.br/"
});

export const getUltimaCotacao = async (
  de: string,
  para: string
): Promise<Cotacao | undefined> => {
    try {
        const response = await api.get(`/json/last/${de}-${para}`);
        const sigla = `${de}${para}`;
        return response.data[sigla];
    } catch (error) {
        console.error("Falha ao buscar última cotação:", error);
        return undefined;
    }
};