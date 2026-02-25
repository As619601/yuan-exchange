'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // เลื่อนลง = ซ่อน
          setIsVisible(false);
        } else { // เลื่อนขึ้น = โชว์
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);
  return (
    <nav className={`fixed w-full z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          

          {/* Logo - ย่อขนาดเล็กน้อยในมือถือเพื่อไม่ให้เบียดปุ่ม */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl md:text-2xl font-black text-white tracking-tighter">YUAN</span>
            <span className="text-xl md:text-2xl font-black text-brand-yellow ml-1 tracking-tighter">EXCHANGE</span>
          </div>

          {/* Menu - ซ่อนในมือถือ (Desktop Only) */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-brand-yellow font-medium transition-colors">หน้าแรก</Link>
            <Link href="#services" className="text-gray-300 hover:text-brand-yellow font-medium transition-colors">บริการของเรา</Link>
            <Link href="#rates" className="text-gray-300 hover:text-brand-yellow font-medium transition-colors">เช็คเรทเงิน</Link>
            <Link href="#contact" className="text-gray-300 hover:text-brand-yellow font-medium transition-colors">ติดต่อเรา</Link>
          </div>

          {/* Contact Actions - ปรับแต่งเพื่อมือถือ */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* ปุ่มโทรศัพท์ */}
            <a 
              href="tel:0839854714"
              className="flex items-center gap-2 text-white hover:text-brand-yellow transition-colors font-semibold"
            >
              <div className="bg-white/10 p-2.5 md:p-2 rounded-full border border-white/10">
                <Phone className="w-5 h-5 md:w-4 md:h-4 text-brand-yellow" />
              </div>
              {/* ซ่อนเบอร์โทรในมือถือ แสดงตั้งแต่หน้าจอ lg เป็นต้นไป */}
              <span className="hidden lg:inline text-sm">083-985-4714</span>
            </a>

            {/* ปุ่ม LINE */}
            <Link
              href="https://line.me/R/ti/p/@yuanexchange"
              className="bg-[#06C755] text-white p-2.5 md:px-5 md:py-2.5 rounded-full md:rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" 
                className="w-5 h-5 md:w-4 md:h-4" 
                alt="line" 
              />
              {/* ซ่อนคำว่า "แอดไลน์" ในมือถือ แสดงเฉพาะหน้าจอ md ขึ้นไป */}
              <span className="hidden md:inline">แอดไลน์</span>
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}