'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import styles from './cart.module.css';

const CartIcon: React.FC = () => {
  const { cart } = useCart();

  return (
    <Link href="/cart" className={styles.cartLink}>
      <div className={styles.cartIcon}>
        {/* Shopping cart SVG icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.cartSvg}
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        
        {/* Item count badge */}
        {cart.itemCount > 0 && (
          <span className={styles.cartBadge}>
            {cart.itemCount > 99 ? '99+' : cart.itemCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
