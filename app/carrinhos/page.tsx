'use client';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store/AppStore";
import { CartStatus, fetchCarts } from "@/store/cartSlice";
import CartListView from "@components/CartListView";

const Index: React.FC = () => {
    const { carts, status, erro, } = useSelector((state: AppState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (status === CartStatus.IDLE) {
            dispatch(fetchCarts())
        }
    }, [status, dispatch]);

    return (<>
        <h1>Carrinhos de Compras</h1>
        <p>Lista de carrinhos cadastrados no sistema</p>

        <button className="btn btn-success me-1">Atualizar Lista</button>
        <button className="btn btn-primary">Novo Carrinho</button>

        <table className="table">
            <thead>
                <tr>
                    <th>Nº</th>
                    <th>Produtos</th>
                    <th>Quantidades</th>
                    <th>Valor Total (USD$)</th>
                    <th>Valor Total ( - )</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {status === CartStatus.LOADING && <tr><td colSpan={5}>Carregando...</td></tr>}
                {status === CartStatus.FAILED && <tr><td colSpan={5}>Falhou: {erro}</td></tr>}
                {status === CartStatus.SUCCESS && 
                    carts.map((cart) => (
                        <CartListView key={cart.id} cart={cart} />
                    ))
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3} className="text-end">TOTAL:</td>
                    <td>0</td>
                    <td>0</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </>);
};

export default Index;