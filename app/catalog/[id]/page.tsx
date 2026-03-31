import Image from 'next/image';
import { notFound } from 'next/navigation';
import { playfair } from '@/app/ui/fonts';
import styles from './product-detail.module.css';
import Link from 'next/link';
import { fetchProductById } from '@/app/lib/data'; 

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <Image 
            src={product.image_url} 
            alt={product.name} 
            fill 
            className={styles.img}
            priority 
          />
        </div>

        <div>
          <p className={styles.category}>{product.category || "Handcrafted"}</p>
          <h1 className={`${playfair.className} ${styles.title}`}>{product.name}</h1>
          
          <p className={styles.artisan}>
            Handcrafted by {' '}
            <Link href={`/artisans/${product.artisan_id}`} className={styles.artisanLink}>
              <span>{product.artisan_name}</span>
            </Link>
          </p>
          
          <p className={styles.price}>USD {Number(product.price).toFixed(2)}</p>
          <div className={styles.divider} />
          <p className={styles.description}>{product.description}</p>
          
          <button className={`${styles.buyButton} ${playfair.className}`}>Add to Cart</button>
        </div>
      </div>
    </section>
  );
}