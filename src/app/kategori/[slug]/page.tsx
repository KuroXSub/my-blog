import { client } from "@/sanity/client";
import { StandardCard, EmptyState } from "@/components/ui/Cards";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";

export default async function CategoryDetailPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>, 
  searchParams: Promise<{ page?: string }> 
}) {
  const { slug } = await params;
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;
  const postsPerPage = 9;
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  // Dapatkan ID Kategori berdasarkan slug
  const catData = await client.fetch(`*[_type == "category" && slug.current == $slug][0]{_id, title}`, { slug });
  if (!catData) return <EmptyState message="Kategori tidak ditemukan." />;

  const totalQuery = `count(*[_type == "post" && references($catId)])`;
  const postsQuery = `*[_type == "post" && references($catId)] | order(publishedAt desc)[${start}...${end}] {
    _id, title, slug, publishedAt, image, "category": category->title, "categorySlug": category->slug.current
  }`;

  const [totalPosts, posts] = await Promise.all([
    client.fetch(totalQuery, { catId: catData._id }),
    client.fetch(postsQuery, { catId: catData._id })
  ]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <Link href="/kategori" className="text-sm font-medium text-stone-500 hover:text-orange-500">&larr; Kembali ke Semua Kategori</Link>
        <h1 className="text-3xl font-bold text-stone-800">Kategori: <span className="text-orange-600">{catData.title}</span></h1>
        <p className="text-stone-500">Menampilkan {totalPosts} artikel</p>
      </div>

      <section>
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/kategori/${slug}`} />
        {posts.length === 0 ? <EmptyState /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {posts.map((post: any) => <StandardCard key={post._id} post={post} />)}
          </div>
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/kategori/${slug}`} />
      </section>
    </div>
  );
}