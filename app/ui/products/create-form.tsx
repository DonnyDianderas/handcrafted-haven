'use client';

import { useActionState } from 'react';
import { inter } from '@/app/ui/fonts';
import Button from '@/app/ui/button';
import { createProduct, State } from '@/app/lib/actions';
import styles from './create-form.module.css';

export default function CreateProductForm({ artisanId }: { artisanId: string }) {
  const initialState: State = { message: null };
  const [state, formAction] = useActionState(createProduct, initialState);

  return (
    <form action={formAction} className={`${styles.form} ${inter.className}`}>
      {/* Hidden field with the artisan’s ID */}
      <input type="hidden" name="artisan_id" value={artisanId} />

      <div className={styles.inputGroup}>
        <label htmlFor="name">Product Name</label>
        <input 
          id="name" 
          name="name" 
          type="text" 
          placeholder="e.g. Ceramic Vase" 
          required 
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="category">Category</label>
        <select id="category" name="category" required defaultValue="">
          <option value="" disabled>Select a category</option>
          <option value="pottery">Pottery</option>
          <option value="textiles">Textiles</option>
          <option value="woodwork">Woodwork</option>
          <option value="jewelry">Jewelry</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="price">Price (USD)</label>
        <input 
          id="price" 
          name="price" 
          type="number" 
          step="0.01" 
          placeholder="0.00" 
          required 
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="image_url">Image URL (Unsplash)</label>
        <input 
          id="image_url" 
          name="image_url" 
          type="url" 
          placeholder="https://images.unsplash.com/..." 
          required 
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          name="description" 
          rows={3} 
          placeholder="Tell the story of this piece..." 
          required 
        />
      </div>

      {state.message && (
        <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>
          {state.message}
        </p>
      )}

      <div className={styles.actions}>
        <Button type="submit">Publish Product</Button>
      </div>
    </form>
  );
}