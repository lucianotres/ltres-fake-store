'use client'
import { AppState } from "@/store/AppStore";
import { CartProduct } from "@/types/cart";
import { formatarDecimal } from "@/utils/numeros";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

type ProdutoProps = {
  cartProduct: CartProduct,
  onSalvar?: (cartProduct: CartProduct) => void
  onRemover?: (productId: number) => void
}

const Produto: React.FC<ProdutoProps> = 
  ({ cartProduct, onSalvar, onRemover }) => {
  const { ultimaCotacao } = useSelector((state: AppState) => state.cotacao);

  const [quantidade, setQuantidade] = useState<number>(cartProduct.quantity);
  const [editando, setEditando] = useState<boolean>(false);

  const handleEditar = () => {
    setQuantidade(cartProduct.quantity);
    setEditando(true);
  }

  const handleSalvarQtde = () => {
    setEditando(false);
    onSalvar?.({
      ...cartProduct,
      quantity: quantidade
    });
  }

  const handleCancelar = () => {
    setEditando(false);
  }

  const totalCotacao = Math.round(
    (cartProduct.product?.price ?? 0) 
    * quantidade 
    * (ultimaCotacao?.ask ?? 0) * 100
  ) / 100;

  return (
    <tr>
      <td>{cartProduct.product?.title}</td>
      <td>$ {formatarDecimal(cartProduct.product?.price ?? 0)}</td>
      <td>
        {editando ? (<>
          <input 
            type="number" 
            min="1" 
            style={{width: 50}} 
            className="me-1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.valueAsNumber)} />
          <button className="btn btn-sm btn-success me-1" onClick={handleSalvarQtde}>Salvar</button>
          <button className="btn btn-sm btn-danger" onClick={handleCancelar}>Cancela</button>
        </>) : (<>
          <span className="me-1">{cartProduct.quantity}</span>
          <button className="btn btn-sm btn-primary" onClick={handleEditar}>Alterar</button>
        </>)}
      </td>
      <td>$ {formatarDecimal((cartProduct.product?.price ?? 0) * quantidade)}</td>
      <td>{formatarDecimal(totalCotacao)}</td>
      <td>
          <button className="btn btn-sm btn-danger" onClick={() => onRemover?.(cartProduct.productId)}>Remover</button>
      </td>
    </tr>
  );
}

export default Produto;