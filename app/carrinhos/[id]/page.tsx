'use client'
import React, { Usable, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store/AppStore";
import { CartStatus, fetchCart, updateCart } from "@/store/cartSlice";
import { fetchProducts, ProductStatus } from "@/store/productSlice";
import { formatarData } from "@/utils/numeros";
import { Cart, CartProduct } from "@/types/cart";
import Produto from "./Produto";
import styles from "./page.module.css";
import clsx from "clsx";
import Link from "next/link";

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

  const novoCarrinhoRemoveProduto = (idProductRemove: number, cartProductAdiciona?: CartProduct) => (
    {
      ...cart,
      products: [
        ...cart.products.filter(w => w.productId !== idProductRemove),
        ...(cartProductAdiciona ? [cartProductAdiciona] : [])
      ]
    }
  )

  const handleSalvarProduto = (cartProduct: CartProduct) => {
    dispatch(updateCart({
      cart: novoCarrinhoRemoveProduto(cartProduct.productId, cartProduct),
      products: productState.products
    }));
  }

  const handleRemoverProduto = (productId: number) => {
    dispatch(updateCart({
      cart: novoCarrinhoRemoveProduto(productId),
      products: productState.products
    }));
  }

  const produtosOrdenados = [...cart.products].sort((a, b) => a.productId - b.productId);

  return (<>
    <h3>Carrinho nº {id}</h3>
    <div>
      <Link href={`/produtos?cartId=${cart.id}`}>
        <button className="btn btn-success">Adicionar Produto</button>
      </Link>
      <div>Data: {formatarData(new Date(cart.date))}</div>
    </div>
    <div>
      <h4>Produtos</h4>
      <table className={clsx("table", styles.carrTab)}>
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
          {produtosOrdenados.map(i => (
            <Produto key={i.productId} cartProduct={i} 
              onSalvar={handleSalvarProduto}
              onRemover={handleRemoverProduto} />
          ))}
        </tbody>
      </table>
    </div>
  </>);
}

export default Carrinho;