import CreateProductForm from '@/app/ui/products/create-form';
import { playfair } from '@/app/ui/fonts';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  // Temporary ID for Alfredo Naucapoma (woodworker) 
  //const tempArtisanId = "5f2efbdd-5bbb-4138-b167-b84938c937d7"; 

  // Get the current session to identify the logged-in artisan
  const session = await auth();
  const userId = session?.user?.id;

  // If  there is no user, we shouldn't show the form
  if (!userId) {
    redirect('/login');
  }

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
      
      
      <CreateProductForm artisanId={userId} />

    </div>
  );
}