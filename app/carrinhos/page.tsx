'use client';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store/AppStore";
import { CartStatus, fetchCarts } from "@/store/cartSlice";

const Index: React.FC = () => {
    const { carts, status, erro, } = useSelector((state: AppState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (status === CartStatus.IDLE) {
            dispatch(fetchCarts())
        }
    }, [status, dispatch]);

    return (<>
        <div>
            <h1>Carrinhos</h1>
            <p>Bem-vindo à página de carrinhos.</p>
        </div>
        {status === CartStatus.LOADING && <p>Carregando...</p>}
        {status === CartStatus.FAILED && <p>Falhou: {erro}</p>}
        {status === CartStatus.SUCCESS && (
            <ul>
                {carts.map((cart) => (
                    <li key={cart.id}>{cart.id}</li>
                ))}
            </ul>
        )}
    </>);
};

export default Index;