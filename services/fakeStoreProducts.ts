import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com/products"
});

export const getProducts = async () => {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        console.error("Erro ao retornar produtos:", error);
        throw [];
    }
};