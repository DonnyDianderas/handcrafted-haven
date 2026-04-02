import { playfair } from '@/app/ui/fonts';
import Link from 'next/link';
import { auth } from '@/auth';
import styles from '@/app/ui/dashboard/dashboard.module.css';
import { redirect } from 'next/navigation';
import ThemeToggle from '@/app/ui/ThemeToggle';
import { ThemeProvider } from '@/app/context/ThemeContext';

interface DashboardContentProps {
  userName: string;
  session: any;
}

function DashboardContent({ userName, session }: DashboardContentProps) {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div></div>
          <ThemeToggle />
        </div>
        <h1 className={`${playfair.className} ${styles.title}`}>
          Welcome back, <span className={styles.artistName}>{userName}</span>
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

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const userName = session.user.name || 'Artisan';

  return (
    <ThemeProvider>
      <DashboardContent userName={userName} session={session} />
    </ThemeProvider>
  );
}