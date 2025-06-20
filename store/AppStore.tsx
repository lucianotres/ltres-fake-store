import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import cotacaoReducer from './cotacaoSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    cotacao: cotacaoReducer
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;