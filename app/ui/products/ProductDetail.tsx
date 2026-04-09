'use client';

import React from 'react';
import Image from 'next/image';
import { playfair } from '@/app/ui/fonts';
import styles from '@/app/catalog/[id]/product-detail.module.css';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

interface ProductDetailProps {
  id: string;
  name: string;
  price: number;
  image_url: string;
  artisan_id: string;
  artisan_name: string;
  category?: string;
  description: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  id,
  name,
  price,
  image_url,
  artisan_id,
  artisan_name,
  category,
  description
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image_url,
      artisan_id
    });
  };

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <Image 
            src={image_url} 
            alt={name} 
            fill 
            className={styles.img}
            priority 
          />
        </div>

        <div>
          <p className={styles.category}>{category || "Handcrafted"}</p>
          <h1 className={`${playfair.className} ${styles.title}`}>{name}</h1>
          
          <p className={styles.artisan}>
            Handcrafted by {' '}
            <Link href={`/artisans/${artisan_id}`} className={styles.artisanLink}>
              <span>{artisan_name}</span>
            </Link>
          </p>
          
          <p className={styles.price}>USD {Number(price).toFixed(2)}</p>
          <div className={styles.divider} />
          <p className={styles.description}>{description}</p>
          
          <button 
            className={`${styles.buyButton} ${playfair.className}`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <p className={styles.review}>
            Already bought one? {' '}
            <Link href={`/catalog/${id}/review`}>
              <span>Leave a Review!</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
