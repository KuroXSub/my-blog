import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // contoh: "/kategori/teknologi" atau "/kategori"
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex items-center justify-center gap-4 py-6">
      {currentPage > 1 ? (
        <Link href={`${basePath}?page=${prevPage}`} className="px-4 py-2 bg-white border border-stone-200 rounded-full text-sm font-medium hover:border-orange-500 hover:text-orange-600 transition-colors">
          &larr; Sebelumnya
        </Link>
      ) : <span className="px-4 py-2 opacity-50 cursor-not-allowed border border-transparent text-sm"></span>}
      
      <span className="text-sm font-semibold text-stone-500">
        Hal {currentPage} dari {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={`${basePath}?page=${nextPage}`} className="px-4 py-2 bg-white border border-stone-200 rounded-full text-sm font-medium hover:border-orange-500 hover:text-orange-600 transition-colors">
          Selanjutnya &rarr;
        </Link>
      ) : <span className="px-4 py-2 opacity-50 cursor-not-allowed border border-transparent text-sm"></span>}
    </div>
  );
}