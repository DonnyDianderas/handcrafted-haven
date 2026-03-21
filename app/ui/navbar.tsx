import Link from 'next/link';
import HandcraftedLog from "@/app/ui/handcrafted-logo";
import Button from './button';
import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <HandcraftedLog />
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/catalog">Catalog</Link>
          <Link href="/about">About</Link>
        </nav>
        <Button href="/signin" variant="outline">Sign In</Button>
      </div>
    </header>
  );
}