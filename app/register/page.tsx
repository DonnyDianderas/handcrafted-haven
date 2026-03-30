'use client';

import { useActionState } from 'react';
import { registerArtisan } from '@/app/lib/actions';
import styles from '@/app/signin/signin.module.css'; // reusing the sign-in card styles
import Link from 'next/link';
import HandcraftedLogo from '@/app/ui/handcrafted-logo';

export default function RegisterPage() {
    // useActionState works exactly like on the sign-in page:
    // errorMessage → whatever registerArtisan() returns if something goes wrong
    // formAction   → connect to the <form action={...}>
    // isPending    → true while the server is saving the account
    const [errorMessage, formAction, isPending] = useActionState(
        registerArtisan,
        undefined,
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <HandcraftedLogo />
                <h2 className={styles.title}>Create an Account</h2>
                <p style={{ color: '#6A7F92', fontSize: '14px', marginBottom: '8px' }}>
                    Join Handcrafted Haven as an artisan seller.
                </p>

                <form action={formAction} className={styles.form}>

                    {/* Full name */}
                    <input
                        type="text"
                        name="name"          
                        placeholder="Full name"
                        className={styles.input}
                        required
                        autoComplete="name"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"        
                        placeholder="Email"
                        className={styles.input}
                        required
                        autoComplete="email"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        name="password"      
                        placeholder="Password (min 6 characters)"
                        className={styles.input}
                        required
                        minLength={6}
                        autoComplete="new-password"
                    />

                    {/* Confirm password */}
                    <input
                        type="password"
                        name="confirm"       
                        placeholder="Confirm password"
                        className={styles.input}
                        required
                        minLength={6}
                        autoComplete="new-password"
                    />

                    {/* Show the error returned from registerArtisan() if any */}
                    {errorMessage && (
                        <p
                            role="alert"
                            aria-live="polite"
                            style={{ color: '#c0392b', fontSize: '14px', margin: 0, textAlign: 'left' }}
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
                        {isPending ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                {/* Link back to sign-in for artisans who already have an account */}
                <p style={{ marginTop: '20px', fontSize: '14px', color: '#6A7F92' }}>
                    Already have an account?{' '}
                    <Link href="/signin" style={{ color: '#1E4D4F', fontWeight: 600 }}>
                        Sign in
                    </Link>
                </p>

                <Link href="/" className={styles.back}>← Back to home</Link>
            </div>
        </div>
    );
}