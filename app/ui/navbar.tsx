// app/ui/navbar.tsx
// Replace the ENTIRE content of this file with what is below.
//
// Changes from the original:
// 1. The function is now `async` so it can call auth()
// 2. We check if the user is logged in and show different content accordingly
// 3. A Sign Out button calls the logout() server action

import Link from 'next/link';
import HandcraftedLogo from '@/app/ui/handcrafted-logo';
import Button from './button';
import styles from './navbar.module.css';
import { auth } from '@/auth';                 // ← check who is logged in
import { logout } from '@/app/lib/actions';    // ← server action to sign out

// This is now an async Server Component.
// Async lets us use `await auth()` to read the session on the server side.
export default async function Navbar() {
  const session = await auth();
  const user = session?.user; // user is null/undefined if no one is logged in

  return (
    <header className={styles.header}>
      <HandcraftedLogo />
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/catalog">Catalog</Link>
          <Link href="/about">About</Link>
        </nav>

        {/*
         * Conditional rendering:
         * - If `user` exists → show their name and a Sign Out button
         * - If `user` is null → show the Sign In button (the original behaviour)
         */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Show the artisan's name so they know they are logged in */}
            <span style={{ fontSize: '14px', color: '#1E4D4F', fontWeight: 600 }}>
              {user.name}
            </span>

            {/*
             * Sign Out is a form with a server action.
             * Why a form and not a <button onClick>?
             * Because signOut() is a Server Action — it must be triggered
             * through a form submission, not a client-side click handler.
             */}
            <form action={logout}>
              <button
                type="submit"
                style={{
                  background: 'none',
                  border: '1px solid #1E4D4F',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  color: '#1E4D4F',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          // Not logged in → show the original Sign In button
          <Button href="/signin" variant="outline">Sign In</Button>
        )}
      </div>
    </header>
  );
}