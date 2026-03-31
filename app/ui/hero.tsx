import Image from 'next/image';
import Button from './button';
import { playfair, inter } from "@/app/ui/fonts";
import styles from './hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={`${playfair.className} ${styles.title}`}>
          Discover Unique, <br /> Handcrafted Treasures
        </h1>
        <p className={`${inter.className} ${styles.description}`}>
          Explore a curated collection of artisan-made goods crafted with passion and care.
        </p>
        <div className={styles.buttonGroup}>
          <Button href="/catalog">Browse Catalog</Button>
          <Button href="/get-started" variant="outline">Get Started</Button>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src="https://images.unsplash.com/photo-1662845114342-256fdc45981d?auto=format&fit=crop&q=80&w=1080"
            alt="Artisan hands"
            fill
            className={styles.img}
            priority
          />
        </div>
      </div>
    </section>
  );
}