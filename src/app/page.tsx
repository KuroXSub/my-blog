import { client } from "@/sanity/client";
import HeroSection from "@/components/home/HeroSection";
import LatestSection from "@/components/home/LatestSection";
import ScrollSection from "@/components/home/ScrollSection";
import HighlightSection from "@/components/home/HighlightSection";

// Menggunakan pt::text(body) dari GROQ Sanity untuk mendapatkan plain text tanpa tag HTML
const PAGE_QUERY = `{
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, slug, publishedAt, image, tags,
    "category": category->title,
    "categorySlug": category->slug.current,
    "plainTextBody": pt::text(body)
  },
  "categories": *[_type == "category"] {
    _id, title, "slug": slug.current,
    "count": count(*[_type == "post" && references(^._id)])
  }
}`;

export default async function IndexPage() {
  const data = await client.fetch(PAGE_QUERY, {}, { next: { revalidate: 30 } });
  const posts = data.posts || [];
  const categories = data.categories || [];
  const years = Array.from(new Set(posts.map((p: any) => new Date(p.publishedAt).getFullYear()))).sort((a,b) => Number(b) - Number(a));

  // LOGIKA FALLBACK AMAN:
  const heroPosts = posts.slice(0, 3);
  const latestPosts = posts.slice(3, 9);
  
  // Jika artikel < 13, ulang ambil dari index awal agar layout tetap utuh
  const scrollPosts = posts.length > 9 ? posts.slice(9, 13) : posts.slice(0, 4);
  const highlightPosts = posts.length > 13 ? posts.slice(13, 18) : posts.slice(0, 5);

  return (
    <>
      <HeroSection posts={heroPosts} />
      <LatestSection posts={latestPosts} categories={categories} years={years as number[]} />
      
      {/* Fallback Navigasi Mobile */}
      <div className="block lg:hidden mb-20 bg-white rounded-3xl p-6 border border-stone-200">
         <h3 className="font-bold text-lg mb-4 text-stone-800">Eksplorasi Kategori</h3>
         <div className="flex flex-wrap gap-2">
            {categories.map((cat: any) => (
              <a key={cat._id} href={`/kategori/${cat.slug}`} className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-sm">
                {cat.title} ({cat.count})
              </a>
            ))}
         </div>
      </div>

      <ScrollSection posts={scrollPosts} />
      <HighlightSection posts={highlightPosts} />
    </>
  );
}