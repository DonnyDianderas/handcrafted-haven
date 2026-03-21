import Navbar from "@/app/ui/navbar";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.container}>
        <div className={styles.content}>
          <h1>Our Story</h1>
          <p>Handcrafted Haven was born from a passion for preserving traditional craftsmanship in a digital world.</p>
          <p>We connect independent artisans with people who value the soul and story behind every object.</p>
        </div>
      </section>
    </main>
  );
}