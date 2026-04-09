import { notFound } from 'next/navigation';
import { playfair } from '@/app/ui/fonts';
import styles from './profile.module.css';
import Link from 'next/link';
import { fetchArtisanById } from '@/app/lib/data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtisanProfilePage({ params }: PageProps) {
  const { id } = await params;

  const artisan = await fetchArtisanById(id);

  if (!artisan) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>

       

        <h1 className={`${playfair.className} ${styles.title}`}>
          {artisan.name}
        </h1>
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
        <p>Coming Soon: Artisan Bio &amp; Product Gallery</p>
      </section>

      <Link href="/catalog" className={styles.backLink}>
        &larr; Back to Catalog
      </Link>
    </main>
  );
}