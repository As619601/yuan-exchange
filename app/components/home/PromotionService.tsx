'use client';
import React from 'react';
import Image from 'next/image';

export default function PromotionService() {
  const lineLink = "https://line.me/R/ti/p/@yuanexchange"; 

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
        
        {/* 🟦 ฝั่งซ้าย: การ์ดโปรโมชัน */}
        <div className="w-full lg:w-[85%] lg:h-[85%] relative z-10 bg-white rounded-[40px] md:rounded-[60px] shadow-2xl overflow-hidden lg:-mr-32">
          
          {/* ส่วนบน: Blue Gradient Banner */}
          <div className="bg-gradient-to-r from-[#1c4caa] via-[#3b82f6] to-[#2b64d9] py-10 md:py-16 px-6 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
              ลูกค้าใหม่ ฟรีค่าธรรมเนียม ครั้งแรก!
            </h2>
            <p className="text-lg md:text-2xl font-bold opacity-90">
              ได้รับเงินทันใจ ปลอดภัย รับประกันทุกยอด
            </p>
            
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

          {/* ส่วนล่าง: Service Icons Grid (🚩 ปรับขนาดไอคอนตรงนี้เลยน่อ) */}
          <div className="bg-white py-12 md:py-20 px-4 md:px-12">
            <div className="grid grid-cols-4 md:grid-cols-7 gap-6 md:gap-10 justify-items-center">
              {services.map((item, index) => (
                <a 
                  key={index} 
                  href={lineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-4 group cursor-pointer transition-all hover:-translate-y-3"
                >
                  {/* 🚩 มากิขยายขนาดที่นี่น่อ: จอคอมปรับเป็น w-28 h-28 */}
                  <div className="w-18 h-18 md:w-28 md:h-28 bg-white rounded-full border border-slate-100 shadow-sm flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-xl group-hover:rotate-3 transition-all duration-300 overflow-hidden">
                    <img 
                      src={item.icon} 
                      alt={item.name} 
                      /* 🚩 รูปข้างในก็ใหญ่ขึ้นตามน่อ */
                      className="w-15 h-15 md:w-20 md:h-20 object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[11px] md:text-sm font-black text-[#1a3a8a] text-center leading-tight group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 👩‍💼 พรีเซนเตอร์ */}
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