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
          Manage your orders and share your experience with our artisan community.
        </p>
      </header>

      <div className={styles.grid}>
        {/* Card: My Orders */}
        <section className={`${styles.card} ${styles.cardHighlight}`}>
          <div className={styles.cardContent}>
            <h2 className={playfair.className}>My Orders</h2>
            <p>Check the status of your purchases and your shopping history.</p>
          </div>
          <Link href="/dashboard/customer/orders" className={styles.fullWidth}>
            <button className={styles.primaryButton}>View My Orders</button>
          </Link>
        </section>

        {/* Card: My Reviews */}
        <section className={`${styles.card} ${styles.cardHighlight}`}>
          <div className={styles.cardContent}>
            <h2 className={playfair.className}>My Reviews</h2>
            <p>View the feedback you have shared and help our artisans grow.</p>
          </div>
          <div className={styles.buttonGroupVertical}>
            <Link href="/dashboard/customer/reviews" className={styles.fullWidth}>
              <button className={styles.primaryButton}>Manage Reviews</button>
            </Link>
            <Link href="/catalog" className={styles.fullWidth}>
              <button className={styles.secondaryButton}>Explore Catalog</button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default async function CustomerDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const userName = session.user.name || 'Customer';

  return (
    <ThemeProvider>
      <DashboardContent userName={userName} session={session} />
    </ThemeProvider>
  );
}