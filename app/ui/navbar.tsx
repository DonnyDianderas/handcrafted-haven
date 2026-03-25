import Link from 'next/link';
import HandcraftedLogo from "@/app/ui/handcrafted-logo";
import Button from './button';
import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <HandcraftedLogo />
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