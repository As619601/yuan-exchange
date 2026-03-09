'use client';
import React from 'react';
import Image from 'next/image';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import PromotionService from './components/home/PromotionService';
import OurServices from './components/home/OurServices';
import CombinedTrustSection from './components/home/CombinedTrustSection';
import Footer from './components/layout/Footer';
import PartnerSlider from './components/home/PartnerSlider';

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden relative scroll-smooth"> 
      <Navbar />
      
      <section className="relative w-full h-auto lg:h-screen min-h-fit">
        <Hero />
      </section>

      <div className="h-4 md:hidden bg-[#3366cc]" />

      <PromotionService />
      <OurServices />
      <CombinedTrustSection />
      <PartnerSlider />
      <Footer />

    {/* 📱 🚩 Sticky Contact Buttons (ฉบับชิดกริ๊บตามใจบอส โดยมากิจัง) */}
      <div className="fixed right-6 bottom-10 z-[100] flex flex-col -space-y-1 md:-space-y-2">
        
        {/* 💚 ปุ่ม Line - ใหญ่สะใจ p-0 */}
        <a 
          href="https://line.me/R/ti/p/@yuanexchange" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 transition-all duration-500 animate-float drop-shadow-2xl"
        >
          <div className="relative w-full h-full p-0 group-hover:scale-110 group-active:scale-95 transition-transform duration-300 ease-out"> 
            <Image 
              src="/icons/line.webp" 
              alt="Line Contact"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="absolute right-full mr-4 px-4 py-2 bg-[#06c755] text-white text-sm font-bold rounded-2xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl border border-white/20">
            คุยเรทเงินทาง Line
          </span>
        </a>

        {/* 📞 ปุ่มโทร - ชิดขึ้นมาเกยกันนิดๆ */}
        <a 
          href="tel:0839854714" 
          className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 transition-all duration-500 animate-float-delayed drop-shadow-2xl"
        >
          <div className="relative w-full h-full p-0 group-hover:scale-110 group-active:scale-95 transition-transform duration-300 ease-out animate-shake-periodic"> 
            <Image 
              src="/icons/phone.webp" 
              alt="Call Us"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="absolute right-full mr-4 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-2xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl border border-white/20">
            โทรหาเรา
          </span>
        </a>
      </div>

      {/* 🪄 Maki's Clean Animations */}
      <style jsx global>{`
        /* ลอยขึ้นลงนุ่มๆ เหมือนเดิมน่อ */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 4s infinite ease-in-out; }
        .animate-float-delayed { animation: float 4s infinite ease-in-out 1s; }

        /* สั่นกระดิ่งแบบโทรศัพท์ (สั่นเป็นพักๆ) ให้รู้ว่ากดได้น่อ */
        @keyframes shake {
          0%, 90%, 100% { transform: rotate(0); }
          92% { transform: rotate(10deg); }
          94% { transform: rotate(-10deg); }
          96% { transform: rotate(10deg); }
          98% { transform: rotate(-10deg); }
        }
        .animate-shake-periodic { animation: shake 5s infinite; }
      `}</style>

    </main>
  );
}