import { PostCard, FeaturedCard, StandardCard, EmptyState } from "../ui/Cards";

export default function HeroSection({ posts }: { posts: PostCard[] }) {
  if (!posts || posts.length === 0) return <EmptyState />;
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 mb-20">
      <FeaturedCard post={posts[0]} />
      <div className="flex flex-col gap-6">
        {posts.slice(1, 3).map(p => <StandardCard key={p._id} post={p} />)}
      </div>
    </section>
  );
}