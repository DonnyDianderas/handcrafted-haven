import { sql } from '@vercel/postgres';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { playfair } from '@/app/ui/fonts';
import styles from './product-detail.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const { rows } = await sql`
    SELECT products.*, users.name as artisan_name 
    FROM products 
    JOIN users ON products.artisan_id = users.id 
    WHERE products.id = ${id}
  `;

  const product = rows[0];

  if (!product) {
    notFound();
  }

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        
        {/* Col Image */}
        <div className={styles.imageWrapper}>
          <Image 
            src={product.image_url} 
            alt={product.name} 
            fill 
            className={styles.img}
            priority 
          />
        </div>

        {/* Col Information */}
        <div>
          <p className={styles.category}>{product.category || "Handcrafted"}</p>
          
          <h1 className={`${playfair.className} ${styles.title}`}>
            {product.name}
          </h1>
          
          <p className={styles.artisan}>
            Handcrafted by <span>{product.artisan_name}</span>
          </p>
          
          <p className={styles.price}>
            USD {Number(product.price).toFixed(2)}
          </p>
          
          <div className={styles.divider} />
          
          <p className={styles.description}>
            {product.description || "A unique handcrafted treasure made with passion."}
          </p>
          
          <button className={`${styles.buyButton} ${playfair.className}`}>
            Add to Cart
          </button>
        </div>

      </div>
    </section>
  );
}