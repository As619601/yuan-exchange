'use client';
import React from 'react';

export default function PartnerSlider() {
  const partners = [
    { name: 'Taobao', src: '/images/Taobao.webp' },
    { name: 'Tmall', src: '/images/Tmall02.webp' },
    { name: 'Alipay', src: '/images/Alipay.webp' },
    { name: '1688', src: '/images/1688.webp' },
  ];

  // เบิ้ลอาเรย์เพื่อให้สไลด์ไหลต่อเนื่องไม่สะดุดน่อ
  const displayPartners = [...partners, ...partners];

  return (
    <section className="py-5 bg-white overflow-hidden border-t border-gray-50 relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
          พาร์ทเนอร์ของเรา
        </h3>
        <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-3 rounded-full animate-pulse" />
      </div>

      {/* 🪄 Container หลักสำหรับสไลด์ (ซ่อม CSS กาวให้ไหลต่อเนื่อง) */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        
        {/* 🪄 ชุดที่หนึ่ง: วิ่งไหลไปเรื่อยๆ */}
        <div className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-marquee py-4">
          {displayPartners.map((partner, index) => (
            <div 
              key={`p1-${index}`} 
              className="mx-10 md:mx-20 flex items-center justify-center shrink-0"
            >
              <img 
                src={`${partner.src}?v=${Date.now()}`} // 🚩 เติม ?v=Time เพื่อล้างแคชรูปภาพน่อปัง
                alt={partner.name} 
                /* 🚩 โชว์สีปกติ (ลบ grayscale/opacity ออก), ขยายใหญ่ขึ้นตามใจบอส */
                className="h-12 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* 🪄 ชุดที่สอง: วิ่งต่อท้ายลูป */}
        <div className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-marquee py-4" aria-hidden="true">
          {displayPartners.map((partner, index) => (
            <div 
              key={`p2-${index}`} 
              className="mx-10 md:mx-20 flex items-center justify-center shrink-0"
            >
              <img 
                src={`${partner.src}?v=${Date.now()}`} // 🚩 เติม ?v=Time เพื่อล้างแคชรูปภาพน่อปัง
                alt={partner.name} 
                className="h-12 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🪄 Maki's Magic CSS (ฉบับล้างแคช กาวให้ไหลต่อเนื่อง) */}
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite; /* 💡 ปรับเวลาความเร็วตรงนี้ได้น่อน่อ */
        }
      `}</style>
    </section>
  );
}