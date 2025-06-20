'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './NavMenu.module.css';
import Link from 'next/link';
import './NavMenu.css';

const NavMenu: React.FC = () => {
    const [isCollapesd, setIsCollapesd] = useState(true);

    const handleToggleMenu = () => {
        setIsCollapesd(!isCollapesd);
    }
    
    return (
        <>
        <div className={clsx("ps-3", "navbar", "navbar-dark", styles.topRow)} >
            <div className="container-fluid">
                <a className="navbar-brand" href="">Fake Store</a>
                <button title="Navigation menu" className="navbar-toggler" onClick={handleToggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </div>

        <div className={clsx(isCollapesd || styles.navCollapse, "nav-scrollable", styles.navScrollable)} onClick={handleToggleMenu}>
            <nav className="flex-column">
                <div className="nav-item px-3">
                    <Link className="nav-link" href="/">
                        <span className="bi bi-house-door-fill-nav-menu" aria-hidden="true"></span> Início
                    </Link>
                </div>
                <div className="nav-item px-3">
                    <Link className="nav-link" href="/produtos">
                        <span className="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Produtos
                    </Link>
                </div>
                <div className="nav-item px-3">
                    <Link className="nav-link" href="/usuarios">
                        <span className="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Usuários
                    </Link>
                </div>
                <div className="nav-item px-3">
                    <Link className="nav-link" href="/carrinhos">
                        <span className="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Carrinhos
                    </Link>
                </div>
            </nav>
        </div>
        </>
    );
};

export default NavMenu;