import CreateProductForm from '@/app/ui/products/create-form';
import { playfair } from '@/app/ui/fonts';

export default function Page() {
  // Temporary ID for Alfredo Naucapoma (woodworker) 
  const tempArtisanId = "5f2efbdd-5bbb-4138-b167-b84938c937d7"; 

  return (
    <div style={{ padding: '40px 0' }}>
      <h1 className={playfair.className} style={{ 
        textAlign: 'center', 
        fontSize: '2.2rem', 
        marginBottom: '32px',
        color: 'var(--primary)' 
      }}>
        Add New Product to Shop
      </h1>
      
      {/* Rendering the form component with the temporary artisan ID */}
      <CreateProductForm artisanId={tempArtisanId} />

    </div>
  );
}