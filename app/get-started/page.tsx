import Navbar from "@/app/ui/navbar";
import styles from "./get-started.module.css";

export default function GetStartedPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.container}>
        <div className={styles.card}>
          <h2>Join the Community</h2>
          <p>Are you an artisan? Start selling your handcrafted treasures today.</p>
          <button className={styles.button}>Create Artisan Account</button>
          <hr className={styles.divider} />
          <p>Just looking for unique goods?</p>
          <button className={styles.outlineButton}>Create Customer Account</button>
        </div>
      </section>
    </main>
  );
}