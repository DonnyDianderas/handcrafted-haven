'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/auth'; 
import { AuthError } from 'next-auth';  

export type State = {
  message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
  // Extract data from the form
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price');
  const image_url = formData.get('image_url') as string;
  const category = formData.get('category') as string;
  const artisan_id = formData.get('artisan_id') as string;

  try {
    await sql`
      INSERT INTO products (artisan_id, name, description, price, image_url, category)
      VALUES (
        ${artisan_id}, 
        ${name}, 
        ${description}, 
        ${Number(price)}, 
        ${image_url}, 
        ${category}
      )
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to create the product.',
    };
  }

  // Refresh the catalog to show the new product
  revalidatePath('/catalog');
  // Redirect the user to the catalog page
  redirect('/catalog');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // If login is successful, NextAuth automatically redirects the user.
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // AuthError means the credentials were wrong (email or password)
      if (error.type === 'CredentialsSignin') {
        return 'Wrong email or password. Please try again.';
      }
      return 'Something went wrong. Please try again.';
    }
    // IMPORTANT: If it is NOT an AuthError, it might be the redirect
    // that Next.js throws internally after a successful sign-in.
    // We must re-throw it so the redirect actually happens.
    throw error;
  }
}

// ── Register a new artisan ────────────────────────────────────────────────────
export async function registerArtisan(
  prevState: string | undefined,
  formData: FormData,
) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;
  const confirm = formData.get('confirm') as string;

  // ── Step 1: Validate the inputs ──────────────────────────────────────────
  if (!name || !email || !password || !confirm) {
    return 'All fields are required.';
  }

  if (password !== confirm) {
    return 'Passwords do not match.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }

  // ── Step 2: Make sure the email isn't already taken ──────────────────────
  try {
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.rows.length > 0) {
      return 'An account with this email already exists.';
    }
  } catch {
    return 'Something went wrong checking your email. Try again.';
  }

  // ── Step 3: Hash the password before storing it ──────────────────────────
  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.hash(password, 10);

  // ── Step 4: Insert the new artisan into the database ─────────────────────
  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
  } catch {
    return 'Failed to create account. Please try again.';
  }

  // ── Step 5: Sign them in automatically right after registering ───────────
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Account created! Please sign in.';
    }
    throw error;
  }
}

// ── Logout (Sign Out) ───────────────────────────────────────────────────────
export async function logout() {
  await signOut({ redirectTo: '/' });
}

// ... (tus funciones anteriores: createProduct, authenticate, registerArtisan, logout)

// ── Update Artisan Profile (Biography and Name) ─────────────────────────────
export async function updateArtisanProfile(
  id: string, 
  formData: FormData
) {
  const name = formData.get('name') as string;
  const biography = formData.get('biography') as string;

  try {
    await sql`
      UPDATE users
      SET name = ${name}, biography = ${biography}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update profile.');
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}