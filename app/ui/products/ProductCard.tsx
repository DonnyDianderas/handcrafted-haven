'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { playfair } from '@/app/ui/fonts';
import { useCart } from '@/app/context/CartContext';
import styles from '@/app/catalog/catalog.module.css';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string;
  artisan_id: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  image_url, 
  artisan_id 
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price,
      image_url,
      artisan_id
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image_url}
          alt={name}
          fill
          className={styles.img}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className={playfair.className}>{name}</h3>
      <p className={styles.price}>USD {Number(price).toFixed(2)}</p>
      
      <div className={styles.buttonGroup}>
        <Link href={`/catalog/${id}`} className={styles.viewDetailsLink}>
          <button className={styles.button}>View Details</button>
        </Link>
        <button 
          className={`${styles.button} ${styles.addToCartButton}`}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
