'use client';
import React, { useState } from 'react';
import { ArrowRightLeft, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [amount, setAmount] = useState('10000');
  const rate = 4.85;
  const lineLink = "https://line.me/R/ti/p/@yuanexchange"; // 🚩 มากิเตรียมลิงค์ไว้ตรงนี้

  return (
    <section className="relative w-full h-auto min-h-screen bg-[#0a6afc] flex items-center py-20 md:py-32 overflow-hidden">
      
      {/* 🎨 Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003192] to-[#4488ff] opacity-90" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
        
        {/* 📝 ฝั่งเนื้อหา */}
        <div className="text-white space-y-6 w-full text-center lg:text-left">
          <div className="space-y-1">
            <h2 className="text-base md:text-xl font-bold opacity-90 leading-none">เงินหยวน</h2>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase">YUAN EXCHANGE</h1>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-[10px] md:text-xs font-medium uppercase tracking-wide">
            <CheckCircle2 size={12} className="text-green-400" />
            ความปลอดภัยระดับธนาคารชั้นนำ
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.2] md:leading-[1.15] break-words">
            แลกเงินหยวน โอนเงินไปจีน<br className="hidden md:block" />
            <span className="text-white"> เรทดีที่สุด ปลอดภัย 100%</span>
          </h2>

          <p className="text-sm md:text-base max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
            บริการรวดเร็ว โปร่งใส ไม่มีค่าธรรมเนียมแอบแฝง อนุมัติไวใน 15 นาที 
            ตอบโจทย์ทั้งนักธุรกิจและบุคคลทั่วไป
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 text-[11px] md:text-xs font-bold pt-2">
            <div className="flex items-center gap-2 justify-center"><CheckCircle2 size={14} className="text-red-400 shrink-0" /> เรทดีกว่าธนาคาร</div>
            <div className="flex items-center gap-2 justify-center"><CheckCircle2 size={14} className="text-red-400 shrink-0" /> โอนไวใน 15 นาที</div>
            <div className="flex items-center gap-2 justify-center"><CheckCircle2 size={14} className="text-red-400 shrink-0" /> ไม่มีค่าธรรมเนียม</div>
          </div>
        </div>

        {/* 💳 ฝั่งเครื่องคิดเลข */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-[#e8efff] p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl w-full max-w-[440px] border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">คำนวณอัตราแลกเปลี่ยน</h3>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium">
                <Clock size={12} /> 09:06 น.
              </div>
            </div>

            <div className="space-y-3 relative">
              {/* Input THB */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">คุณจ่าย (THB)</label>
                <div className="flex justify-between items-center gap-2">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-xl md:text-2xl font-bold text-slate-800 outline-none w-full bg-transparent min-w-0"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <img src="https://flagcdn.com/w40/th.png" alt="TH" className="w-5 h-3.5 object-cover rounded-sm" />
                    <span className="font-bold text-slate-500 text-xs">THB</span>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[88px] md:top-[95px] z-10">
                <div className="bg-white p-2 rounded-full shadow-md border border-red-100 text-red-500">
                  <ArrowRightLeft size={14} />
                </div>
              </div>

              {/* Result CNY */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">ผู้รับได้ (CNY)</label>
                <div className="flex justify-between items-center gap-2">
                  <div className="text-xl md:text-2xl font-bold text-slate-800 truncate">
                    {(Number(amount) / rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <img src="https://flagcdn.com/w40/cn.png" alt="CN" className="w-5 h-3.5 object-cover rounded-sm" />
                    <span className="font-bold text-slate-500 text-xs">CNY</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#d0e0ff] p-3 rounded-xl flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-medium">1 CNY = {rate} THB</span>
                <span className="font-bold text-slate-700">เรทพิเศษ</span>
              </div>

              {/* 🚩 ปุ่ม "แลกเงินทันที" เปลี่ยนเป็น Tag <a> และใส่ลิงค์ไลน์แล้วน่อปัง */}
              <a 
                href={lineLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0047cc] hover:bg-blue-800 text-white py-4 rounded-2xl text-lg font-bold transition-all shadow-lg active:scale-95 mt-2 flex items-center justify-center"
              >
                แลกเงินทันที
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}