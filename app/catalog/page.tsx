import Navbar from "@/app/ui/navbar";
import styles from "./catalog.module.css";
import Image from "next/image";

export default function CatalogPage() {
  const products = [
    
  ];

  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.container}>
        <h1 className={styles.title}>Our Collection</h1>
        
      </section>
    </main>
  );
}