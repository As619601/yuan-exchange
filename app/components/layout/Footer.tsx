'use client';
import React from 'react';
import Image from 'next/image';
import { Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  const lineLink = "https://line.me/R/ti/p/@yuanexchange";
  const phoneNumber = "0839854714";
  const facebookLink = "https://www.facebook.com/share/1D3fHYY9EX/";
  const homeLink = "https://www.เงินหยวน.com";

  return (
    <footer className="bg-[#0a1d37] text-white pt-16 pb-10 px-6 font-noto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* 1. คอลัมน์โลโก้และสโลแกน */}
        <div className="flex flex-col gap-6 text-left">
          <div className="relative w-[150px] h-10 overflow-hidden flex items-center justify-start">
            <Image 
              src="/images/logo.webp" 
              alt="Yuan Exchange Logo"
              fill 
              className="object-contain object-left" 
              priority 
            />
          </div>

          <p className="text-sm opacity-70 leading-relaxed font-medium">
            ผู้นำด้านบริการแลกเปลี่ยนเงินตราและโอนเงินระหว่างประเทศ ไทย-จีน 
            ด้วยระบบที่ทันสมัยและทีมงานมืออาชีพ มั่นคง ปลอดภัย 100%
          </p>

          <div className="flex gap-4">
            <a 
              href={`tel:${phoneNumber}`}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#3b82f6] transition-colors"
              title="โทรหาเรา"
            >
              <Phone size={18} />
            </a>
            <a 
              href={lineLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#00d632] transition-colors"
              title="คุยผ่าน LINE"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* 2. คอลัมน์เมนูหลัก (ใส่ Link ให้แล้วน่อปัง) */}
        <div className="flex flex-col gap-6 lg:pl-10 text-left">
          <h4 className="text-lg font-black tracking-tight">เมนูหลัก</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium opacity-70">
            <li>
              <a href={homeLink} className="hover:text-[#3b82f6] transition-colors cursor-pointer">หน้าแรก</a>
            </li>
            <li>
              <a href={lineLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors cursor-pointer">บริการของเรา</a>
            </li>
            <li>
              <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors cursor-pointer">โปรโมชั่น</a>
            </li>
            <li>
              <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors cursor-pointer">รีวิวจากลูกค้า</a>
            </li>
            <li>
              <a href={lineLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors cursor-pointer">คำถามที่พบบ่อย</a>
            </li>
          </ul>
        </div>

        {/* 3. คอลัมน์ติดต่อเรา */}
        <div className="flex flex-col gap-6 text-left">
          <h4 className="text-lg font-black tracking-tight">ติดต่อเรา</h4>
          <ul className="flex flex-col gap-5 text-sm font-medium">
            <li className="flex items-center gap-3">
              <a href={`tel:${phoneNumber}`} className="flex items-center gap-3 group">
                <Phone size={20} className="text-[#3b82f6] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="opacity-70 group-hover:opacity-100 group-hover:text-[#3b82f6] transition-all">083-985-4714</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <a href={lineLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-5 h-5 bg-[#3b82f6] group-hover:bg-[#00d632] rounded-full flex items-center justify-center transition-colors">
                  <span className="text-[10px] font-bold text-white">L</span>
                </div>
                <span className="opacity-70 font-bold underline group-hover:text-[#00d632] transition-all tracking-wide text-left">
                  Line ID: @yuanexchange
                </span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-5 h-5 bg-[#3b82f6] group-hover:bg-[#00d632] rounded-full flex items-center justify-center transition-colors">
                  <span className="text-[10px] font-bold text-white">FB</span>
                </div>
                <span className="opacity-70 font-bold underline group-hover:text-[#00d632] transition-all tracking-wide text-left">
                  Facebook: Yuan Exchange 
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* 4. คอลัมน์เวลาทำการ */}
        <div className="flex flex-col gap-6 text-left">
          <h4 className="text-lg font-black tracking-tight">เวลาทำการ</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium">
            <li className="flex justify-between items-center">
              <span className="opacity-60">จันทร์ - ศุกร์:</span>
              <span className="font-bold tracking-wider">09:00 - 18:00</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="opacity-60">เสาร์:</span>
              <span className="font-bold tracking-wider">10:00 - 16:00</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="opacity-60">อาทิตย์:</span>
              <span className="text-red-500 font-black">ปิดทำการ</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] md:text-xs opacity-40 font-medium tracking-widest">
          COPYRIGHT © 2026 YUAN EXCHANGE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}