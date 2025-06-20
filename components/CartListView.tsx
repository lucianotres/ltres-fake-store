import Link from "next/link";
import { useSelector } from "react-redux";
import { AppState } from "@/store/AppStore";
import { Cart } from "@/types/cart";
import { formatarDecimal } from "@/utils/numeros";

interface CartListViewProps {
    cart: Cart;
    className?: string;
    onRemove?: (cartId: number) => void;
}

const CartListView: React.FC<CartListViewProps> = 
    ({ cart, className, onRemove }) => {
    const { ultimaCotacao } = useSelector((state: AppState) => state.cotacao);
    
    const total = cart.products.reduce((acc, p) => acc + (p.total ?? 0), 0);
    const totalCotacao = cart.products.reduce((acc, p) => acc + 
        (Math.round((p.total ?? 0) * (ultimaCotacao?.ask ?? 0) * 100) / 100)
    , 0);

    return (
        <tr>
            <td>
                <span>{cart.id}</span>&ensp;
                {cart.userId === 0 && (<span className="badge bg-success">Meu</span>)}
            </td>
            {cart.products.length === 0 ? <td>Sem</td> : <td>{cart.products.length}</td>}
            <td>{cart.products.reduce((acc, p) => acc + p.quantity, 0)}</td>
            <td>{formatarDecimal(total)}</td>
            <td>{formatarDecimal(totalCotacao)}</td>
            <td className="text-nowrap">
                <Link href={`/carrinhos/${cart.id}`}>
                    <button className="btn btn-primary btn-sm me-1">Ver</button>
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => onRemove?.(cart.id)}>Remover</button>
            </td>
        </tr>
    )
}

export default CartListView;