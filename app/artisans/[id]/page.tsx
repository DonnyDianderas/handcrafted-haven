
import { notFound } from 'next/navigation';
import { playfair } from '@/app/ui/fonts';
import styles from './profile.module.css';
import Link from 'next/link';
import { fetchArtisanById } from '@/app/lib/data';
import { auth } from '@/auth'; // import auth function

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtisanProfilePage({ params }: PageProps) {
  const { id } = await params;

  const [artisan, session] = await Promise.all([
    fetchArtisanById(id),
    auth(),
  ]);

  if (!artisan) {
    notFound();
  }

  const isOwner = session?.user?.id === artisan.id;

  return (
    <main className={styles.container}>
      <header className={styles.header}>

        {/* Only show this greeting if the logged-in user owns this profile */}
        {isOwner && (
          <p
            style={{
              color: '#1E4D4F',
              fontWeight: 600,
              marginBottom: '8px',
              fontSize: '15px',
            }}
          >
            Welcome back!
          </p>
        )}

        <h1 className={`${playfair.className} ${styles.title}`}>
          {artisan.name}
        </h1>
        <p className={styles.description}>
          We are currently building the showcase for this artisan.
          Soon you will be able to see their full story and handcrafted collection here.
        </p>
      </header>

      <section className={styles.placeholderSection}>
        <div className={styles.divider} />
        <p>Coming Soon: Artisan Bio &amp; Product Gallery</p>
      </section>

      <Link href="/catalog" className={styles.backLink}>
        ← Back to Catalog
      </Link>
    </main>
  );
}