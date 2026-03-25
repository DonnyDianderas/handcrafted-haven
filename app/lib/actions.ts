'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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