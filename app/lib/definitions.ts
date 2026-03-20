// This file contains type definitions for our data.
// It describes the shape of the data, and what data type each property should accept.
export type Product = {
  id: string;
  artisan_id: string; 
  name: string;
  description: string;
  price: number; 
  image_url: string; 
  category: 'pottery' | 'textiles' | 'woodwork' | 'jewelry';
};

// I'll use this for the product form I'm building. (Work Item 5)
export type CreateProductForm = Omit<Product, 'id'>;