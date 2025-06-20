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

const prepararCartParaEnvio = (original: Cart): Cart => 
({
    ...original,
    products: original.products.map(({ product, total, ...restante}) => restante)
});


export const putCart = async (cart: Cart): Promise<Cart | undefined> => {
    try {
        const response = await api.put<Cart>(`/${cart.id}`, prepararCartParaEnvio(cart));
        return response.data;
    } catch (error) {
        console.error("Erro ao modificar carrinho:", error);
        return undefined;
    }
}