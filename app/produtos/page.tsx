'use client';
import { useEffect, useState } from 'react';
import { getProducts } from '@services/fakeStoreProducts';

export default function Index() {
  const [produtos, setProdutos] = useState([]);
  
  useEffect(() => {
    getProducts()
      .then(setProdutos)
  });

  return (
    <main>
        <h3>Fake Store - Produtos</h3>
        <ol>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <h4>{produto.title}</h4>
              <p>Preço: ${produto.price}</p>
              <img src={produto.image} alt={produto.title} style={{ width: '100px' }} />
            </li>
          ))}
        </ol>
    </main>
  );
}
