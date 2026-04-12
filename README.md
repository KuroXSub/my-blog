# My Blog -  (Development)

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/kuroxsub/my-blog?style=for-the-badge)](https://github.com/kuroxsub/my-blog/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kuroxsub/my-blog?style=for-the-badge)](https://github.com/kuroxsub/my-blog/network)
[![GitHub issues](https://img.shields.io/github/issues/kuroxsub/my-blog?style=for-the-badge)](https://github.com/kuroxsub/my-blog/issues)

</div>

Platform blog modern yang ringan, aman, dan dioptimasi penuh untuk SEO. Dibangun dengan Next.js App Router, menggunakan Sanity.io sebagai Headless CMS untuk penulisan artikel, dan dilengkapi dengan sistem komentar interaktif via Giscus yang terintegrasi dengan GitHub Discussions.

## Fitur Utama
- **Performa & Rendering Cepat:** Menggunakan Incremental Static Regeneration (ISR) dengan revalidasi tiap 30 detik untuk memastikan konten selalu segar tanpa mengorbankan kecepatan.
- **Headless CMS Terintegrasi:** Manajemen konten yang fleksibel menggunakan Sanity.io dengan format Portable Text.
- **Sistem Komentar Aman:** Menggunakan Giscus (berbasis GitHub Discussions) yang ringan dan otomatis menyaring spam.
- **Optimasi SEO Maksimal:** Injeksi dynamic metadata dan OpenGraph tags otomatis pada setiap halaman artikel.
- **Keamanan Berlapis:** Dilengkapi HTTP Security Headers (CSP, X-Frame-Options, X-Content-Type-Options) untuk mencegah XSS dan Clickjacking.
- **Modern Styling:** Menggunakan Tailwind CSS v4 beserta plugin Typography untuk tampilan bacaan yang rapi dan responsif.

## Tech Stack
- **Framework:** Next.js 16 (React 19, TypeScript)
- **Styling:** Tailwind CSS v4, PostCSS, `@tailwindcss/typography`
- **CMS / Data:** Sanity.io (`next-sanity`), `@portabletext/react`
- **Komentar:** Giscus (`@giscus/react`)
- **Deployment (Rekomendasi):** Vercel / Cloudflare Pages / Netlify

## Instalasi

### Prasyarat
- Node.js versi 18 atau lebih baru.
- Akun Sanity.io beserta Project ID.
- Repositori GitHub publik dengan fitur Discussions diaktifkan (untuk Giscus).

### Panduan Instalasi
1. Clone repositori ini ke mesin lokal Anda:
	```bash
	git clone https://github.com/kuroxsub/my-blog.git
	cd my-blog
	```

2. Instal seluruh dependensi:
	```bash
	npm install
	```

3. Buat file `.env.local` di root direktori dan masukkan kredensial Sanity Anda:
	```env
	NEXT_PUBLIC_SANITY_PROJECT_ID="project_id_anda"
	NEXT_PUBLIC_SANITY_DATASET="production"
	```

4. Jalankan development server:
	```bash
	npm run dev
	```
	Buka `http://localhost:3000` di browser untuk melihat hasilnya.

## Struktur Direktori
```text
my-blog/
├── src/
│   ├── app/                
│   │   ├── [slug]/          # Rute dinamis untuk halaman detail artikel
│   │   ├── globals.css      # Konfigurasi Tailwind CSS v4 & Plugin
│   │   ├── layout.tsx       # Root layout & injeksi Metadata dasar
│   │   └── page.tsx         # Halaman utama (daftar artikel)
│   ├── components/         
│   │   └── Comments.tsx     # Komponen Client untuk Giscus
│   └── sanity/              # Konfigurasi klien Sanity
│       └── client.ts        # Setup fungsi fetch (Next.js client)
├── public/                  # Aset statis (gambar, favicon)
├── .env.local               # Environment variables (Ignored in Git)
├── next.config.ts           # Konfigurasi Next.js, Security Headers & Remote Images
├── eslint.config.mjs        # Konfigurasi Linter
├── postcss.config.mjs       # Konfigurasi PostCSS untuk Tailwind v4
└── README.md

## 👨‍💻 Pengembang
Dikembangkan oleh Qurrota sebagai bagian dari ekosistem KuroSapa Labs.

Website Pengembang: [kuroxsub.my.id](https://kuroxsub.my.id)

GitHub: [@KuroXSub](https://github.com/KuroXSub)