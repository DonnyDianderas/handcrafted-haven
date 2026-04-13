import { notFound } from 'next/navigation';
import { fetchProductById, fetchReviewsByProductId } from '@/app/lib/data';
import ProductDetail from '@/app/ui/products/ProductDetail';
import ProductReview from "@/app/ui/products/ProductReview";
import styles from "./product-review-section.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  const reviews = await fetchReviewsByProductId(id);
  let ReviewSection = null;
  if (reviews && reviews.length) {
    ReviewSection = reviews.map(async function (review) {
      return (
        <ProductReview
          rating={review.rating}
          reviewText={review.review_text}
          customerName={review.name}
        />
      );
    });
  } else {
    ReviewSection = (
      <p>There don't seem to be any reviews!</p>
    );
  }

  return (
    <>
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
      <section className={styles.reviewContainer}>
        <h2>Reviews</h2>
        <section className={styles.reviewGrid}>
          {ReviewSection}
        </section>
      </section>
    </>
  );
}