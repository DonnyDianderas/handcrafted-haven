"use client";

import React from "react";
import styles from '@/app/catalog/[id]/product-review-section.module.css';

interface ProductReviewProps {
    rating: number;
    reviewText: string;
    customerName: string;
}

const ProductReview: React.FC<ProductReviewProps> = ({
    rating,
    reviewText,
    customerName
}) => {
    return (
        <div className={styles.review}>
            <h3>{customerName}</h3>
            <h2>Rating: {rating}</h2>
            <p>{reviewText}</p>
        </div>
    );
}

export default ProductReview;