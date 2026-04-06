'use client';

import { useActionState } from 'react';
import { registerCustomer } from '@/app/lib/actions'; 
import styles from '@/app/signin/signin.module.css';
import Link from 'next/link';

export default function RegisterCustomerPage() {
    const [errorMessage, formAction, isPending] = useActionState(
        registerCustomer,
        undefined,
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                
                <h2 className={styles.title}>Join as a Customer</h2>
                <p style={{ color: '#6A7F92', fontSize: '14px', marginBottom: '24px' }}>
                    Create an account to support local artisans and track your orders.
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
                        {isPending ? 'Creating account...' : 'Create Customer Account'}
                    </button>
                </form>

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