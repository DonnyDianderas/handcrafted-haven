import { playfair } from '@/app/ui/fonts';
import Link from 'next/link';
import { auth } from '@/auth';
import styles from '@/app/ui/dashboard/dashboard.module.css';
import { redirect } from 'next/navigation';
import ThemeToggle from '@/app/ui/ThemeToggle';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { fetchReviewsByCustomerId } from '@/app/lib/data'; 

interface ReviewContentProps {
  userName: string;
  reviews: any[];
}

function ReviewContent({ userName, reviews }: ReviewContentProps) {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Link href="/dashboard/customer" className={styles.backLink} style={{ textDecoration: 'none' }}>
            ← Back
          </Link>
          <ThemeToggle />
        </div>
        <h1 className={`${playfair.className} ${styles.title}`}>
          My <span className={styles.artistName}>Reviews</span>
        </h1>
        <p className={styles.subtitle}>
          Manage the feedback you have shared with our artisans.
        </p>
      </header>

      <div className={styles.grid}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <section key={review.id} className={`${styles.card} ${styles.cardHighlight}`}>
              <div className={styles.cardContent}>
                <h2 className={playfair.className}>{review.product_name}</h2>
                <p style={{ color: '#f59e0b', fontSize: '1.2rem', marginBottom: '8px' }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </p>
                <p>"{review.review_text}"</p>
              </div>
              <div className={styles.buttonGroupVertical}>
                <button className={styles.secondaryButton} style={{ opacity: 0.7 }}>Edit Review (Soon)</button>
              </div>
            </section>
          ))
        ) : (
          <section className={`${styles.card} ${styles.cardHighlight}`} style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <div className={styles.cardContent}>
              <h2 className={playfair.className}>No reviews yet</h2>
              <p>You haven't shared your experience with any handcrafted products yet.</p>
            </div>
            <Link href="/catalog" className={styles.fullWidth}>
              <button className={styles.primaryButton}>Explore Catalog</button>
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}

export default async function CustomerReviewsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/signin');
  }

  const reviews = await fetchReviewsByCustomerId(session.user.id);
  const userName = session.user.name || 'Customer';

  return (
    <ThemeProvider>
      <ReviewContent userName={userName} reviews={reviews} />
    </ThemeProvider>
  );
}