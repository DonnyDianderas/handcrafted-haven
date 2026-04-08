// Changes from the original:
// 1. The function is now `async` so it can call auth()
// 2. We check if the user is logged in and show different content accordingly
// 3. A Sign Out button calls the logout() server action

import Link from 'next/link';
import HandcraftedLogo from '@/app/ui/handcrafted-logo';
import Button from './button';
import UserActions from './navbar/UserActions';
import styles from './navbar.module.css';
import { auth } from '@/auth';                 // ← check who is logged in
import { logout } from '@/app/lib/actions';    // ← server action to sign out

// This is now an async Server Component.
// Async lets us use `await auth()` to read the session on the server side.
export default async function Navbar() {
  const session = await auth();
  const user = session?.user; // user is null/undefined if no one is logged in

  const dashboardHref = (user as any)?.role === 'customer'
    ? '/dashboard/customer'
    : '/dashboard';

  return (
    <header className={styles.header}>
      <HandcraftedLogo />
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/catalog">Catalog</Link>
          <Link href="/about">About</Link>
        </nav>

        <UserActions
          user={user}
          dashboardHref={dashboardHref}
          onLogout={logout}
        />
      </div>
    </header>
  );
}