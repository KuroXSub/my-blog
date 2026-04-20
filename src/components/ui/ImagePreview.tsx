"use client";

import { useState } from "react";
import Image from "next/image";

interface ImagePreviewProps {
  src: string;
  alt: string;
}

export default function ImagePreview({ src, alt }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Gambar Utama di Artikel */}
      <div 
        className="relative w-full aspect-video bg-stone-100 rounded-2xl overflow-hidden cursor-zoom-in group my-8"
        onClick={() => setIsOpen(true)}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-contain transition-transform duration-500 group-hover:scale-[1.02]" 
          priority
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>

      {/* Modal / Lightbox (Muncul saat di-klik) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-0 sm:p-8 cursor-zoom-out"
          onClick={() => setIsOpen(false)}
        >
          {/* Tombol X (Tutup) - Fix Posisi & Area Klik */}
          <button 
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 sm:p-3 transition-all cursor-pointer shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); 
              setIsOpen(false);
            }}
            title="Tutup Preview"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Gambar Ukuran Penuh */}
          <div className="relative w-full h-[100svh] sm:h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={src} 
              alt={alt} 
              fill 
              className="object-contain" 
            />
          </div>
        </div>
      )}
    </>
  );
}