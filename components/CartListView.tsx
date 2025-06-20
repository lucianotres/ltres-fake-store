import Link from "next/link";
import { Cart } from "@/types/cart";
import { formatarDecimal } from "@/utils/numeros";

interface CartListViewProps {
    cart: Cart;
    className?: string;
}

const CartListView: React.FC<CartListViewProps> = 
    ({ cart, className }) => {
    const total = cart.products.reduce((acc, p) => acc + (p.total ?? 0), 0);    
    return (
        <tr>
            <td>
                <span>{cart.id}</span>&ensp;
                {cart.userId === 0 && (<span className="badge bg-success">Meu</span>)}
            </td>
            {cart.products.length === 0 ? <td>Sem</td> : <td>{cart.products.length}</td>}
            <td>{cart.products.reduce((acc, p) => acc + p.quantity, 0)}</td>
            <td>{formatarDecimal(total)}</td>
            <td>{0}</td>
            <td className="text-nowrap">
                <Link href={`/carrinhos/${cart.id}`}>
                    <button className="btn btn-primary btn-sm me-1">Ver</button>
                </Link>
                <button className="btn btn-danger btn-sm">Remover</button>
            </td>
        </tr>
    )
}

export default CartListView;