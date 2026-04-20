// src/components/home/Sidebar.tsx
import Link from "next/link";

export default function Sidebar({ categories, years }: { categories: any[], years: number[] }) {
  return (
    <aside className="sticky top-28 bg-white/50 backdrop-blur-sm border border-stone-200 rounded-3xl p-8 shadow-sm h-fit">
      <div className="mb-8">
        <h3 className="text-lg font-bold border-l-4 border-orange-500 pl-3 mb-4 text-stone-800">Tentang Platform</h3>
        <p className="text-stone-600 text-sm leading-relaxed">Platform dokumentasi dan catatan eksplorasi web development, keamanan siber, dan desain modern.</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-bold border-l-4 border-orange-500 pl-3 mb-4 text-stone-800">Kategori</h3>
        <ul className="space-y-3 text-sm">
          {categories.map((cat: any) => (
            <li key={cat._id}>
              <Link href={`/kategori/${cat.slug}`} className="flex justify-between text-stone-600 hover:text-orange-600 transition-colors font-medium">
                <span>{cat.title}</span>
                <span className="bg-stone-100 px-2 py-0.5 rounded-full text-xs">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold border-l-4 border-orange-500 pl-3 mb-4 text-stone-800">Arsip Tahun</h3>
        <div className="flex flex-wrap gap-2">
          {years.map(year => (
            <Link key={year} href={`/arsip/${year}`} className="bg-white border border-stone-200 text-stone-600 px-3 py-1 rounded-full text-xs hover:border-orange-500 hover:text-orange-500 transition-all">
              {year}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}