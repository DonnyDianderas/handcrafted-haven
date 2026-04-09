import styles from "./catalog.module.css";
import { sql } from '@vercel/postgres';
import { playfair } from "@/app/ui/fonts";
import ProductCard from "@/app/ui/products/ProductCard";

export default async function CatalogPage({ searchParams, }: { searchParams: { sort?: string }; }) {
  const params = await searchParams;
  const sort = params.sort === "desc" ? "desc" : "asc";

  const { rows: products } =
    sort === "desc"
      ? await sql`SELECT * FROM products ORDER BY price DESC`
      : await sql`SELECT * FROM products ORDER BY price ASC`;

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} ${playfair.className}`}>Our Collection</h1>

      <form method="get" className={styles.filterForm}>
        <label htmlFor="sort">Sort Products:</label>
        <select id="sort" name="sort" defaultValue={sort}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <button type="submit">Sort</button>
      </form>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image_url={product.image_url}
            artisan_id={product.artisan_id}
          />
        ))}
      </div>
    </section>
  );
}