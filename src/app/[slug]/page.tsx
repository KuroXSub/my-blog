import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import Comments from "@/components/Comments";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Fetch data khusus untuk metadata (Next.js akan me-memoise request ini)
  const post = await client.fetch<SanityDocument>(POST_QUERY, { slug });

  if (!post) return { title: "Post Not Found" };

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    // Jika nanti Anda menambahkan field 'excerpt' di schema Sanity, ganti menjadi post.excerpt
    description: `Baca selengkapnya tentang ${post.title} di blog ini.`,
    openGraph: {
      title: post.title,
      images: postImageUrl ? [postImageUrl] : [],
    },
  };
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>

      <Comments />
      
    </main>
  );
}