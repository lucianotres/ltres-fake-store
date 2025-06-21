import { Suspense } from 'react';
import Produtos from './Produtos';

export default function Page() {
  return (
    <Suspense fallback={<p>Carregando produtos...</p>}>
      <Produtos />
    </Suspense>
  );
}