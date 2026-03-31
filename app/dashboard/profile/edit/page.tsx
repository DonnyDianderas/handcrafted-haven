import { auth } from '@/auth';
import { fetchArtisanById } from '@/app/lib/data';
import { updateArtisanProfile } from '@/app/lib/actions';
import { playfair } from '@/app/ui/fonts';
import styles from '@/app/ui/dashboard/profile-edit.module.css';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

export default async function EditProfilePage() {
  const session = await auth();
  const userId = session?.user?.id;
  
  if (!userId) redirect('/login');

  const artisan = await fetchArtisanById(userId);
  if (!artisan) notFound();

  const updateProfileWithId = updateArtisanProfile.bind(null, userId);

  return (
    <main className={styles.heroContainer}>
      {/* Lado Izquierdo: Estilo Hero Title */}
      <div className={styles.heroContent}>
        <h1 className={`${playfair.className} ${styles.heroTitle}`}>
          Your Artisan <br /> Story
        </h1>
        <p className={styles.heroSubtitle}>
          Every piece you create has a soul. Share the heritage, 
          the passion, and the craft behind your work so customers 
          can connect with the hands that made it.
        </p>
      </div>
      
      {/* Lado Derecho: El Formulario en el Box decorado */}
      <div className={styles.editBox}>
        <form action={updateProfileWithId}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Display Name</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={artisan.name}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="biography" className={styles.label}>Biography</label>
            <textarea
              id="biography"
              name="biography"
              defaultValue={artisan.biography}
              rows={12}
              className={styles.textarea}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.primaryButton}>
              Save Changes
            </button>
            <Link href="/dashboard" className={styles.secondaryButton}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}