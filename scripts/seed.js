require('dotenv').config();
const { db } = require('@vercel/postgres');

const productsData = [
  { 
    name: 'Artisan Ceramics', 
    price: 45.00, 
    category: 'pottery', 
    image_url: 'https://images.unsplash.com/photo-1761062404254-8e19c9e77d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMHBvdHRlcnklMjBjZXJhbWljfGVufDF8fHx8MTc3MzI5MTcxN3ww&ixlib=rb-4.1.0&q=80&w=1080', 
    seller: 'Jhon Jackson',
    description: 'This hand-thrown ceramic piece features a unique earth-toned glaze. Fired at high temperatures for durability, it balances modern minimalism with ancient pottery traditions.'
  },
  { 
    name: 'Wooden Bowl', 
    price: 65.00, 
    category: 'woodwork', 
    image_url: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1080&auto=format&fit=crop', 
    seller: 'Alfredo Naucapoma',
    description: 'Carved from a single block of sustainable cedar wood. The natural grain is enhanced with organic beeswax, making it a functional and beautiful center piece for any home.'
  },
  { 
    name: 'Handwoven Textile', 
    price: 85.00, 
    category: 'textiles', 
    image_url: 'https://images.unsplash.com/photo-1760328715296-9714daa8a737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGUlMjB3ZWF2aW5nfGVufDF8fHx8MTc3MzI5MTcxN3ww&ixlib=rb-4.1.0&q=80&w=1080', 
    seller: 'Ana López',
    description: 'A masterpiece of patience and skill. This textile is woven on a traditional backstrap loom using naturally dyed alpaca wool, featuring patterns that tell stories of ancestral heritage.'
  },
  { 
    name: 'Handcrafted Jewelry', 
    price: 55.00, 
    category: 'jewelry', 
    image_url: 'https://images.unsplash.com/photo-1715374033196-0ff662284a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMGpld2VscnklMjBiZWFkc3xlbnwxfHx8fDE3NzMyOTE3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080', 
    seller: 'Margaret Newman',
    description: 'Intricate beadwork meets contemporary design. These lightweight pieces are handcrafted using ethically sourced glass beads, perfect for adding a touch of color to your daily look.'
  },
  { 
    name: 'Ceramic Basin', 
    price: 38.00, 
    category: 'pottery', 
    image_url: 'https://images.unsplash.com/photo-1610701596295-4dc5d6289214?q=80&w=1080&auto=format&fit=crop', 
    seller: 'Jhon Jackson',
    description: 'A versatile basin with a rustic textured finish. Its deep clay body keeps contents at a steady temperature, ideal for both decorative use or serving artisanal snacks.'
  },
  { 
    name: 'Woven Basket', 
    price: 42.00, 
    category: 'textiles', 
    image_url: 'https://images.unsplash.com/photo-1596626417050-39c7f6ddd2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMGJhc2tldCUyMGNyYWZ0fGVufDF8fHx8MTc3MzIwNzAxNnww&ixlib=rb-4.1.0&q=80&w=1080', 
    seller: 'Ana López',
    description: 'Crafted from dried totora reeds harvested near local wetlands. This basket is incredibly sturdy and showcases a complex spiral weaving technique passed down through generations.'
  },
  { 
    name: 'Silver Earrings', 
    price: 75.00, 
    category: 'jewelry', 
    image_url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1080&auto=format&fit=crop', 
    seller: 'Margaret Newman',
    description: 'Pure 950 silver hand-hammered into elegant, flowing shapes. These earrings capture and reflect light beautifully, celebrating the timeless art of high-purity silversmithing.'
  },
  { 
    name: 'Wooden Sculpture', 
    price: 120.00, 
    category: 'woodwork', 
    image_url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1080&auto=format&fit=crop', 
    seller: 'Alfredo Naucapoma',
    description: 'An abstract representation of movement carved from dark walnut. This limited-edition sculpture is hand-sanded for hours to achieve a silk-like touch and a high-end finish.'
  },
  { 
    name: 'Minimalist Mug', 
    price: 25.00, 
    category: 'pottery', 
    image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1080&auto=format&fit=crop', 
    seller: 'Jhon Jackson',
    description: 'The perfect companion for your morning coffee. This stoneware mug features an ergonomic handle and a speckled glaze that makes every single cup slightly unique.'
  },
  { 
    name: 'Traditional Pattern Textile', 
    price: 150.00, 
    category: 'textiles', 
    image_url: 'https://images.unsplash.com/photo-1655149238677-9b5cb1a0afc6?q=80&w=1080&auto=format&fit=crop', 
    seller: 'Ana López',
    description: 'A large-scale wall hanging featuring sacred geometric symbols. Each thread is hand-spun and dyed using local plants, resulting in a vibrant and culturally rich art piece.'
  },
];

async function seedDatabase() {
  const client = await db.connect();

  try {
    console.log('--- Reseeding Handcrafted Haven with Descriptions ---');
    
    // await client.sql`DROP TABLE IF EXISTS products;`;
    // await client.sql`DROP TABLE IF EXISTS users CASCADE;`;

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
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT NOT NULL,
        category VARCHAR(50) CHECK (category IN ('pottery', 'textiles', 'woodwork', 'jewelry')),
        FOREIGN KEY (artisan_id) REFERENCES users(id)
      );
    `;

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
        INSERT INTO products (artisan_id, name, price, image_url, category, description)
        VALUES (${artisanId}, ${item.name}, ${item.price}, ${item.image_url}, ${item.category}, ${item.description});
      `;
    }

    console.log('Success! Database updated with 10 products and unique descriptions.');

  } catch (error) {
    console.error('Error during seed execution:', error);
    throw error;
  } finally {
    await client.end();
  }
}

seedDatabase();