import { playfair } from '@/app/ui/fonts';
import Link from 'next/link';
import { auth } from '@/auth';
import styles from '@/app/ui/dashboard/dashboard.module.css';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const userName = session.user.name || 'Artisan';

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={`${playfair.className} ${styles.title}`}>
          Welcome back, {userName}
        </h1>
        <p className={styles.subtitle}>
          Manage your handcrafted products and your artisan story.
        </p>
      </header>

      <div className={styles.grid}>
        {/* Card:Manage Products */}
        <section className={`${styles.card} ${styles.cardHighlight}`}>
          <div className={styles.cardContent}>
             <h2 className={playfair.className}>My Products</h2>
             <p>Display your latest creations to the world.</p>
          </div>
          <Link href="/dashboard/products/create" className={styles.fullWidth}>
            <button className={styles.primaryButton}>+ Add New Product</button>
          </Link>
        </section>

        {/* Card: Shop Profile */}
        <section className={`${styles.card} ${styles.cardHighlight}`}>
          <div className={styles.cardContent}>
            <h2 className={playfair.className}>Shop Profile</h2>
            <p>Update your biography and how customers see your story.</p>
          </div>
          <div className={styles.buttonGroupVertical}>
            <Link href="/dashboard/profile/edit" className={styles.fullWidth}>
              <button className={styles.primaryButton}>Edit Story</button>
            </Link>
            <Link href={`/artisans/${session.user.id}`} className={styles.fullWidth}>
              <button className={styles.secondaryButton}>View Public Page</button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}