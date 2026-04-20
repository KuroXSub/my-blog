// src/app/[slug]/page.tsx
import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Comments from "@/components/Comments";
import ImagePreview from "@/components/ui/ImagePreview";
import type { Metadata } from "next";

// Menambahkan field yang dibutuhkan di query
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id, title, slug, publishedAt, image, body, tags,
  "category": category->title,
  "categorySlug": category->slug.current
}`;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug });
  if (!post) return { title: "Not Found" };
  const postImageUrl = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined;
  return {
    title: post.title,
    openGraph: { title: post.title, images: postImageUrl ? [postImageUrl] : [] },
  };
}

// Konfigurasi Kustom untuk PortableText (Agar styling Rich Text Sanity lebih presisi jika diperlukan)
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8 relative w-full aspect-video bg-stone-100 rounded-xl overflow-hidden">
        <Image src={urlFor(value).url()} alt={value.alt || ' ' } fill className="object-contain" />
      </div>
    ),
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);
  
  if (!post) {
    return <div className="text-center py-20 text-2xl font-bold">Artikel tidak ditemukan</div>;
  }

  const postImageUrl = post.image ? urlFor(post.image).url() : null;

  return (
    <article className="max-w-3xl mx-auto flex flex-col pt-4 sm:pt-10">
      
      {/* 1. Tombol Kembali */}
      <div className="mb-4 sm:mb-8">
        <Link href="/" className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-stone-500 hover:text-orange-600 transition-colors">
          <span>&larr;</span> Kembali
        </Link>
      </div>

      {/* 2. Metadata (Kategori & Tanggal) */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
        {post.category && (
          <Link href={`/kategori/${post.categorySlug}`} className="text-orange-600 hover:underline uppercase tracking-wider">
            {post.category}
          </Link>
        )}
        <span className="text-stone-300">•</span>
        <span className="text-stone-500">
          {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>

      {/* 3. Judul Artikel */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-stone-800 leading-[1.3] tracking-tight mb-4 sm:mb-6">
        {post.title}
      </h1>

      {/* 4. Gambar Utama */}
      {postImageUrl && (
        <div className="my-2 sm:my-4">
          <ImagePreview src={postImageUrl} alt={post.title} />
        </div>
      )}

      {/* 5. Konten Artikel (Body) - prose-sm di layar kecil, prose-lg di layar besar */}
      <div className="prose prose-sm sm:prose-lg prose-stone max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-xl prose-code:text-orange-600 prose-code:bg-orange-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-img:rounded-xl">
        {Array.isArray(post.body) && <PortableText value={post.body} components={portableTextComponents} />}
      </div>

      {/* 6. Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-stone-200">
          <h3 className="text-xs sm:text-sm font-bold text-stone-500 uppercase tracking-wider mb-3 sm:mb-4">Tag Terkait:</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag} className="bg-stone-100/80 border border-stone-200 text-stone-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm hover:border-orange-300 hover:text-orange-600 transition-colors cursor-pointer">
                # {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 7. Sistem Komentar */}
      <div className="mt-10 sm:mt-16">
        <Comments />
      </div>

    </article>
  );
}