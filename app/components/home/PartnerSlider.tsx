'use client';
import React from 'react';

export default function PartnerSlider() {
  const partners = [
    { name: 'Taobao', src: '/images/Taobao.webp' },
    { name: 'Tmall', src: '/images/Tmall02.webp' },
    { name: 'Alipay', src: '/images/Alipay.webp' },
    { name: '1688', src: '/images/1688.webp' },
  ];

  // ไม่ต้องเบิ้ลเยอะน่อ เอาแค่ชุดเดียวพอ เดี๋ยวเราใช้ Marquee จัดการเอง
  return (
    <section className="py-12 bg-white overflow-hidden border-t border-gray-50 relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-black text-[#1a3a8a] tracking-tight">
          พาร์ทเนอร์ของเรา
        </h3>
        <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-3 rounded-full animate-pulse" />
      </div>

      {/* 🪄 Container หลัก */}
      <div className="flex overflow-hidden select-none group">
        
        {/* 🚩 เทคนิคคือใช้ gap คงที่ และใส่ animation ชุดเดียวกันทั้ง 2 div */}
        <div className="flex shrink-0 items-center gap-20 md:gap-32 animate-marquee py-4 pr-20 md:pr-32">
          {partners.map((partner, index) => (
            <img 
              key={`p1-${index}`}
              src={partner.src} 
              alt={partner.name} 
              className="h-20 md:h-16 w-auto object-contain transition-all duration-300 hover:scale-110 cursor-pointer"
            />
          ))}
        </div>

        {/* 🚩 ชุดที่ 2 สำหรับรอยต่อ: ต้องเหมือนชุดแรกเป๊ะๆ ทั้ง gap และ padding */}
        <div aria-hidden="true" className="flex shrink-0 items-center gap-20 md:gap-32 animate-marquee py-4 pr-20 md:pr-32">
          {partners.map((partner, index) => (
            <img 
              key={`p2-${index}`}
              src={partner.src} 
              alt={partner.name} 
              className="h-20 md:h-16 w-auto object-contain transition-all duration-300 hover:scale-110 cursor-pointer"
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        /* หยุดเมื่อเมาส์ชี้ที่ container */
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}