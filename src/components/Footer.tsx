// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-sm">
        <p>© {new Date().getFullYear()} KuroSapa Labs. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-orange-500 transition-colors">Beranda</Link>
          <Link href="/kategori" className="hover:text-orange-500 transition-colors">Kategori</Link>
          <Link href="/about" className="hover:text-orange-500 transition-colors">Tentang</Link>
        </div>
      </div>
    </footer>
  );
}