import Link from 'next/link';
import Image from 'next/image';
import { playfair, inter } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <h1 className={`${playfair.className} text-5xl md:text-7xl text-primary text-center`}>
        Handcrafted Treasures
      </h1>
    </main>
  );
}