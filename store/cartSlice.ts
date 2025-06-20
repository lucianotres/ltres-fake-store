import { getCart, getCarts, putCart } from "@/services/fakeStoreCarts";
import { Cart } from "@/types/cart";
import { Product } from "@/types/product";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export enum CartStatus {
    IDLE,
    LOADING,
    SUCCESS,
    FAILED
}

export interface CartState {
    carts: Cart[];
    status: CartStatus;
    erro: string | null;
}

const initialState: CartState = {
    carts: [],
    status: CartStatus.IDLE,
    erro: null,
};

const mapeiaProdutoNoCarrinho = (cart: Cart, productsList: Product[]): Cart => ({
    ...cart,
    products: cart.products.map(p => {
        const foundProduct = productsList.find(w => w.id === p.productId);
        return {
            ...p,
            product: foundProduct,
            total: Math.round((foundProduct?.price ?? 0) * p.quantity * 100) / 100
        };
    })
});


export const fetchCarts = createAsyncThunk(
    "car/fetchCarts", 
    async (
        params: { products?: Product[] }
    ): Promise<Cart[]> => {
        const response = await getCarts();
        return (response && params.products ?
            response.map(m => mapeiaProdutoNoCarrinho(m, params.products)) :
            []);
    }
);

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (
        params: { cartId: number; products?: Product[] }
    ): Promise<Cart | null> => {
        const response = await getCart(params.cartId);
        return (response && params.products ?
            mapeiaProdutoNoCarrinho(response, params.products) :
            null);
    }
);

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async (
        params: { cart: Cart, products?: Product[] }
    ): Promise<Cart | undefined> => {
        const response = await putCart(params.cart);
        return (response && params.products ?
            mapeiaProdutoNoCarrinho(response, params.products) :
            undefined);
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: { },
    extraReducers(builder) {
    builder
        .addCase(fetchCarts.pending, (state) => {
            state.status = CartStatus.LOADING;
            state.erro = null;
        })
        .addCase(fetchCarts.fulfilled, (state, action: PayloadAction<Cart[]>) => {
            state.status = CartStatus.SUCCESS;
            state.carts = action.payload;
            state.erro = null;
        })
        .addCase(fetchCarts.rejected, (state, action) => {
            state.status = CartStatus.FAILED;
            state.erro = action.error.message || "Falhou ao carregar carrinhos";
        })
        .addCase(fetchCart.pending, (state) => {
            state.status = CartStatus.LOADING;
            state.erro = null;
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.status = CartStatus.FAILED;
            state.erro = action.error.message || "Falhou ao buscar carrinho";
        })
        .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart | null>) => {
            if (action.payload === null)
                return;
            
            state.status = CartStatus.SUCCESS;
            state.erro = null;
            state.carts = [
                ...state.carts.filter(w => w.id !== action.payload?.id),
                action.payload
            ];

            console.log("fetchCart: " + state.carts.map(m => m.id));
        })
        .addCase(updateCart.fulfilled, (state, action: PayloadAction<Cart | undefined>) => {
            if (!action.payload)
                return;

            state.status = CartStatus.SUCCESS;
            state.erro = null;
            state.carts = [
                ...state.carts.filter(w => w.id !== action.payload?.id),
                action.payload
            ]
        });
    }
});

export default cartSlice.reducer;