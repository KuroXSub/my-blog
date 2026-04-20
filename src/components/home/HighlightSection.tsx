// src/components/home/HighlightSection.tsx
import { PostCard, FeaturedCard, ListCard } from "../ui/Cards";

export default function HighlightSection({ posts }: { posts: PostCard[] }) {
  if (!posts || posts.length < 2) return null;

  const leftVerticalList = posts.slice(0, 4);
  const rightFeatured = posts[4] || posts[0]; // Fallback jika artikel kurang

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
      {/* Kolom Kiri: 4 Artikel List Vertikal */}
      <div className="flex flex-col gap-4 justify-start">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">🔥 Sedang Hangat</h2>
        {leftVerticalList.map(post => <ListCard key={post._id} post={post} />)}
      </div>

      {/* Kolom Kanan: 1 Artikel Besar (Teks sudah kecil bawaan FeaturedCard) */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-stone-800 mb-4 text-transparent select-none hidden lg:block">_</h2>
        <FeaturedCard post={rightFeatured} />
      </div>
    </section>
  );
}