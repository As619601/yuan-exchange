'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react'; // เพิ่ม Menu และ X (กากบาท)
import Image from 'next/image';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // State สำหรับเปิด/ปิดเมนูมือถือ

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
          setIsOpen(false); // ปิดเมนูถ้ามีการเลื่อนลง
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'บริการของเรา', href: '/service' },
    { name: 'เช็คเรทเงิน', href: '/rates' },
    { name: 'เกี่ยวกับเรา', href: '/about' },
    { name: 'ติดต่อเรา', href: 'https://line.me/R/ti/p/@yuanexchange' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } bg-slate-700/80 backdrop-blur-xl border-b border-white/10 shadow-2xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Hamburger Button - แสดงเฉพาะมือถือ */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-brand-yellow p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center">
  <Image 
    src="/logo2.png"       
    alt="Yuan Exchange Logo"
    width={60}            
    height={60}           
    className="object-contain"
    priority              // ใส่ไว้เพื่อให้โลโก้โหลดขึ้นมาทันที (LCP)
  />
  {/* <span className="font-black text-x3 text-white">YUAN</span> */}
  <span className="font-black text-x3 text-brand-yellow">EXCHANGE</span>
</Link>

          {/* Menu Desktop (เหมือนเดิม) */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-300 hover:text-brand-yellow font-medium transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <a href="tel:0839854714" className="flex items-center gap-2 text-white hover:text-brand-yellow transition-colors font-semibold">
              <div className="bg-white/10 p-2.5 md:p-2 rounded-full border border-white/10">
                <Phone className="w-5 h-5 md:w-4 md:h-4 text-brand-yellow" />
              </div>
              <span className="hidden lg:inline text-sm">083 985 4714</span>
            </a>

            <Link href="https://line.me/R/ti/p/@yuanexchange" className="bg-[#06C755] text-white p-2.5 md:px-5 md:py-2.5 rounded-full md:rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-green-500/20 flex items-center gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" className="w-5 h-5 md:w-4 md:h-4" alt="line" />
              <span className="hidden md:inline">แอดไลน์</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel - ส่วนที่เพิ่มใหม่ */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-slate-900/95 border-b border-white/10 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)} // คลิกแล้วปิดเมนู
              className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-brand-yellow hover:bg-white/5 rounded-lg transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}