import Image from "next/image";

export const metadata = {
  title: "Tentang Kami",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto pt-4 sm:pt-10 pb-12 sm:pb-20">
      
      {/* Header Section */}
      <div className="text-center space-y-4 sm:space-y-6 mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-800 tracking-tight">
          Tentang <span className="text-orange-600">KuroSapa</span>
        </h1>
        <p className="text-sm sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed px-4">
          KuroSapa adalah ruang eksplorasi teknis dan dokumentasi digital. Tempat di mana ide seputar pengembangan web, keamanan siber, dan desain dirangkai menjadi artikel yang mudah dipahami.
        </p>
      </div>

      {/* Grid Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center bg-white p-6 sm:p-8 md:p-12 rounded-3xl border border-stone-100 shadow-sm">
        
        {/* Placeholder untuk Gambar Profil / Ilustrasi */}
        <div className="aspect-square relative bg-stone-100 rounded-2xl overflow-hidden order-2 md:order-1 border border-stone-200/50">
          <div className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl">
            💻
          </div>
        </div>

        {/* Konten Teks */}
        <div className="space-y-4 sm:space-y-6 order-1 md:order-2">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-800">Misi Kami</h2>
          <p className="text-xs sm:text-base text-stone-600 leading-relaxed">
            Dalam dunia teknologi yang bergerak sangat cepat, dokumentasi adalah kunci. KuroSapa dibangun sebagai "Second Brain" untuk mencatat proses belajar, men-debug masalah teknis, dan berbagi wawasan terkait arsitektur perangkat lunak yang aman.
          </p>
          
          <h2 className="text-xl sm:text-2xl font-bold text-stone-800 pt-2 sm:pt-4">Fokus Utama</h2>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-base text-stone-600">
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-orange-500 font-bold">✓</span>
              <span><strong>Web Development:</strong> Arsitektur modern dengan Next.js, React, dan Jamstack.</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-orange-500 font-bold">✓</span>
              <span><strong>Cyber Security:</strong> Vulnerability assessment, OWASP, dan keamanan aplikasi web.</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-orange-500 font-bold">✓</span>
              <span><strong>UI/UX Design:</strong> Antarmuka yang bersih, fungsional, dan estetis.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Kontak / Call to Action */}
      <div className="mt-10 sm:mt-16 text-center bg-orange-50 border border-orange-100 rounded-3xl p-6 sm:p-10">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-800 mb-2 sm:mb-4">Mari Berkolaborasi</h2>
        <p className="text-xs sm:text-base text-stone-600 mb-6 max-w-xl mx-auto">
          Tertarik untuk berdiskusi lebih lanjut mengenai proyek web, audit keamanan, atau sekadar bertukar pikiran?
        </p>
        <a 
          href="https://github.com/KuroXSub" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-orange-600 text-white text-sm sm:text-base font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-orange-700 hover:shadow-lg transition-all hover:-translate-y-1"
        >
          Kunjungi GitHub Saya
        </a>
      </div>

    </div>
  );
}