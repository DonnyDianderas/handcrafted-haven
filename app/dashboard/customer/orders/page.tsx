'use client';

import React, { useState, useEffect } from 'react';
import { playfair } from '@/app/ui/fonts';
import styles from './orders.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending';
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
  }>;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    address: string;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load orders from localStorage (for demo purposes)
    const savedOrders = localStorage.getItem('handcrafted-haven-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={`${styles.title} ${playfair.className}`}>My Orders</h1>
          <Link href="/dashboard/customer" className={styles.backLink}>
            Back to Dashboard
          </Link>
        </div>

        <div className={styles.emptyOrders}>
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
              <path d="M9 2L3 9v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9l-6-7z"></path>
              <polyline points="3 9 12 9 21 9"></polyline>
              <path d="M12 2v7"></path>
            </svg>
          </div>
          <h2 className={styles.emptyTitle}>No orders yet</h2>
          <p className={styles.emptyMessage}>
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Link href="/catalog" className={styles.shopBtn}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={`${styles.title} ${playfair.className}`}>My Orders</h1>
        <Link href="/dashboard/customer" className={styles.backLink}>
          Back to Dashboard
        </Link>
      </div>

      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div>
                <h3 className={styles.orderNumber}>Order #{order.orderNumber}</h3>
                <p className={styles.orderDate}>Placed on {order.date}</p>
              </div>
              <div className={styles.orderStatus}>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className={styles.orderItems}>
              {order.items.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className={styles.img}
                      sizes="(max-width: 768px) 60px, 80px"
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemQuantity}>Quantity: {item.quantity}</p>
                  </div>
                  <div className={styles.itemPrice}>
                    USD {Number(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderFooter}>
              <div className={styles.orderTotal}>
                <span className={styles.totalLabel}>Order Total:</span>
                <span className={styles.totalAmount}>USD {order.total.toFixed(2)}</span>
              </div>

              <div className={styles.orderActions}>
                <button className={styles.trackBtn}>Track Order</button>
                <Link href={`/catalog/${order.items[0]?.id}/review`} className={styles.reviewBtn}>
                  Leave Review
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
