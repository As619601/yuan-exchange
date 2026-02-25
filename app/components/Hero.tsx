'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ExchangeCard from './ExchangeCard';
import Link from 'next/link';

export default function Hero() {
  const images = [
    '/images/hero-bg.jpg',
    '/images/hero-bg-2.jpg', 
    '/images/hero-bg-3.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative min-h-[750px] flex items-center text-white pt-30 overflow-hidden">
      
      {/* --- LAYER 1: Background Images (ล่างสุด) --- */}
      <div className="absolute inset-0 -z-20"> {/* แก้เป็น -z-20 เพื่อให้ลึกกว่า Overlay */}
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`Background ${index}`}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* --- LAYER 2: Overlay (ทับรูปภาพ) --- */}
      {/* แก้เป็น -z-10 และปรับความมืดเพื่อให้ตัวหนังสือเด่น */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-slate-900/80 to-slate-900/40 -z-10" />

      {/* --- LAYER 3: Content (บนสุด) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* ฝั่งซ้าย: ข้อความพาดหัว */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <div className="inline-block bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-md mb-6 animate-fade-in">
              <span className="text-brand-yellow mr-2">●</span> บัญชีจีนปลอดภัย ให้บริการกว่า 10 ปี
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              ทำธุรกิจกับจีน จ่ายเงิน <br/>
              <span className="text-brand-yellow">ให้เราดูแล จบทุกปัญหา!</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl font-light">
              บริการโอนเงินไปจีน ฝากจ่ายสินค้า 1688, Taobao, Tmall เรทถูกที่สุด 
              แจ้งยอดไว ได้รับเงินจริง ปลอดภัยทุกรายการ
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
  {/* ปุ่มหลัก: เช็คเรทวันนี้ */}
  <Link 
    href="https://line.me/R/ti/p/@yuanexchange"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-brand-yellow text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105 shadow-xl inline-block"
  >
    เช็คเรทวันนี้
  </Link>

  {/* ปุ่มรอง: ดูบริการทั้งหมด (ถ้าปังจะทำหน้า About ก็เปลี่ยนลิงก์มาที่นี่ได้น่อ) */}
  <Link 
    href="/about" 
    className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition inline-block text-center"
  >
    ดูบริการทั้งหมด
  </Link>
</div>
          </div>

          {/* ฝั่งขวา: เครื่องคิดเลข */}
          <div className="w-full lg:w-2/5">
             <ExchangeCard />
          </div>

        </div>
      </div>
    </section>
  );
}