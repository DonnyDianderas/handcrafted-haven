import Navbar from "@/app/ui/navbar";
import styles from "./catalog.module.css";
import Image from "next/image";
import Link from "next/link"; 
import { sql } from '@vercel/postgres'; 
import { playfair } from "@/app/ui/fonts";

export default async function CatalogPage() {
  
  const { rows: products } = await sql`SELECT * FROM products`;

  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.container}>
        <h1 className={`${styles.title} ${playfair.className}`}>Our Collection</h1>
        
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className={styles.img}
                />
              </div>
              <h3 className={playfair.className}>{product.name}</h3>
              <p className={styles.price}>USD {product.price}</p>
              
              {/* Este link nos lleva a la ruta dinámica [id] */}
              <Link href={`/catalog/${product.id}`}>
                <button className={styles.button}>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}