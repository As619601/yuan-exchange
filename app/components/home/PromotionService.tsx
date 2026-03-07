'use client';
import React from 'react';
import Image from 'next/image';

export default function PromotionService() {
  const lineLink = "https://line.me/R/ti/p/@yuanexchange"; // 🚩 ตัวแปรลิงค์หลัก

  const services = [
    { name: 'เช็คเรทเงิน', icon: '/icons/calc.webp' },
    { name: 'โอนเงินไปจีน', icon: '/icons/transfer.webp' },
    { name: 'จ่ายค่าสินค้า', icon: '/icons/payment.webp' },
    { name: 'ปรึกษา', icon: '/icons/consult.webp' },
    { name: 'Alipay', icon: '/icons/alipay.webp' },
    { name: 'สำหรับธุรกิจ', icon: '/icons/business.webp' },
    { name: 'พูดคุยกับเรา', icon: '/icons/chat.webp' },
  ];

  return (
    <section className="relative bg-[#f0f2f5] py-20 md:py-40 px-0 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-end">
        
        {/* 🟦 ฝั่งซ้าย: การ์ดโปรโมชัน (กว้าง 85% ตามที่ปังตั้งไว้) */}
        <div className="w-full lg:w-[85%] lg:h-[85%] relative z-10 bg-white rounded-[40px] md:rounded-[60px] shadow-2xl overflow-hidden  lg:-mr-32">
          {/* 💡 มากิเพิ่ม -mr-32 เพื่อให้ขอบขวาของการ์ดยื่นไปข้างหลังน้องมากขึ้น หน้าต่างจะได้ดูกว้างเต็มตา */}
          
          {/* ส่วนบน: Blue Gradient Banner */}
          <div className="bg-gradient-to-r from-[#1c4caa] via-[#3b82f6] to-[#2b64d9] py-10 md:py-16 px-6 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
              ลูกค้าใหม่ ฟรีค่าธรรมเนียม ครั้งแรก!
            </h2>
            <p className="text-lg md:text-2xl font-bold opacity-90">
              ได้รับเงินทันใจ ปลอดภัย รับประกันทุกยอด
            </p>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === 1 ? 'bg-white w-8' : 'bg-white/30 w-2'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* ส่วนล่าง: Service Icons Grid */}
          <div className="bg-white py-10 md:py-14 px-4 md:px-12">
            <div className="grid grid-cols-4 md:grid-cols-7 gap-4 md:gap-8 justify-items-center">
              {services.map((item, index) => (
                /* 🚩 ครอบด้วย Tag <a> ทุกไอคอน เพื่อให้จิ้มแล้วไป LINE */
                <a 
                  key={index} 
                  href={lineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group cursor-pointer transition-transform hover:-translate-y-2"
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full border border-slate-100 shadow-sm flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-md transition-all overflow-hidden">
                    <img 
                      src={item.icon} 
                      alt={item.name} 
                      className="w-8 h-8 md:w-12 md:h-12 object-contain"
                    />
                  </div>
                  <span className="text-[10px] md:text-xs font-black text-[#1a3a8a] text-center leading-tight">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* 👩‍💼 พรีเซนเตอร์: แสดงเฉพาะจอคอม (Desktop Only) */}
<div className="hidden lg:block absolute right-[-149px] bottom-[-50px] z-5 pointer-events-none">
  <div className="relative w-[800px] h-[900px]"> 
    <Image 
      src="/images/presenter02.png" 
      alt="Presenter Desktop"
      fill
      className="object-contain object-bottom drop-shadow-2xl"
      priority
    />
  </div>
</div>

      </div>
    </section>
  );
}