import { Suspense } from 'react';
import Carrinho from './Carrinho';

export default function Page() {
  return (
    <Suspense fallback={<p>Carregando carrinho...</p>}>
      <Carrinho />
    </Suspense>
  );
}