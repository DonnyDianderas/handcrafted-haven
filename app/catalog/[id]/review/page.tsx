import Image from "next/image";
import Link from "next/link";
import { fetchProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { playfair } from '@/app/ui/fonts';
import styles from "../product-detail.module.css";
import reviewStyles from "./product-review.module.css";
import { createReview } from "@/app/lib/actions";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ReviewPage({ params }: PageProps) {
    const { id } = await params;
    const product = await fetchProductById(id);
    const formAction = createReview.bind(null, id);

    if (!product)
        notFound();

    return (
        <form className={styles.container} action={formAction}>
            <div className={styles.grid}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className={styles.img}
                        priority
                    />
                </div>

                <div>
                    <p className={styles.category}>{product.category || "Handcrafted"}</p>
                    <h1 className={styles.title}>{product.name} Review</h1>

                    <p className={styles.artisan}>
                        Handcrafted by {' '}
                        <Link href={`/artisans/${product.artisan_id}`} className={styles.artisanLink}>
                            <span>{product.artisan_name}</span>
                        </Link>
                    </p>

                    <label className={reviewStyles.label}>Rating:
                        <select className={reviewStyles.select} id="rating" name="rating" defaultValue={"-- Rate this Craft --"}>
                            <option disabled>-- Rate this Craft --</option>
                            <option value="1">&#x2b50;</option>
                            <option value="2">&#x2b50;&#x2b50;</option>
                            <option value="3">&#x2b50;&#x2b50;&#x2b50;</option>
                            <option value="4">&#x2b50;&#x2b50;&#x2b50;&#x2b50;</option>
                            <option value="5">&#x2b50;&#x2b50;&#x2b50;&#x2b50;&#x2b50;</option>
                        </select>
                    </label>

                    <label className={reviewStyles.label}>What do you have to say about this craft?
                        <textarea className={reviewStyles.textarea} id="review-text" name="review-text" />
                    </label>

                    <button className={`${styles.buyButton} ${playfair.className}`} type="submit">Leave Your Review</button>
                </div>
            </div>
                    
        </form>
    );
}