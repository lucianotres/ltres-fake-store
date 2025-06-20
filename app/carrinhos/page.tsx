'use client';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store/AppStore";
import { CartStatus, fetchCarts } from "@/store/cartSlice";
import { fetchProducts, ProductStatus } from "@/store/productSlice";
import { formatarDecimal } from "@/utils/numeros";
import CartListView from "@components/CartListView";

const Index: React.FC = () => {
    const { carts, status, erro, } = useSelector((state: AppState) => state.cart);
    const productState = useSelector((state: AppState) => state.product);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (productState.status === ProductStatus.IDLE) {
            dispatch(fetchProducts());
        }

        if (status === CartStatus.IDLE && productState.status === ProductStatus.SUCCESS) {
            dispatch(fetchCarts({ products: productState.products }));
        }
    }, [status, productState.status]);

    const carregaDados = () => {
        dispatch(fetchProducts());
        dispatch(fetchCarts({ products: productState.products }));
    };

    const total = productState.status !== ProductStatus.SUCCESS && status !== CartStatus.SUCCESS ?
        0 : Math.round(carts.reduce((tot, c) => 
            tot + c.products.reduce((ptot, p) => ptot + (p.total ?? 0), 0)
        , 0) * 100) / 100; //arredonda 2 casas decimais

    return (<>
        <h1>Carrinhos de Compras</h1>
        <p>Lista de carrinhos cadastrados no sistema</p>

        <button className="btn btn-success me-1" onClick={carregaDados}>Atualizar Lista</button>
        <button className="btn btn-primary" onClick={() => alert("Não implementado ainda")}>Novo Carrinho</button>

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
                    <td>{formatarDecimal(total)}</td>
                    <td>0</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </>);
};

export default Index;