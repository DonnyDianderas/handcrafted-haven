'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export type State = {
  message?: string | null;
};

export async function getUser(email: string) {
  try {
    const artisanResult = await sql`SELECT *, 'artisan' as role FROM users WHERE email = ${email}`;
    if (artisanResult.rows.length > 0) return artisanResult.rows[0];

    const customerResult = await sql`SELECT *, 'customer' as role FROM customers WHERE email = ${email}`;
    if (customerResult.rows.length > 0) return customerResult.rows[0];

    return null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

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
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {

    const user = await getUser(email);

    if (!user) {
      return 'Wrong email or password. Please try again.';
    }

    const destination = (user as any).role === 'customer'
      ? '/dashboard/customer'
      : '/dashboard';


    await signIn('credentials', {
      email,
      password,
      redirectTo: destination,
    });

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }

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

  const specializations = formData.get('specializations') as string;
  const workshop_location = formData.get('workshop_location') as string;
  const biography = formData.get('biography') as string;
  const instagram_url = formData.get('instagram_url') as string;
  const website_url = formData.get('website_url') as string;

  // ── Step 1: Validate the inputs ──────────────────────────────────────────
  if (!name || !email || !password || !confirm) {
    return 'Basic account fields are required.';
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
  const id = crypto.randomUUID();

  // ── Step 4: Insert the new artisan into the database ─────────────────────
  try {
    await sql`
      INSERT INTO users (
        id, name, email, password, 
        specializations, workshop_location, biography, 
        instagram_url, website_url
      )
      VALUES (
        ${id}, ${name}, ${email}, ${hashedPassword}, 
        ${specializations ? `{${specializations}}` : null}, ${workshop_location || null}, ${biography || null}, 
        ${instagram_url || null}, ${website_url || null}
      )
    `;
  } catch (error) {
    console.error('SERVER ACTION ERROR:', error);
    return `Database Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }

  // ── Step 5: Sign them in automatically right after registering ───────────
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
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

// Create Review from Form ----------------------------------------------------
export async function createReview(
  id: string,
  formData: FormData
) {
  const rating = Number(formData.get("rating") as string);
  let reviewText = (formData.get("review-text") as string)?.trim();

  const customerId = formData.get("customerId") as string;

  try {
    if (!rating)
      throw new Error("A rating is required.")
    if (rating < 1 || rating > 5)
      throw new Error("Rating is out of bounds: ratings must be between 1 and 5 inclusive.");
    if (!reviewText)
      reviewText = "NULL";
    if (!customerId) throw new Error("Customer identification is missing.");

    await sql`
      INSERT INTO reviews (product_id, rating, review_text, customer_id)
      VALUES (${id}, ${rating}, ${reviewText}, ${customerId})
    `;

    revalidatePath(`/catalog/${id}`);
    revalidatePath('/dashboard/customer/reviews');

  } catch (e) {
    console.error((e as Error).message);

  }

  redirect(`/catalog/${id}`);
}

// ── Register a new Customer ──────────────────────────────────────────────────
export async function registerCustomer(prevState: string | undefined, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirm = formData.get('confirm') as string;

  if (password !== confirm) return "Passwords do not match.";

  try {
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();

    await sql`
      INSERT INTO customers (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword})
    `;

    await signIn('credentials', { email, password, redirectTo: '/catalog' });

  } catch (error) {

    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    console.error(error);
    return "Failed to create customer.";
  }
}