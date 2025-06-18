import { Product } from '@/types/product';
import clsx from 'clsx';
import React from 'react';
import Styles from './ProdutoListView.module.css';

interface ProdutoListViewProps {
    product: Product;
    className?: string;
}

const ProdutoListView: React.FC<ProdutoListViewProps> = ({ product, className }) => {
    return (
        <div className={clsx("card", className)}>
            <img className="card-img-top" style={{ width: 120, margin: "2px 10px" }} src={product.image} alt={product.title} />
            <div className="card-body">
                <h5 className="card-title">
                    <span className="me-2">{product.title}</span>
                    <span className="badge bg-secondary">{product.category}</span>
                </h5>
                <p className="card-text">{product.description}</p>
                <div className={clsx("card-footer", Styles.cardFooter)}>
                    <div>
                        Preço: <strong>$ {product.price?.toFixed(2)}</strong>
                        {/*@if (cotacao.Cotacao != null)
                        {
                            <text>&nbsp; em cotação: <strong>@cotacao.Cotacao.ConvertFromUSD(product.Price)?.ToString("#,##0.00")</strong></text>
                        }*/}
                    </div>
                    <button className="btn btn-sm btn-primary">Editar</button>
                    <button className="btn btn-sm btn-danger">Excluir</button>
                </div>
            </div>
        </div>
    );
};

export default ProdutoListView;
