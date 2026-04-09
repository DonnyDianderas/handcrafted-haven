'use client';

import React from 'react';
import { useCart } from '@/app/context/CartContext';
import { playfair } from '@/app/ui/fonts';
import styles from './cart.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (cart.items.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={`${styles.title} ${playfair.className}`}>Your Cart</h1>
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyMessage}>
            Looks like you haven't added any handcrafted items yet.
          </p>
          <Link href="/catalog" className={styles.continueShoppingBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={`${styles.title} ${playfair.className}`}>Your Cart</h1>
        <button 
          onClick={handleClearCart}
          className={styles.clearCartBtn}
        >
          Clear Cart
        </button>
      </div>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {cart.items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>

              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>USD {Number(item.price).toFixed(2)}</p>
                <Link 
                  href={`/artisans/${item.artisan_id}`}
                  className={styles.artisanLink}
                >
                  View Artisan
                </Link>
              </div>

              <div className={styles.itemControls}>
                <div className={styles.quantityControls}>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className={styles.quantityBtn}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className={styles.quantityBtn}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  USD {Number(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <div className={styles.summaryCard}>
            <h2 className={`${styles.summaryTitle} ${playfair.className}`}>Order Summary</h2>
            
            <div className={styles.summaryRow}>
              <span>Subtotal ({cart.itemCount} items)</span>
              <span>USD {cart.total.toFixed(2)}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div className={styles.summaryDivider} />
            
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>USD {cart.total.toFixed(2)}</span>
            </div>

            <button className={styles.checkoutBtn}>
              Proceed to Checkout
            </button>

            <Link href="/catalog" className={styles.continueLink}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
