'use client';
import React from 'react';

export default function PartnerSlider() {
  const partners = [
    { name: 'Taobao', src: '/images/Taobao.webp' },
    { name: 'Tmall', src: '/images/Tmall02.webp' },
    { name: 'Alipay', src: '/images/Alipay.webp' },
    { name: '1688', src: '/images/1688.webp' },
  ];

  // เบิ้ลอาเรย์ 3 ชุดเพื่อให้สไลด์ไหลยาวๆ เนียนกริ๊บ ไม่กระตุกน่อ
  const displayPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-12 bg-white overflow-hidden border-t border-gray-50 relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-black text-[#1a3a8a] tracking-tight">
          พาร์ทเนอร์ของเรา
        </h3>
        {/* เส้นใต้สวยๆ ที่ปังชอบ */}
        <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-3 rounded-full animate-pulse" />
      </div>

      {/* 🪄 สไลด์แบบไร้รอยต่อ (Infinite Marquee) */}
      <div className="flex overflow-hidden select-none [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        
        {/* Group 1: วิ่งหลัก */}
        <div className="flex shrink-0 items-center justify-around gap-20 min-w-full animate-marquee py-4">
          {displayPartners.map((partner, index) => (
            <img 
              key={`p1-${index}`}
              src={partner.src} // 🚩 คลีนแล้วน่อ ไม่มี Date.now() มาหลอน
              alt={partner.name} 
              className="h-12 md:h-16 w-auto object-contain transition-all duration-300 hover:scale-110 cursor-pointer"
            />
          ))}
        </div>

        {/* Group 2: ตัวเชื่อมลูป (ซ่อนจาก Screen Reader เพื่อความถูกต้อง) */}
        <div aria-hidden="true" className="flex shrink-0 items-center justify-around gap-20 min-w-full animate-marquee py-4">
          {displayPartners.map((partner, index) => (
            <img 
              key={`p2-${index}`}
              src={partner.src} 
              alt={partner.name} 
              className="h-12 md:h-16 w-auto object-contain transition-all duration-300 hover:scale-110 cursor-pointer"
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
          animation: marquee 30s linear infinite; /* 💡 ปรับเลข 30s ให้เร็วหรือช้าได้ตามใจปังน่อ */
        }
        /* หยุดสไลด์เมื่อเมาส์ชี้ เพื่อให้เจ้านายดูโลโก้ถนัดๆ */
        .flex:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}