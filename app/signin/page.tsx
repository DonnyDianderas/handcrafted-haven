
'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import styles from './signin.module.css';
import Link from 'next/link';
import HandcraftedLogo from '@/app/ui/handcrafted-logo';

export default function SignInPage() {
  
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <HandcraftedLogo />
        <h2 className={styles.title}>Welcome Back</h2>

        {/* action={formAction} is what connects this form to the authenticate server action */}
        <form action={formAction} className={styles.form}>

          {/*
           * IMPORTANT: The `name` attribute must match what formData.get() looks for.
           * In auth.ts → authorize(), NextAuth reads credentials.email and credentials.password.
           * These come from inputs with name="email" and name="password".
           */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            required
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            required
            minLength={6}
            autoComplete="current-password"
          />

          {/* Show the error message if authenticate() returned one */}
          {errorMessage && (
            <p
              role="alert"
              aria-live="polite"
              style={{
                color: '#c0392b',
                fontSize: '14px',
                margin: '0',
                textAlign: 'left',
              }}
            >
              ⚠ {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={isPending}
            style={{ opacity: isPending ? 0.7 : 1 }}
          >
            {/* Give the artisan visual feedback while the server works */}
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Link back to sign-in for artisans who already have an account */}
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#6A7F92' }}>
          Don't have an account?{' '}
          <Link href="/get-started" style={{ color: '#1E4D4F', fontWeight: 600 }}>
            Get Started
          </Link>
        </p>

        <Link href="/" className={styles.back}>← Back to home</Link>
      </div>
    </div>
  );
}