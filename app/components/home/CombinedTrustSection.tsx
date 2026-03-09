'use client';
import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export default function TrustSection() {
  const quickReviews = [
    { 
      id: 1, 
      name: 'คุณมานิต', 
      text: 'บริการเป็นมืออาชีพมากครับ มั่นใจทุกครั้งที่โอน เงินเข้าไวทันใจ เรท VIP คุ้มค่าที่สุด', 
      rating: 5, 
      avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=150&h=150&auto=format&fit=crop' 
    },
    { 
      id: 2, 
      name: 'แอดมินเพจ', 
      text: 'แลกเงินหยวนที่นี่ได้เรทดีกว่าธนาคารเยอะเลยครับ พนักงานบริการดีและรวดเร็วมาก', 
      rating: 5, 
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      name: 'คุณริน', 
      text: 'ใช้บริการโอนเงินไปจีนที่นี่ประจำค่ะ สะดวกและรวดเร็วมาก ช่วยประหยัดไปได้เยอะเลย', 
      rating: 5, 
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&h=150&auto=format&fit=crop' 
    },
    { 
      id: 4, 
      name: 'คุณสมชาย', 
      text: 'บริการดีเยี่ยมครับ รวดเร็ว ทันใจ มั่นใจได้ 100% แนะนำเลยครับสำหรับคนทำธุรกิจ', 
      rating: 5, 
      avatar: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=150&h=150&auto=format&fit=crop' 
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="bg-[#1266ec] py-16 px-6 lg:py-24 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* 📱 ฝั่งซ้าย: QR Card */}
        <div className="w-full max-w-[400px] flex flex-col items-center gap-6">
          <h2 className="text-white text-4xl md:text-5xl font-black italic tracking-tighter text-center">
            รับเรทพิเศษ ที่นี่ !
          </h2>
          <div className="w-full bg-white rounded-[40px] p-10 flex flex-col items-center shadow-2xl">
            <p className="text-[#1a3a8a] text-2xl font-black mb-6 text-center leading-tight">
              สแกน Line<br/>เพื่อสอบถามเพิ่มเติม
            </p>
            <div className="relative w-full aspect-square bg-[#f8fafc] rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center p-4">
              <Image 
                src="/images/line-qr.png" 
                alt="Line QR"
                fill 
                className="object-contain p-2" 
                unoptimized 
              />
            </div>
          </div>
        </div>

        {/* ⭐️ ฝั่งขวา: Content & Reviews */}
        <div className="w-full lg:max-w-4xl text-white">
          <div className="text-center lg:text-left mb-10">
            <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              ความไว้วางใจจากลูกค้ากว่า 10,000+ ราย
            </h3>
            <p className="text-lg md:text-xl opacity-90 font-medium">
              เรามุ่งมั่นให้บริการด้วยความโปร่งใสและซื่อสัตย์ จนได้รับความไว้วางใจจากนักธุรกิจและบุคคลทั่วไป
            </p>
          </div>

          {/* 🏆 Rating Summary */}
          <div className="flex justify-center lg:justify-start mb-10">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-4 border border-white/20">
              <div className="flex -space-x-3">
                {quickReviews.map((rev) => (
                  <div key={rev.id} className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-400">
                    <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col border-l pl-4 border-white/20">
                <div className="flex items-center gap-1 text-2xl font-bold">
                  <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  4.9/5
                </div>
                <span className="text-xs opacity-70">จากรีวิวลูกค้าจริง</span>
              </div>
            </div>
          </div>

          {/* 💬 Review Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickReviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-[32px] p-6 text-black shadow-lg flex flex-col min-h-[140px] hover:-translate-y-1 transition-transform">
                <div className="flex text-yellow-400 text-sm mb-2">
                  {"★".repeat(rev.rating)}
                </div>
                <p className="text-[13px] leading-relaxed text-gray-600 font-medium flex-grow">
                  `{rev.text}`
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-[#1a3a8a] text-xs">{rev.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </section>
  );
}