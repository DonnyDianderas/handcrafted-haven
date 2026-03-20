import '@/app/ui/global.css';
import { inter, playfair } from "@/app/ui/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven',
  },
  description: "A curated marketplace for unique, artisan-made goods.",
  metadataBase: new URL('https://handcrafted-haven.vercel.app'), // I´ll change it with my link in vercel
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}