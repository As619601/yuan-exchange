'use client';
import React from 'react';
import Image from 'next/image';

export default function OurServices() {
  const lineLink = "https://line.me/R/ti/p/@yuanexchange"; // 🚩 ลิงค์ไลน์เจ้าเก่าเจ้าเดิมน่อ

  const serviceCards = [
    { id: 2, image: '/images/service-2.jpg', title: 'รีวิวจากลูกค้า' },
    { id: 3, image: '/images/service-3.jpg', title: 'กำไรดีเพราะเรทถูก' },
    { id: 1, image: '/images/service-1.jpg', title: 'รีวิวบริการ' },     
    { id: 4, image: '/images/service-4.jpg', title: 'รีวิวโอนเงิน' },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* 🏷️ Header Section */}
        <div className="mb-16">
          <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">Our Services</p>
          <h2 className="text-3xl md:text-5xl font-black text-[#1a3a8a] mb-6">
            บริการทางการเงิน ครบวงจร ไทย-จีน
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-medium">
            เรามีบริการที่หลากหลายเพื่อรองรับทุกความต้องการในการทำธุรกรรมระหว่างประเทศไทยและประเทศจีน
          </p>
        </div>

        {/* 🃏 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceCards.map((card) => (
            /* 🚩 มากิเปลี่ยน div เป็น Tag <a> เพื่อให้คลิกได้ทั้งการ์ดเลยน่อปัง */
            <a 
              key={card.id} 
              href={lineLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-[40px] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group block cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* 💡 มากิแถม Overlay จางๆ ตอน Hover  */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>

              {/* Footer / Button Area */}
              <div className="p-8 flex flex-col items-center gap-4">
                <span className="text-[#1a3a8a] font-bold text-lg">{card.title}</span>
                <div className="w-20 h-8 bg-[#4b7deb] group-hover:bg-[#00d632] rounded-full transition-colors flex items-center justify-center">
                  <div className="w-8 h-1 bg-white/50 rounded-full" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}