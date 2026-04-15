import styles from "./catalog.module.css";
import { sql } from '@vercel/postgres';
import { playfair } from "@/app/ui/fonts";
import ProductCard from "@/app/ui/products/ProductCard";
import FilterToggle from "./FilterToggle";

export default async function CatalogPage({ searchParams, }: { 
  searchParams: { 
    sort?: string; 
    category?: string; 
    minPrice?: string; 
    maxPrice?: string; 
  }; 
}) {
  const params = await searchParams;
  const sort = params.sort === "desc" ? "desc" : "asc";
  const category = params.category || "";
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : 0;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : 1000;

  // Build dynamic query with filters
  let query = `SELECT * FROM products WHERE 1=1`;
  const queryParams: any[] = [];
  let paramIndex = 1;

  if (category) {
    query += ` AND category = $${paramIndex}`;
    queryParams.push(category);
    paramIndex++;
  }

  if (params.minPrice) {
    query += ` AND price >= $${paramIndex}`;
    queryParams.push(minPrice);
    paramIndex++;
  }

  if (params.maxPrice) {
    query += ` AND price <= $${paramIndex}`;
    queryParams.push(maxPrice);
    paramIndex++;
  }

  query += ` ORDER BY price ${sort}`;

  const { rows: products } = await sql.query(query, queryParams);

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} ${playfair.className}`}>Our Collection</h1>

      <FilterToggle>
        <form method="get" className={styles.filterForm}>
          <div className={styles.filterGroup}>
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" defaultValue={category}>
              <option value="">All Categories</option>
              <option value="pottery">Pottery</option>
              <option value="textiles">Textiles</option>
              <option value="woodwork">Woodwork</option>
              <option value="jewelry">Jewelry</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="minPrice">Min Price:</label>
            <input 
              type="number" 
              id="minPrice" 
              name="minPrice" 
              defaultValue={params.minPrice || ""} 
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="maxPrice">Max Price:</label>
            <input 
              type="number" 
              id="maxPrice" 
              name="maxPrice" 
              defaultValue={params.maxPrice || ""} 
              placeholder="1000"
              min="0"
              step="0.01"
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="sort">Sort:</label>
            <select id="sort" name="sort" defaultValue={sort}>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          <button type="submit" className={styles.filterButton}>Apply Filters</button>
        </form>
      </FilterToggle>

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