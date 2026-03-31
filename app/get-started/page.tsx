import { playfair } from "@/app/ui/fonts";
import styles from "./get-started.module.css";
import Link from "next/link";

export default function GetStartedPage() {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h2 className={playfair.className}>Join the Community</h2>
        <p>Are you an artisan? Start selling your handcrafted treasures today.</p>
        
        <Link href="/register">
          <button className={styles.button}>Create Artisan Account</button>
        </Link>
        
        <hr className={styles.divider} />
        
        <p>Just looking for unique goods?</p>
        
        <Link href="/register">
          <button className={styles.outlineButton}>Create Customer Account</button>
        </Link>
      </div>
    </section>
  );
}