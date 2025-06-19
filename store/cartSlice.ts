import { getCarts } from "@/services/fakeStoreCarts";
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

export const fetchCarts = createAsyncThunk("car/fetchCarts", async () => {
    const response = await getCarts();
    return response;
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        mapProducts(state, action: PayloadAction<Product[]>) {
            let novoCarts = state.carts.map(c => ({
                ...c,
                products: c.products.map(p => {
                    const foundProduct = action.payload.find(w => w.id === p.productId);
                    return {
                        ...p,
                        product: foundProduct,
                        total: Math.round((foundProduct?.price ?? 0) * p.quantity * 100) / 100
                    };
                })
            }));

            console.log('mapProducts executado');
            return {
                ...state,
                carts: novoCarts
            }
        }
    },
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
    }
});

export const { mapProducts } = cartSlice.actions;
export default cartSlice.reducer;