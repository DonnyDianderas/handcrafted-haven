import { sql } from '@vercel/postgres';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { playfair } from "@/app/ui/fonts";
import Navbar from "@/app/ui/navbar";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  // 1. Esperamos a que los parámetros de la URL estén listos
  const { id } = await params;

  // 2. Buscamos el producto en la base de datos
  const { rows } = await sql`
    SELECT products.*, users.name as artisan_name 
    FROM products 
    JOIN users ON products.artisan_id = users.id 
    WHERE products.id = ${id}
  `;

  const product = rows[0];

  if (!product) {
    notFound();
  }

  return (
    <main style={{ padding: '20px' }}>
      <Navbar />
      <section style={{ maxWidth: '1000px', margin: '60px auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        {/* Imagen */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden' }}>
          <Image 
            src={product.image_url} 
            alt={product.name} 
            fill 
            style={{ objectFit: 'cover' }} 
          />
        </div>

        {/* Información */}
        <div>
          <h1 className={playfair.className} style={{ fontSize: '42px', marginBottom: '10px' }}>
            {product.name}
          </h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Handcrafted by <strong>{product.artisan_name}</strong>
          </p>
          <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>
            USD {product.price}
          </h2>
          <p style={{ lineHeight: '1.6', color: '#444', marginBottom: '40px' }}>
            {product.description || "A unique handcrafted treasure made with passion."}
          </p>
          
          <button style={{ 
            backgroundColor: 'black', 
            color: 'white', 
            padding: '15px 30px', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            width: '100%' 
          }}>
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}