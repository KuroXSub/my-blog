// src/components/home/ScrollSection.tsx
import { PostCard, StandardCard } from "../ui/Cards";

export default function ScrollSection({ posts }: { posts: PostCard[] }) {
  if (!posts || posts.length < 1) return null;
  // Memastikan hanya 4 artikel
  const displayPosts = posts.slice(0, 4);

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold mb-6 text-stone-800 tracking-tight">✨ Pilihan Spesial</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayPosts.map(post => (
          <StandardCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}