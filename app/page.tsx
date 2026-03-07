'use client';
import React from 'react';
import Image from 'next/image';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import PromotionService from './components/home/PromotionService';
import OurServices from './components/home/OurServices';
import CombinedTrustSection from './components/home/CombinedTrustSection';
import Footer from './components/layout/Footer';

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
      <Footer />

      {/* 📱 🚩 Sticky Contact Buttons (ฉบับอัปเกรดโมชั่นโดยมากิจัง) */}
      <div className="fixed right-6 bottom-10 z-[100] flex flex-col gap-6">
        
        {/* 💚 ปุ่ม Line - เพิ่ม class 'animate-float' และ 'hover-bounce' */}
        <a 
          href="https://line.me/R/ti/p/@yuanexchange" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 transition-all duration-500 animate-float drop-shadow-2xl"
        >
          {/* 🪄 วงแหวนกระจายตัว (Ripple Effect) */}
          <div className="absolute inset-0 rounded-full bg-[#06c755] opacity-20 animate-ping-slow" />
          
          <div className="relative w-full h-full p-2 group-hover:scale-110 group-active:scale-90 transition-transform duration-300 ease-out"> 
            <Image 
              src="/icons/line.webp" 
              alt="Line Contact"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <span className="absolute right-full mr-4 px-4 py-2 bg-[#06c755] text-white text-sm font-bold rounded-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl border border-white/20">
            คุยเรทเงินทาง Line
          </span>
        </a>

        {/* 📞 ปุ่มโทร - เพิ่ม class 'animate-shake' ทุกๆ 5 วินาที */}
        <a 
          href="tel:0839854714" 
          className="group relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 transition-all duration-500 animate-float-delayed drop-shadow-2xl"
        >
          {/* 🪄 วงแหวนกระจายตัว (Ripple Effect) */}
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping-slow-delayed" />

          <div className="relative w-full h-full p-3 group-hover:scale-110 group-active:scale-90 transition-transform duration-300 ease-out animate-shake-periodic"> 
            <Image 
              src="/icons/phone.webp" 
              alt="Call Us"
              fill
              className="object-contain"
              priority
            />
          </div>

          <span className="absolute right-full mr-4 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl border border-white/20">
            โทรหาเรา
          </span>
        </a>
      </div>

      {/* 🪄 Maki's Custom Animations */}
      <style jsx global>{`
        /* ลอยขึ้นลงนุ่มๆ */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 4s infinite ease-in-out; }
        .animate-float-delayed { animation: float 4s infinite ease-in-out 1s; }

        /* วงแหวนกระจาย (Ping) แบบช้าๆ พรีเมียม */
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-ping-slow { animation: ping-slow 2s infinite ease-out; }
        .animate-ping-slow-delayed { animation: ping-slow 2s infinite ease-out 1s; }

        /* สั่นกระดิ่งแบบโทรศัพท์ (สั่นเป็นพักๆ) */
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