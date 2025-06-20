import { Cart } from "@/types/cart";
import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com/carts"
});

export const getCarts = async () => {
    try {
        const response = await api.get<Cart[]>("/");
        return response.data;
    } catch (error) {
        console.error("Erro ao retornar carrinhos:", error);
        return [];
    }
};

export const getCart = async (id: number): Promise<Cart | undefined> => {
    try {
        const response = await api.get<Cart>(`/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao retornar carrinho:", error);
        return undefined;
    }
};