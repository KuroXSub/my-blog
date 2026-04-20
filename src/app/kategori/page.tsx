import { client } from "@/sanity/client";
import { StandardCard, EmptyState } from "@/components/ui/Cards";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";

export default async function AllCategoriesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const postsPerPage = 9;
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  // Fetch Kategori & Total Post
  const catQuery = `*[_type == "category"]{ _id, title, "slug": slug.current, "count": count(*[_type == "post" && references(^._id)]) }`;
  const totalQuery = `count(*[_type == "post" && defined(slug.current)])`;
  const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[${start}...${end}] {
    _id, title, slug, publishedAt, image, "category": category->title, "categorySlug": category->slug.current
  }`;

  const [categories, totalPosts, posts] = await Promise.all([
    client.fetch(catQuery),
    client.fetch(totalQuery),
    client.fetch(postsQuery)
  ]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Filter Kategori */}
      <section className="text-center space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">Semua Kategori</h1>
        
        {/* Tampilan Mobile: Toggle / Accordion (Sembunyi secara default) */}
        <details className="sm:hidden group">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full bg-white border border-stone-200 px-4 py-2 text-xs font-medium text-stone-600 hover:text-orange-600 outline-none">
            Lihat Daftar Kategori
            <span className="transition-transform duration-300 group-open:rotate-180">▼</span>
          </summary>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href="/kategori" className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-medium">Semua ({totalPosts})</Link>
            {categories.map((cat: any) => (
              <Link key={cat._id} href={`/kategori/${cat.slug}`} className="bg-white border border-stone-200 text-stone-600 px-3 py-1.5 rounded-full text-xs font-medium transition-all">
                {cat.title} ({cat.count})
              </Link>
            ))}
          </div>
        </details>

        {/* Tampilan Desktop: Terlihat semua secara mendatar */}
        <div className="hidden sm:flex flex-wrap justify-center gap-3">
          <Link href="/kategori" className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">Semua ({totalPosts})</Link>
          {categories.map((cat: any) => (
            <Link key={cat._id} href={`/kategori/${cat.slug}`} className="bg-white border border-stone-200 text-stone-600 hover:border-orange-500 hover:text-orange-500 px-4 py-2 rounded-full text-sm font-medium transition-all">
              {cat.title} ({cat.count})
            </Link>
          ))}
        </div>
      </section>

      {/* Grid Artikel & Pagination */}
      <section>
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/kategori" />
        
        {posts.length === 0 ? <EmptyState /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {posts.map((post: any) => <StandardCard key={post._id} post={post} />)}
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/kategori" />
      </section>
    </div>
  );
}