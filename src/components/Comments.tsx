// src/components/Comments.tsx
"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold mb-6">Komentar</h3>
      <Giscus
        id="comments"
        repo="kuroxsub/my-blog" // Ganti dengan username/repo Anda
        repoId="R_kgDOR37ZKg" // Hasil dari giscus.app
        category="Announcements" // Sesuaikan dengan kategori di GitHub Discussions
        categoryId="DIC_kwDOR37ZKs4C532l" // Hasil dari giscus.app
        mapping="pathname" // Mengikat komentar berdasarkan URL slug artikel
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light" // Bisa diubah ke 'dark' atau 'preferred_color_scheme'
        lang="id"
        loading="lazy"
      />
    </div>
  );
}