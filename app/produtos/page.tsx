'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '@/store/AppStore';
import { fetchProducts, ProductStatus } from '@/store/productSlice';
import { CartStatus, updateCart } from '@/store/cartSlice';
import { Product } from '@/types/product';
import { Cart } from '@/types/cart';
import ProdutoListView from '@components/ProdutoListView';
import styles from './page.module.css';


export default function Index() {
  const cartState = useSelector((state: AppState) => state.cart);
  const { products, status, erro } = useSelector((state: AppState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const cartIdParam = searchParams.get("cartId");
  const cartId = cartIdParam && !isNaN(Number(cartIdParam))
    ? Number(cartIdParam)
    : undefined;

  useEffect(() => {
    if (status === ProductStatus.IDLE) {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleAtualizarLista = () => {
    dispatch(fetchProducts());
  };

  let handleSelecionar = cartId ? (product: Product) => {
    if (!cartId && cartState.status !== CartStatus.SUCCESS)
      return;

    const cart = cartState.carts.find(w => w.id == cartId);
    if (!cart)
      return;

    const item = cart.products.find(w => w.productId == product.id);
    let novoCart: Cart;
    if (item) //ja tens, adiciona 1 a quantidade
    {
      novoCart = {
        ...cart,
        products: [
          ...cart.products.filter(w => w.productId !== item.productId),
          {
            ...item,
            quantity: item.quantity + 1
          }
        ]
      }
    } else {
      novoCart = {
        ...cart,
        products: [
          ...cart.products,
          {
            productId: product.id,
            quantity: 1,
            product: product, 
            total: product.price
          }
        ]
      }
    }

    //salva de fato na store
    dispatch(updateCart({
      cart: novoCart,
      products: products
    }));

    history.back();
  } : undefined;

  return (<>
    {cartId ? (
      <h1>Lista de Produtos</h1>
    ) : (<>
      <h1>Cadastro de Produtos</h1>
      <button className="btn btn-success" onClick={handleAtualizarLista}>Atualizar Lista</button>&nbsp;
      <button className="btn btn-primary">Novo Produto</button>
    </>)}

    {products.map((produto) => (
      <ProdutoListView key={produto.id}
        className={styles.produtoCard}
        product={produto}
        onSelecionar={handleSelecionar}
      />
    ))}
  </>);
}
