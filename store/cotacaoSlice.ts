import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUltimaCotacao } from "@/services/awesomeApiService";
import { Cotacao } from "@/types/cotacao";

export enum CotacaoStatus {
    IDLE,
    LOADING,
    SUCCESS,
    FAILED
}

export interface CotacaoState {
    ultimaCotacao?: Cotacao
    status: CotacaoStatus;
    erro: string | null;
}

const initialState: CotacaoState = {
    ultimaCotacao: undefined,
    status: CotacaoStatus.IDLE,
    erro: null,
};

export const fetchUltimaCotacao = createAsyncThunk("cotacao/ultimaCotacao", async (
    params: { de: string, para: string }
) : Promise<Cotacao | undefined> => 
    await getUltimaCotacao(params.de, params.para)
);


const cotacaoSlice = createSlice({
    name: "cotacao",
    initialState,
    reducers: { },
    extraReducers(builder) {
    builder
        .addCase(fetchUltimaCotacao.pending, (state) => {
            state.status = CotacaoStatus.LOADING;
            state.erro = null;
        })
        .addCase(fetchUltimaCotacao.fulfilled, (state, action: PayloadAction<Cotacao | undefined>) => {
            console.log("Definida cotação: ", action.payload?.name);
            state.status = CotacaoStatus.SUCCESS;
            state.ultimaCotacao = action.payload;
            state.erro = null;
        })
        .addCase(fetchUltimaCotacao.rejected, (state, action) => {
            state.status = CotacaoStatus.FAILED;
            state.ultimaCotacao = undefined;
            state.erro = action.error.message || "Falhou ao carregar carrinhos";
        });
    }
});

export default cotacaoSlice.reducer;