require('dotenv').config();
const { db } = require('@vercel/postgres');

const productsData = [
  { name: 'Artisan Ceramics', price: 45.00, category: 'pottery', image_url: 'https://images.unsplash.com/photo-1578749553370-4b60e3ee44f1?q=80&w=1080&auto=format&fit=crop', seller: 'Jhon Jackson' },
  { name: 'Wooden Bowl', price: 65.00, category: 'woodwork', image_url: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1080&auto=format&fit=crop', seller: 'Alfredo Naucapoma' },
  { name: 'Handwoven Textile', price: 85.00, category: 'textiles', image_url: 'https://images.unsplash.com/photo-1594145070037-330a86650d03?q=80&w=1080&auto=format&fit=crop', seller: 'Ana López' },
  { name: 'Handcrafted Jewelry', price: 55.00, category: 'jewelry', image_url: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce737e?q=80&w=1080&auto=format&fit=crop', seller: 'Margaret Newman' },
  { name: 'Ceramic Basin', price: 38.00, category: 'pottery', image_url: 'https://images.unsplash.com/photo-1610701596295-4dc5d6289214?q=80&w=1080&auto=format&fit=crop', seller: 'Jhon Jackson' },
  { name: 'Woven Basket', price: 42.00, category: 'textiles', image_url: 'https://images.unsplash.com/photo-1590736961918-71e9977288e7?q=80&w=1080&auto=format&fit=crop', seller: 'Ana López' },
  { name: 'Silver Earrings', price: 75.00, category: 'jewelry', image_url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1080&auto=format&fit=crop', seller: 'Margaret Newman' },
  { name: 'Wooden Sculpture', price: 120.00, category: 'woodwork', image_url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1080&auto=format&fit=crop', seller: 'Alfredo Naucapoma' },
  { name: 'Minimalist Mug', price: 25.00, category: 'pottery', image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1080&auto=format&fit=crop', seller: 'Jhon Jackson' },
  { name: 'Traditional Pattern Textile', price: 150.00, category: 'textiles', image_url: 'https://images.unsplash.com/photo-1655149238677-9b5cb1a0afc6?q=80&w=1080&auto=format&fit=crop', seller: 'Ana López' },
];

async function seedDatabase() {
  const client = await db.connect();

  try {
    console.log('--- Starting Handcrafted Haven Seed ---');
    
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        artisan_id UUID NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT DEFAULT 'A unique handcrafted treasure made with passion.',
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT NOT NULL,
        category VARCHAR(50) CHECK (category IN ('pottery', 'textiles', 'woodwork', 'jewelry')),
        FOREIGN KEY (artisan_id) REFERENCES users(id)
      );
    `;

    console.log('Inserting data...');

    for (const item of productsData) {
      
      const sellerEmail = `${item.seller.toLowerCase().replace(/\s/g, '.')}@example.com`;

      const userResult = await client.sql`
        INSERT INTO users (name, email, password)
        VALUES (${item.seller}, ${sellerEmail}, 'password123')
        ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
        RETURNING id;
      `;
      
      const artisanId = userResult.rows[0].id;

      await client.sql`
        INSERT INTO products (artisan_id, name, price, image_url, category)
        VALUES (${artisanId}, ${item.name}, ${item.price}, ${item.image_url}, ${item.category});
      `;
    }

    console.log('Success! Database ready with 10 products.');

  } catch (error) {
    console.error('Error during seed execution:', error);
    throw error;
  } finally {
    await client.end();
  }
}

seedDatabase();