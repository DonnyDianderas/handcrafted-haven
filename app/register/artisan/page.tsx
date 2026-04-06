'use client';

import { useActionState } from 'react';
import { registerArtisan } from '@/app/lib/actions';
import styles from '@/app/signin/signin.module.css';
import Link from 'next/link';
import { playfair } from '@/app/ui/fonts';

export default function RegisterArtisanPage() {
    const [errorMessage, formAction, isPending] = useActionState(
        registerArtisan,
        undefined,
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.card} style={{ maxWidth: '500px' }}>
                
                <h2 className={`${playfair.className} ${styles.title}`}>Artisan Onboarding</h2>
                <p style={{ color: '#6A7F92', fontSize: '14px', marginBottom: '24px' }}>
                    Join our community of creators. Fill in your professional profile details below.
                </p>

                <form action={formAction} className={styles.form}>
                    <h3 style={{ fontSize: '16px', color: '#1E4D4F', marginBottom: '10px' }}>Account Credentials</h3>
                    
                    <input type="text" name="name" placeholder="Full Name" className={styles.input} required />
                    <input type="email" name="email" placeholder="Email Address" className={styles.input} required />
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <input type="password" name="password" placeholder="Password" className={styles.input} required minLength={6} />
                        <input type="password" name="confirm" placeholder="Confirm password" className={styles.input} required minLength={6} />
                    </div>

                    <hr style={{ margin: '20px 0', opacity: 0.2 }} />
                    <h3 style={{ fontSize: '16px', color: '#1E4D4F', marginBottom: '10px' }}>Professional Profile</h3>

                    {/* 'specializations' */}
                    <input 
                        type="text" 
                        name="specializations" 
                        placeholder="Primary Crafts (e.g. pottery, jewelry, woodwork, textiles)" 
                        className={styles.input} 
                    />

                    {/* Geographical data mapping to 'workshop_location' */}
                    <input 
                        type="text" 
                        name="workshop_location" 
                        placeholder="Workshop Location (City, Country)" 
                        className={styles.input} 
                    />

                    {/* Biography' */}
                    <textarea 
                        name="biography" 
                        placeholder="About the Artist (A brief biography)" 
                        className={styles.input} 
                        style={{ minHeight: '80px', padding: '10px', resize: 'vertical' }}
                    />

                    {/* 'instagram_url' and 'website_url' */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <input type="url" name="instagram_url" placeholder="Instagram URL" className={styles.input} />
                        <input type="url" name="website_url" placeholder="Personal Website" className={styles.input} />
                    </div>

                    {errorMessage && (
                        <p role="alert" style={{ color: '#c0392b', fontSize: '14px', margin: '10px 0' }}>
                            ⚠ {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isPending}
                        style={{ marginTop: '10px', opacity: isPending ? 0.7 : 1 }}
                    >
                        {isPending ? 'Verifying Profile...' : 'Complete Artisan Registration'}
                    </button>
                </form>

                <p style={{ marginTop: '20px', fontSize: '14px', color: '#6A7F92' }}>
                    Looking to buy crafts?{' '}
                    <Link href="/register/customer" style={{ color: '#1E4D4F', fontWeight: 600 }}>
                        Register as a Customer
                    </Link>
                </p>

                <Link href="/" className={styles.back}>← Back to home</Link>
            </div>
        </div>
    );
}