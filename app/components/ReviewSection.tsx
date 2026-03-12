'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules'; 
import { Star } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ReviewSection() {
  const reviewImages = Array.from({ length: 15 }, (_, i) => `/reviews/Review${i + 1}.jpg`);

  // 🚩 ลิงค์ต่างๆ ที่ปังให้มาน่อ
  const links = {
    line: "https://lin.ee/XiJIx4F",
    facebook: "https://www.facebook.com/share/1D3fHYY9EX/",
    tiktok: "https://www.tiktok.com/@yuan.exchange8?_r=1&_t=ZS-94b0HfQvcQs",
    phone: "tel:0839854714"
  };

  return (
    <section className="bg-[#4488ff] py-16 px-6 lg:hidden">
      <div className="max-w-md mx-auto text-center space-y-8">
        
        {/* 1. Header & Description */}
        <div className="text-white space-y-2">
          <h2 className="text-3xl font-black leading-tight">ความไว้วางใจจากลูกค้า<br />กว่า 10,000+ ราย</h2>
          <p className="text-white/80 text-sm font-medium">
            เรามุ่งมั่นให้บริการด้วยความโปร่งใสและซื่อสัตย์<br />จนได้รับความไว้วางใจจากนักธุรกิจและบุคคลทั่วไป
          </p>
        </div>

        {/* 2. 🏆 Rating Summary Badge */}
        <div className="bg-blue-600/50 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center gap-4 border border-white/10 mx-auto w-fit">
          <div className="flex -space-x-3">
            {[
              'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=150&h=150&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=150&h=150&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&h=150&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=150&h=150&auto=format&fit=crop'
            ].map((url, index) => (
              <div key={index} className="relative w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden bg-slate-400">
                <img src={url} alt="customer" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start border-l pl-4 border-white/20">
            <div className="flex items-center gap-1 text-yellow-400 text-xl font-black">
              <Star size={18} fill="currentColor" />
              <span className="text-white">4.9/5</span>
            </div>
            <span className="text-[10px] text-white/70 font-medium">จากรีวิวลูกค้าจริง</span>
          </div>
        </div>

        {/* 3. 📱 Swiper Slider */}
        <div className="bg-blue-300/40 rounded-[40px] p-6 pb-12 relative shadow-2xl">
          <div className="bg-white text-blue-600 px-6 py-2 rounded-full inline-block font-black text-sm mb-6 shadow-md">
            รีวิวจากลูกค้า
          </div>

          <Swiper
            modules={[Pagination, Navigation, Autoplay]} 
            spaceBetween={20}
            slidesPerView={1}
            loop={true} 
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className="rounded-3xl overflow-hidden"
          >
            {reviewImages.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-inner border-4 border-white aspect-[3/4] flex items-center justify-center">
                  <img src={src} alt={`Review ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ปุ่มกดซ้าย-ขวา */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <button className="swiper-button-prev-custom w-12 h-10 bg-white/20 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <button className="swiper-button-next-custom w-12 h-10 bg-white/20 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* 4. Contact Footer (🚩 มากิใส่ลิงค์ให้ครบแล้วน่อ) */}
        <div className="pt-8 space-y-4">
           <h3 className="text-white font-bold text-lg">ช่องทาง ติดต่อ</h3>
           <div className="flex justify-center gap-4">
              <SocialIcon color="bg-[#32D34C]" icon="/icons/line02.webp" link={links.line} />
              <SocialIcon color="bg-[#1877F2]" icon="/icons/facebook.webp" link={links.facebook} />
              <SocialIcon color="bg-black" icon="/icons/tiktok.webp" link={links.tiktok} />
              <SocialIcon color="bg-[#32D34C]" icon="/icons/phone02.webp" link={links.phone} />
           </div>
        </div>

      </div>
    </section>
  );
}

// 🚩 ฟังก์ชัน SocialIcon แบบใหม่ที่กดลิงค์ได้และรูปใหญ่ขึ้น
function SocialIcon({ color, icon, link }: { color: string, icon: string, link: string }) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform p[2]`}
    >
      <img src={icon} alt="social" className="w-full h-full object-contain" />
    </a>
  );
}