import { Product } from "@types/product";
import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com/products"
});

export const getProducts = async () => {
    try {
        const response = await api.get<Product[]>("/");
        return response.data;
    } catch (error) {
        console.error("Erro ao retornar produtos:", error);
        throw [];
    }
};