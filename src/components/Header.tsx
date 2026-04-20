import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-4 px-2 sm:px-6 flex justify-center">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border border-orange-100/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between w-full max-w-6xl">
        <Link href="/" className="font-bold text-lg sm:text-xl text-stone-800 tracking-tight hover:text-orange-500 transition-colors">
          KuroSapa
        </Link>
        <ul className="flex items-center gap-1 sm:gap-6 text-xs sm:text-sm font-medium text-stone-600">
          <li><Link href="/" className="hover:text-orange-500 hover:bg-orange-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all">Beranda</Link></li>
          <li><Link href="/kategori" className="hover:text-orange-500 hover:bg-orange-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all">Kategori</Link></li>
          <li><Link href="/about" className="hover:text-orange-500 hover:bg-orange-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all">Tentang</Link></li>
        </ul>
      </nav>
    </header>
  );
}