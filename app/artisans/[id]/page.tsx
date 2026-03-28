// app/artisans/[id]/page.tsx
// Replace the ENTIRE content of this file with what is below.
//
// Changes from the original:
// 1. We now import `auth` from '@/auth'
// 2. We fetch the session alongside the artisan data
// 3. We compare session.user.id to artisan.id to detect the profile owner

import { notFound } from 'next/navigation';
import { playfair } from '@/app/ui/fonts';
import styles from './profile.module.css';
import Link from 'next/link';
import { fetchArtisanById } from '@/app/lib/data';
import { auth } from '@/auth'; // ← NEW: gives us access to the current session

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtisanProfilePage({ params }: PageProps) {
  const { id } = await params;

  // Fetch the artisan data AND the current session at the same time.
  // Promise.all() runs both requests in parallel — faster than running them one by one.
  const [artisan, session] = await Promise.all([
    fetchArtisanById(id),
    auth(),
  ]);

  if (!artisan) {
    notFound();
  }

  // Is the logged-in artisan viewing their OWN profile page?
  // We compare the ID from their session to the ID of the artisan whose page this is.
  // session.user.id was set in the jwt/session callbacks in auth.ts.
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
            👋 Welcome back! You are viewing your profile page.
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