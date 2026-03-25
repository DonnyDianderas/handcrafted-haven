import '@/app/global.css';
import { inter, playfair } from "@/app/ui/fonts";
import type { Metadata } from "next";
import Navbar from "@/app/ui/navbar";

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven',
  },
  description: "A curated marketplace for unique, artisan-made goods.",
  metadataBase: new URL('https://handcrafted-haven-teal.vercel.app/'), 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body style={{ margin: 0, backgroundColor: 'var(--background)' }}>
       
        <Navbar />
               
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
          {children}
        </main>
      </body>
    </html>
  );
}