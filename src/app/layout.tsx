// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { template: "%s | My Blog", default: "My Blog - Tech & Security" },
  description: "Platform dokumentasi dan catatan pengembangan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-[#fdfbf7] text-stone-800 antialiased min-h-screen flex flex-col">
        <Header />
        {/* max-w-4xl diubah menjadi max-w-6xl (sekitar 1152px) */}
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}