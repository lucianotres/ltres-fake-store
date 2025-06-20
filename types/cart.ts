import { Product } from "./product";

export interface CartProduct {
    productId: number;
    quantity: number;

    product?: Product;
    total?: number;
}

export interface Cart {
    id: number;
    userId: number;
    date: string;
    products: CartProduct[];
}