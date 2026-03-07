'use client';
import React from 'react';
import Image from 'next/image';

export default function TrustSection() {
  const lineLink = "https://line.me/R/ti/p/@yuanexchange";

  const reviews = [
    { id: 1, name: 'คุณมานิต', text: 'บริการเป็นมืออาชีพมากครับ มั่นใจทุกครั้งที่โอน เงินเข้าไวทันใจ เรท VIP คุ้มค่าที่สุด', rating: 5, avatar: '/images/reviews/manit.png' },
    { id: 2, name: 'แอดมินเพจ', text: 'แลกเงินหยวนที่นี่ได้เรทดีกว่าธนาคารเยอะเลยครับ พนักงานบริการดีและรวดเร็วมาก', rating: 5, avatar: '/images/reviews/admin.png' },
    { id: 3, name: 'คุณริน', text: 'ใช้บริการโอนเงินไปจีนที่นี่ประจำค่ะ สะดวกและรวดเร็วมาก ช่วยประหยัดไปได้เยอะเลย', rating: 5, avatar: '/images/reviews/rin.png' },
    { id: 4, name: 'คุณสมชาย', text: 'บริการดีเยี่ยมครับ รวดเร็ว ทันใจ มั่นใจได้ 100% แนะนำเลยครับสำหรับคนทำธุรกิจ', rating: 5, avatar: '/images/reviews/somchai.png' },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* 🟦 Blue Background Container */}
      <div className="bg-[#3b82f6] py-16 px-6 lg:py-24 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* 📱 ฝั่งซ้าย: Scan Line Card */}
        <div className="w-full max-w-[400px] flex flex-col items-center gap-6">
          <h2 className="text-white text-4xl md:text-5xl font-black italic tracking-tighter">
            รับเรทพิเศษ ที่นี่!
          </h2>
          <div className="w-full bg-white rounded-[40px] p-10 flex flex-col items-center shadow-xl">
            <p className="text-[#1a3a8a] text-2xl font-black mb-6 text-center">
              สแกน Line<br/>เพื่อสอบถามเพิ่มเติม
            </p>
            {/* 🚩 ลิงค์ไป LINE QR Code */}
            <a href={lineLink} target="_blank" rel="noopener noreferrer" className="relative w-64 h-64 bg-slate-100 rounded-3xl overflow-hidden cursor-pointer group flex items-center justify-center">
                {/* 💡 ถ้ายังไม่มีไฟล์ /images/qrcode.png มันจะขึ้น Alt text แทนให้ก่อนน่อ */}
                <Image 
                  src="/images/qrcode.png" 
                  alt="LINE QR Code" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform"
                  unoptimized // 💡 ใส่ไว้เผื่อไฟล์ภาพเป็น .png ที่มาจากภายนอกหรือมีปัญหาเรื่องการจัดการขนาด
                />
            </a>
          </div>
        </div>

        {/* ⭐️ ฝั่งขวา: Reviews & Stats */}
        <div className="w-full lg:max-w-4xl text-white">
          <div className="text-center lg:text-left mb-10">
            <h3 className="text-3xl md:text-5xl font-black mb-4">
              ความไว้วางใจจากลูกค้ากว่า 10,000+ ราย
            </h3>
            <p className="text-lg md:text-xl opacity-90 font-medium">
              เรามุ่งมั่นให้บริการด้วยความโปร่งใสและซื่อสัตย์ จนได้รับความไว้วางใจจากนักธุรกิจและบุคคลทั่วไปที่ทำธุรกรรมไทย-จีน
            </p>
          </div>

          {/* 🏆 Rating Badge */}
          <div className="flex justify-center lg:justify-start mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-4 border border-white/20">
              <div className="flex -space-x-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="relative w-10 h-10 rounded-full border-2 border-[#3b82f6] overflow-hidden bg-gray-400">
                    <Image 
                      src={rev.avatar} 
                      alt={rev.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">⭐ 4.9/5</span>
                <span className="text-xs opacity-70">จากรีวิวลูกค้าจริง</span>
              </div>
            </div>
          </div>

          {/* 💬 Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-3xl p-6 text-black shadow-lg flex flex-col gap-3">
                <div className="flex text-yellow-400 text-sm">
                  {Array(rev.rating).fill('⭐').join('')}
                </div>
                <p className="text-[13px] leading-relaxed text-gray-600 font-medium flex-grow">
                  "{rev.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="relative w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    <Image 
                      src={rev.avatar} 
                      alt={rev.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-xs truncate">{rev.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🏢 Partner Logos Bar */}
      <div className="bg-white py-8 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
          {/* 💡 มากิแนะนำให้ใช้ tag img ปกติสำหรับพวกโลโก้พาร์ทเนอร์ จะได้ไม่ต้องจัดการเรื่อง Width/Height ใน Next.js เยอะน่อ */}
          <img src="/images/logo-taobao.png" alt="Taobao" className="h-8 md:h-10 object-contain" />
          <img src="/images/logo-tmall.png" alt="Tmall" className="h-8 md:h-10 object-contain" />
          <img src="/images/logo-alipay.png" alt="Alipay" className="h-8 md:h-10 object-contain" />
          <img src="/images/logo-1688.png" alt="1688" className="h-8 md:h-10 object-contain" />
        </div>
      </div>
    </section>
  );
}