import { notFound } from 'next/navigation';
import { fetchProductById } from '@/app/lib/data';
import ProductDetail from '@/app/ui/products/ProductDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetail
      id={product.id}
      name={product.name}
      price={product.price}
      image_url={product.image_url}
      artisan_id={product.artisan_id}
      artisan_name={product.artisan_name}
      category={product.category}
      description={product.description}
    />
  );
}