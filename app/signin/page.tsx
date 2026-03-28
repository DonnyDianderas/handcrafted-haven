// app/signin/page.tsx
// Replace the ENTIRE content of this file with what is below.
//
// We add 'use client' because we need two client-side features:
// 1. useActionState — to connect the form to our server action
// 2. Showing a loading state while the server processes the login

'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import styles from './signin.module.css';
import Link from 'next/link';
import HandcraftedLogo from '@/app/ui/handcrafted-logo';

export default function SignInPage() {
  // useActionState is a React hook that links a form to a server action.
  //
  // It gives us three things:
  // - errorMessage : whatever our authenticate() function returns (the error string, or undefined)
  // - formAction   : the function we put in the form's action attribute
  // - isPending    : true while the server is processing — useful for a loading state
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate, // the server action to call on submit
    undefined,    // the initial value of errorMessage (no error at start)
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