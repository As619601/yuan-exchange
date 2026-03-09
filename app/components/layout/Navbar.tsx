'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const lineLink = "https://line.me/R/ti/p/@yuanexchange"; // 🚩 มากิรวมลิงค์ไว้ที่เดียวให้แก้พอง่ายๆ น่อ
  const facebookLink = "https://www.facebook.com/share/1D3fHYY9EX/"; // 🚩 มากิรวมลิงค์ไว้ที่เดียวให้แก้พอง่ายๆ น่อ

  const navLinks = [
    { name: 'หน้าแรก', href: '#' },
    { name: 'บริการ', href: '#' },
    { name: 'โปรโมชั่น', href: facebookLink },
    { name: 'รีวิว', href: facebookLink },
    { name: 'ติดต่อเรา', href: lineLink },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-[#0047ff] py-4 shadow-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* 🎡 Logo Section: จิ้มแล้วไป www.เงินหยวน.com น่อ */}
        <a 
          href="#" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-3 group cursor-pointer transition-opacity hover:opacity-80"
        >
          <div className="relative w-[180px] h-10 overflow-hidden flex items-center justify-center">
            <Image 
              src="/images/logo.webp" 
              alt="Yuan Exchange Logo"
              fill 
              className="object-contain" 
              priority 
            />
          </div>
        </a>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-white font-bold hover:text-green-400 transition-colors text-lg"
            >
              {link.name}
            </Link>
          ))}
          
          {/* 🚩 ปุ่มเขียว Desktop: เปลี่ยนเป็นลิงค์ไลน์แล้วน่อ */}
          <a 
            href={lineLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00d632] hover:bg-[#00b52a] text-white px-8 py-3 rounded-full font-black text-lg shadow-lg active:scale-95 transition-all inline-block"
          >
            เช็คเรทวันนี้
          </a>
        </div>

        {/* 📱 Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {/* 🚩 ปุ่มเขียว Mobile: ใส่ลิงค์ไลน์ให้แล้วเช่นกันน่อ */}
          <a 
            href={lineLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00d632] text-white px-4 py-2 rounded-full font-black text-sm active:scale-95 transition-all"
          >
            เช็คเรท
          </a>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-1"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu Dropdown */}
      <div className={`absolute top-full left-0 w-full bg-[#0047ff] border-t border-white/10 transition-all duration-300 overflow-hidden md:hidden ${
        isOpen ? 'max-h-screen opacity-100 py-6 shadow-2xl' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-xl"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}