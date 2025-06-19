import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { getProducts } from "@/services/fakeStoreProducts";

export enum ProductStatus {
    IDLE,
    LOADING,
    SUCCESS,
    FAILED
}

export interface ProductState {
    products: Product[];
    status: ProductStatus;
    erro: string | null;
}

const initialState: ProductState = {
    products: [],
    status: ProductStatus.IDLE,
    erro: null,
};

export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
    const response = await getProducts();
    return response;
});


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: { },
    extraReducers(builder) {
    builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = ProductStatus.LOADING;
            state.erro = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.status = ProductStatus.SUCCESS;
            state.products = action.payload;
            state.erro = null;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = ProductStatus.FAILED;
            state.erro = action.error.message || "Falhou ao carregar carrinhos";
        });
    }
});

export default productSlice.reducer;