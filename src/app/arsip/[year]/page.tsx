import { client } from "@/sanity/client";
import { StandardCard, EmptyState } from "@/components/ui/Cards";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";

export default async function ArchiveYearPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ year: string }>, 
  searchParams: Promise<{ page?: string }> 
}) {
  const { year } = await params;
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;
  const postsPerPage = 9;
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  // Filter GROQ berdasarkan string tahun "YYYY*"
  const yearMatch = `${year}*`;
  
  const totalQuery = `count(*[_type == "post" && defined(slug.current) && publishedAt match $yearMatch])`;
  const postsQuery = `*[_type == "post" && defined(slug.current) && publishedAt match $yearMatch] | order(publishedAt desc)[${start}...${end}] {
    _id, title, slug, publishedAt, image, "category": category->title, "categorySlug": category->slug.current
  }`;

  const [totalPosts, posts] = await Promise.all([
    client.fetch(totalQuery, { yearMatch }),
    client.fetch(postsQuery, { yearMatch })
  ]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <Link href="/" className="text-sm font-medium text-stone-500 hover:text-orange-500">&larr; Kembali ke Beranda</Link>
        <h1 className="text-3xl font-bold text-stone-800">Arsip Tahun: <span className="text-orange-600">{year}</span></h1>
        <p className="text-stone-500">Menemukan {totalPosts} artikel pada tahun ini</p>
      </div>

      <section>
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/arsip/${year}`} />
        {posts.length === 0 ? <EmptyState message={`Belum ada artikel di tahun ${year}.`} /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {posts.map((post: any) => <StandardCard key={post._id} post={post} />)}
          </div>
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/arsip/${year}`} />
      </section>
    </div>
  );
}