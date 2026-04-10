
import { notFound } from 'next/navigation';
import { playfair } from '@/app/ui/fonts';
import styles from './profile.module.css';
import Link from 'next/link';
import { fetchArtisanById } from '@/app/lib/data';
import { sql } from '@vercel/postgres'; 
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtisanProfilePage({ params }: PageProps) {
  const { id } = await params;

  
  const artisan = await fetchArtisanById(id);

  // console.log(artisan_products);
  if (!artisan) {
    notFound();
  }
  const artisan_products = await sql`SELECT * FROM products WHERE artisan_id = ${artisan.id}`;

  return (
    <main className={styles.container}>
      <header className={styles.header}>

        <h1 className={`${playfair.className} ${styles.title}`}>
          {artisan.name}
        </h1>
        <h3>Biography</h3>
        <p className={styles.description}>
          {artisan.biography ? (
            artisan.biography
          ) : (
            <>
              We are currently building the showcase for this artisan.
              Soon you will be able to see their full story and handcrafted collection here.
            </>
          )}
        </p>
      </header>

      <section className={styles.placeholderSection}>
        <div className={styles.divider} />
      </section>

      <div>
        <h2>Artisan Products from {artisan.name}</h2>
          <div className={styles.grid}>
            {artisan_products.rows.map((product) => (
              <div key={product.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>
                <h3 className={playfair.className}>{product.name}</h3>
                <p className={styles.price}>USD {Number(product.price).toFixed(2)}</p>

                <Link href={`/catalog/${product.id}`}>
                  <button className={styles.button}>View Details</button>
                </Link>
              </div>
            ))}
          </div>
      </div>

      <Link href="/catalog" className={styles.backLink}>
        ← Back to Catalog
      </Link>
    </main>
  );
}