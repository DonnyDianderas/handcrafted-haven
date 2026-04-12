'use client';

import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { playfair } from '@/app/ui/fonts';
import styles from './checkout.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a unique order number for this purchase
    const orderNumber = 'ORD' + Date.now().toString().slice(-8);

    // Calculate the final total including shipping and tax
    const subtotal = cart.total;
    const shipping = 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Build the complete order with all customer and product details
    const order = {
      id: crypto.randomUUID(),
      orderNumber,
      date: new Date().toLocaleDateString(),
      status: 'pending',
      items: cart.items,
      total,
      customerInfo: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: `${formData.city}, ${formData.country}`
      }
    };

    // Store the order in browser storage for the customer's order history
    const existingOrders = JSON.parse(localStorage.getItem('handcrafted-haven-orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('handcrafted-haven-orders', JSON.stringify(existingOrders));

    // Save this order details for the confirmation page to display
    sessionStorage.setItem('recentOrder', JSON.stringify(order));

    // Clear the shopping cart since the order is complete
    clearCart();

    // Send customer to the order confirmation page
    router.push('/checkout/confirmation');
  };

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${playfair.className}`}>Checkout</h1>

      <div className={styles.checkoutContent}>
        {/* Show the customer what they're ordering */}
        <div className={styles.orderSection}>
          <h2 className={styles.sectionTitle}>Your Order</h2>
          <div className={styles.orderItems}>
            {cart.items.map((item) => (
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

          {/* Display the order totals with shipping and tax */}
          <div className={styles.orderTotals}>
            <div className={styles.totalRow}>
              <span>Subtotal ({cart.itemCount} items)</span>
              <span>USD {cart.total.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping</span>
              <span>USD 10.00</span>
            </div>
            <div className={styles.totalRow}>
              <span>Tax</span>
              <span>USD {(cart.total * 0.08).toFixed(2)}</span>
            </div>
            <div className={`${styles.totalRow} ${styles.finalTotal}`}>
              <span>Total</span>
              <span>USD {(cart.total + 10 + cart.total * 0.08).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Collect customer information for delivery */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Customer Information</h2>
          <form onSubmit={handleSubmit} className={styles.checkoutForm}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="country">Country *</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className={styles.formSelect}
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.formActions}>
              <Link href="/cart" className={styles.backBtn}>
                Back to Cart
              </Link>
              <button type="submit" className={styles.submitBtn}>
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
