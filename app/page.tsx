import Navbar from "@/app/ui/navbar";
import Hero from "@/app/ui/hero";

export default function Page() {
  return (
    <main 
      style={{ 
        maxWidth: '100%', 
        overflowX: 'hidden', 
        padding: '0 16px 40px 16px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Navbar />
      <Hero />
    </main>
  );
}