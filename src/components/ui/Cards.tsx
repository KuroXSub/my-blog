// src/components/ui/Cards.tsx
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

export interface PostCard {
  _id: string; title: string; slug: { current: string }; publishedAt: string;
  image?: any; category?: string; categorySlug?: string; tags?: string[]; plainTextBody?: string;
}

export const EmptyState = ({ message = "Belum ada data." }) => (
  <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-stone-100/50 rounded-3xl border border-stone-200 border-dashed">
    <p className="text-stone-500 font-medium text-sm sm:text-base">{message}</p>
  </div>
);

// TEKS KATEGORI DIPERKECIL (text-[10px] di mobile, sm:text-xs di desktop)
const CardMeta = ({ category, categorySlug, date }: { category?: string; categorySlug?: string; date: string }) => (
  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3 relative z-20">
    <Link href={categorySlug ? `/kategori/${categorySlug}` : "#"} className="text-orange-600 hover:underline">
      {category || "Uncategorized"}
    </Link>
    <span className="text-stone-300">•</span>
    <span className="text-stone-500 normal-case tracking-normal">
      {new Date(date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
    </span>
  </div>
);

export const FeaturedCard = ({ post }: { post: PostCard }) => {
  const excerpt = post.plainTextBody ? post.plainTextBody.substring(0, 50) + "..." : "";
  return (
    <div className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 relative">
      <Link href={`/${post.slug.current}`} className="block aspect-video relative bg-stone-50 overflow-hidden p-2 sm:p-4">
        {post.image ? <Image src={urlFor(post.image).url()} alt={post.title} fill className="object-contain group-hover:scale-105 transition-transform duration-500" /> : <div className="absolute inset-0 bg-stone-100" />}
      </Link>
      <div className="p-4 sm:p-6 md:p-8 flex flex-col items-start">
        <CardMeta category={post.category} categorySlug={post.categorySlug} date={post.publishedAt} />
        <Link href={`/${post.slug.current}`} className="block w-full">
          {/* Judul diperkecil di mobile */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-800 leading-tight mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors">{post.title}</h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{excerpt}</p>
        </Link>
      </div>
    </div>
  );
};

export const StandardCard = ({ post }: { post: PostCard }) => (
  <div className="group flex flex-col bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100 h-full">
    <Link href={`/${post.slug.current}`} className="block h-32 sm:h-40 relative bg-stone-50 overflow-hidden p-1.5 sm:p-2">
      {post.image && <Image src={urlFor(post.image).width(400).height(250).url()} alt={post.title} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />}
    </Link>
    <div className="p-3 sm:p-5 flex flex-col flex-grow">
      <CardMeta category={post.category} categorySlug={post.categorySlug} date={post.publishedAt} />
      <Link href={`/${post.slug.current}`} className="block flex-grow">
        <h3 className="text-sm sm:text-base font-bold text-stone-800 leading-snug group-hover:text-orange-600 transition-colors">{post.title}</h3>
      </Link>
    </div>
  </div>
);

export const ListCard = ({ post }: { post: PostCard }) => (
  <div className="group flex bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100 items-center p-1.5 sm:p-2 pr-3 sm:pr-4 gap-3 sm:gap-4">
    <Link href={`/${post.slug.current}`} className="block w-20 h-20 sm:w-28 sm:h-28 relative bg-stone-50 rounded-lg sm:rounded-xl overflow-hidden shrink-0 p-1">
      {post.image && <Image src={urlFor(post.image).width(200).height(200).url()} alt={post.title} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />}
    </Link>
    <div className="flex-1 py-1">
      <CardMeta category={post.category} categorySlug={post.categorySlug} date={post.publishedAt} />
      <Link href={`/${post.slug.current}`} className="block">
        <h3 className="text-xs sm:text-sm font-bold text-stone-800 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">{post.title}</h3>
      </Link>
    </div>
  </div>
);