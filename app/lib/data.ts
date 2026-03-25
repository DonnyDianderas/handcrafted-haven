import { sql } from '@vercel/postgres';

// Fetch a specific product along with the name of its artisan
export async function fetchProductById(id: string) {
  try {
    const data = await sql`
      SELECT products.*, users.name as artisan_name 
      FROM products 
      JOIN users ON products.artisan_id = users.id 
      WHERE products.id = ${id}
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

// Fetch the basic data of an artisan
export async function fetchArtisanById(id: string) {
  try {
    const data = await sql`
      SELECT id, name FROM users WHERE id = ${id}
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artisan.');
  }
}