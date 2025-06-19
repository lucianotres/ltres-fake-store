import { Cart } from "@/types/cart";

interface CartListViewProps {
    cart: Cart;
    className?: string;
}

const CartListView: React.FC<CartListViewProps> = 
    ({ cart, className }) => {
    return (
        <tr>
            <td>
                <text>{cart.id}</text>&ensp;
                {cart.userId === 0 && (<span className="badge bg-success">Meu</span>)}
            </td>
            {cart.products.length === 0 ? <td>Sem</td> : <td>{cart.products.length}</td>}
            <td>{cart.products.reduce((acc, p) => acc + p.quantity, 0)}</td>
            <td>{0}</td>
            <td>{0}</td>
            <td className="text-nowrap">
                <button className="btn btn-primary btn-sm me-1">Ver</button>
                <button className="btn btn-danger btn-sm">Remover</button>
            </td>
        </tr>
    )
}

export default CartListView;