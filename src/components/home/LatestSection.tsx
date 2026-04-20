// src/components/home/LatestSection.tsx
import { PostCard, StandardCard, EmptyState } from "../ui/Cards";
import Sidebar from "./Sidebar";

export default function LatestSection({ posts, categories, years }: { posts: PostCard[], categories: any[], years: number[] }) {
  return (
    // Proporsi Grid diubah menjadi 7fr dan 4fr (agar sidebar lebih lebar dari sebelumnya)
    <section className="grid grid-cols-1 lg:grid-cols-[7fr_4fr] gap-10 mb-20">
      <div>
        <h2 className="text-3xl font-bold mb-8 text-stone-800 tracking-tight">📰 Artikel Terbaru</h2>
        {posts.length === 0 ? <EmptyState /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => <StandardCard key={post._id} post={post} />)}
          </div>
        )}
      </div>
      <div className="hidden lg:block"><Sidebar categories={categories} years={years} /></div>
    </section>
  );
}