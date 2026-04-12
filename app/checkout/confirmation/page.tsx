'use client';

import React, { useState, useEffect } from 'react';
import { playfair } from '@/app/ui/fonts';
import styles from './confirmation.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface OrderDetails {
  orderNumber: string;
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

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Get order details from session storage or URL params
    const orderData = sessionStorage.getItem('recentOrder');
    if (orderData) {
      setOrderDetails(JSON.parse(orderData));
    } else {
      // If no order data, redirect to cart
      router.push('/cart');
    }
  }, [router]);

  if (!orderDetails) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.confirmationCard}>
        {/* Success Message */}
        <div className={styles.successSection}>
          <div className={styles.successIcon}>
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1 className={`${styles.title} ${playfair.className}`}>Order Received!</h1>
          <p className={styles.message}>
            Thank you for your order! We've received your purchase and will begin processing it right away.
          </p>
          <div className={styles.orderNumber}>
            Order #{orderDetails.orderNumber}
          </div>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSection}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          <div className={styles.orderItems}>
            {orderDetails.items.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <div className={styles.itemImage}>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className={styles.img}
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

          <div className={styles.orderTotal}>
            <span>Total Amount:</span>
            <span>USD {orderDetails.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Information */}
        <div className={styles.customerSection}>
          <h2 className={styles.sectionTitle}>Shipping Information</h2>
          <div className={styles.customerInfo}>
            <p><strong>Name:</strong> {orderDetails.customerInfo.name}</p>
            <p><strong>Email:</strong> {orderDetails.customerInfo.email}</p>
            <p><strong>Address:</strong> {orderDetails.customerInfo.address}</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className={styles.nextSteps}>
          <h2 className={styles.sectionTitle}>What's Next?</h2>
          <div className={styles.stepsList}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>Order Processing</h4>
                <p>We'll review your order and prepare it for shipping within 1-2 business days.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>Shipping Confirmation</h4>
                <p>You'll receive an email when your order ships with tracking information.</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>Delivery</h4>
                <p>Your handcrafted items will arrive within 5-7 business days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link href="/dashboard/customer/orders" className={styles.viewOrdersBtn}>
            View My Orders
          </Link>
          <Link href="/catalog" className={styles.continueBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
