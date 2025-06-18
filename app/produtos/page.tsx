'use client';
import { useEffect, useState } from 'react';
import { getProducts } from '@services/fakeStoreProducts';
import { Product } from '@/types/product';
import ProdutoListView from '@components/ProdutoListView';
import styles from './page.module.css';

export default function Index() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  
  useEffect(() => {
    getProducts()
      .then(setProdutos)
  }, []);

  return (
    <main>
        <h1>Fake Store - Lista de Produtos</h1>

        <button className="btn btn-success">Atualizar Lista</button>&nbsp;
        <button className="btn btn-primary">Novo Produto</button>

        {produtos.map((produto) => (
          <ProdutoListView key={produto.id} product={produto} className={styles.produtoCard} />
        ))}
    </main>
  );
}
