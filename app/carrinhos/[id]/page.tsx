'use client'
import React, { startTransition, Usable, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store/AppStore";
import { CartStatus, fetchCart } from "@/store/cartSlice";
import { fetchProducts, ProductStatus } from "@/store/productSlice";
import { formatarData, formatarDecimal } from "@/utils/numeros";
import { Cart } from "@/types/cart";

interface CarrinhoParams {
  id: number;
}

interface CarrinhoProps {
  params: Usable<CarrinhoParams>
};

const Carrinho: React.FC<CarrinhoProps> = ({ params }) => {
  const { id } = React.use<CarrinhoParams>(params);
  const { carts, status, erro } = useSelector((state: AppState) => state.cart);
  const productState = useSelector((state: AppState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  const primeiraExecucao = useRef(true);
  const cart = carts.find(w => w.id == id);

  useEffect(() => {
    if (productState.status === ProductStatus.IDLE) {
      dispatch(fetchProducts());
    }

    if (primeiraExecucao.current && productState.status === ProductStatus.SUCCESS) {
      primeiraExecucao.current = false;
      dispatch(fetchCart({cartId: id, products: productState.products}));
    }
  }, [status, productState.status]);

  if (!cart || status === CartStatus.LOADING) {
    return <p>Carregando carrinho...</p>
  }

  return (<>
    <h3>Carrinho nº {id}</h3>
    <div>
      <button className="btn btn-success">Adicionar Produto</button>
      <div>Data: {formatarData(new Date(cart.date))}</div>
    </div>
    <div>
      <h4>Produtos</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Total</th>
            <th>Total Cotação</th>
            <th></th>
          </tr>
        </thead>
        <tbody>                    
          {cart.products.map(i => (
            <tr key={i.productId}>
              <td>{i.product?.title}</td>
              <td>$ {formatarDecimal(i.product?.price ?? 0)}</td>
              <td>
                <span className="me-1">{i.quantity}</span>
                <button className="btn btn-sm btn-primary">Alterar</button>
              </td>
              <td>$ {formatarDecimal(i.total)}</td>
              <td></td>
              <td>
                  <button className="btn btn-sm btn-danger">Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>);
}

export default Carrinho;