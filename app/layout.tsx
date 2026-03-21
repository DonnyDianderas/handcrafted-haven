import '@/app/global.css';
import { inter, playfair } from "@/app/ui/fonts";
import type { Metadata } from "next";

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
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          margin: 0,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {children}
      </body>
    </html>
  );
}