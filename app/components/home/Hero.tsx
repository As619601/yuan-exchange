'use client';
import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, CheckCircle2, Clock, ChevronDown, Info } from 'lucide-react';

export default function HeroSection() {
  const [amount, setAmount] = useState('10000');
  const [transferType, setTransferType] = useState('bank'); 
  
  const lineLink = "https://line.me/R/ti/p/@yuanexchange";

  // ✅ Logic คำนวณเรท (แยกประเภทชัดเจน)
  const { currentRate, fee, resultCNY } = useMemo(() => {
    const inputTHB = Number(amount) || 0;
    let rate = 0;
    let transferFee = 0;

    if (transferType === 'bank') {
      // 🏦 1. เรทบัญชีธนาคารจีน (เรทฐาน + 0.05)
      const estCNY = inputTHB / 4.68; 
      if (estCNY >= 100000) rate = 4.67; //100000¥ ขึ้นไป
      else if (estCNY >= 50000) rate = 4.675; //50000¥ ขึ้นไป
      else rate = 4.68;
      
      rate += 0.05; // บวกเพิ่มตามเงื่อนไขบัญชีจีน

    } else if (transferType === 'alipay' || transferType === 'wechat') {
      // 📱 2. เรท วีแชท / อลิเพย์
      const estCNY = inputTHB / 4.71;
      if (estCNY >= 100000) rate = 4.66; //100000¥ ขึ้นไป
      else if (estCNY >= 50000) rate = 4.665; //50000¥ ขึ้นไป
      else if (estCNY >= 10000) rate = 4.67; //10000¥ ขึ้นไป
      else rate = 4.71; // ต่ำกว่า 10000¥

      // ถ้าเป็น อลิเพย์ ให้บวกเพิ่ม 0.03 (วีแชทไม่บวก)
      if (transferType === 'alipay') rate += 0.03;

      // ค่าบริการ 50฿ ถ้าต่ำกว่า 1000 หยวน
      if ((inputTHB / rate) < 1000) transferFee = 50;

    } else if (transferType === 'pay') {
      // 🔺 3. เรทฝากจ่าย
      rate = 4.76;
      if ((inputTHB / rate) < 1000) transferFee = 50;
    }

    return {
      currentRate: rate.toFixed(3),
      fee: transferFee,
      resultCNY: Math.max(0, (inputTHB - transferFee) / rate)
    };
  }, [amount, transferType]);

  return (
    <section className="relative w-full h-auto min-h-screen bg-[#0a6afc] flex items-center py-20 md:py-32 overflow-hidden font-sans text-left">
      <div className="absolute inset-0 bg-gradient-to-b from-[#003192] to-[#4488ff] opacity-90" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
        
        {/* 📝 ฝั่งเนื้อหา */}
        <div className="text-white space-y-6 w-full text-center lg:text-left">
          <div className="space-y-1">
            <h2 className="text-base md:text-xl font-bold opacity-90 leading-none tracking-wide">เงินหยวน</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none uppercase italic">YUAN EXCHANGE</h1>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
            แลกเงินหยวน โอนเงินไปจีน<br className="hidden md:block" />
            <span className="text-white/90 font-extrabold"> ครบวงจร จบทุกปัญหา </span>
          </h2>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest">
              <CheckCircle2 size={14} className="text-green-400" /> ปลอดภัย 100%
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest">
              <CheckCircle2 size={14} className="text-green-400" /> เรทดีที่สุด
            </div>
          </div>
        </div>

        {/* 💳 ฝั่งเครื่องคิดเลข */}
        <div className="flex flex-col items-center lg:items-end w-full gap-5">
          <div className="bg-slate-50 p-6 md:p-8 rounded-[40px] shadow-2xl w-full max-w-[440px] border border-white/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800 uppercase">Calculator</h3>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold">
                <Clock size={12} /> UPDATE: 09/03/2026
              </div>
            </div>

            <div className="space-y-4">
              {/* เลือกประเภทการโอน - มากิแยกย่อยให้แล้วน่อ */}
              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase tracking-widest text-left">เลือกช่องทางรับเงิน</label>
                <div className="relative">
                  <select 
                    value={transferType}
                    onChange={(e) => setTransferType(e.target.value)}
                    className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm text-slate-700 appearance-none outline-none focus:border-blue-500 transition-all shadow-sm cursor-pointer"
                  >
                    <option value="bank">บัญชีธนาคารจีน ชื่อคนไทย ชื่อบริษัท(+0.05)</option>
                    <option value="alipay">อลิเพย์ / Alipay ชื่อคนไทย ชื่อบริษัท(+0.03)</option>
                    <option value="wechat">วีแชท / WeChat (เรทปกติ)</option>
                    <option value="pay">ฝากจ่ายยอดสินค้า</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-4.5 text-slate-400" size={20} />
                </div>
              </div>

              {/* Input THB */}
              <div className="bg-white p-5 rounded-2xl border-2 border-slate-50 shadow-sm">
                <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-widest text-left">คุณจ่าย (THB)</label>
                <div className="flex justify-between items-center">
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="text-2xl font-black text-slate-800 outline-none w-full bg-transparent" />
                  <span className="font-black text-slate-300 text-sm ml-2">THB</span>
                </div>
              </div>

              {/* Result CNY */}
              <div className="bg-blue-600 p-5 rounded-2xl shadow-inner relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-md text-[#0a6afc] border-4 border-slate-50">
                  <ArrowRightLeft size={16} />
                </div>
                <label className="text-[10px] text-white/70 font-bold block mb-1 uppercase tracking-widest text-left mt-1">ผู้รับได้ (CNY)</label>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-black text-white truncate">
                    {resultCNY.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="font-black text-white/50 text-sm ml-2">CNY</span>
                </div>
              </div>

              {/* Rate Info */}
              <div className="space-y-2 pt-1">
                <div className="bg-slate-100 p-3 rounded-xl flex justify-between items-center text-[12px] font-black">
                  <span className="text-slate-500 uppercase tracking-tighter">Current Rate:</span>
                  <span className="text-blue-600">1¥ = {currentRate} ฿</span>
                </div>
                {fee > 0 && (
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-red-500 font-bold py-1 bg-red-50 rounded-lg border border-red-100 animate-pulse">
                    <Info size={12} /> ต่ำกว่า 1,000¥ มีค่าบริการ {fee}฿
                  </div>
                )}
              </div>

              <a href={lineLink} target="_blank" className="w-full bg-[#0a6afc] hover:bg-blue-700 text-white py-5 rounded-2xl text-xl font-black transition-all shadow-lg flex items-center justify-center active:scale-95 uppercase tracking-widest">
                แลกเงินทันที
              </a>
            </div>
          </div>

          {/* 🚩 รายละเอียดเงื่อนไขด้านล่าง */}
          <div className="w-full max-w-[440px] bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white shadow-2xl">
            <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
              <Info size={16} className="text-blue-300" />
              Service Details
            </h4>
            <div className="space-y-3 text-[12px]">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="opacity-70">บัญชีธนาคารจีน (ไทย/บริษัท)</span>
                <span className="font-bold text-blue-300">+0.05</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="opacity-70">อลิเพย์ (ไทย/บริษัท)</span>
                <span className="font-bold text-orange-300">+0.03</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="opacity-70">วีแชท (จีน/ไทย/บริษัท)</span>
                <span className="font-bold text-green-400">เรทปกติ</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="opacity-70">*เป็นเพียงค่าประมาณ </span>
                <span className="font-bold text-green-400">โปรดติดต่อเจ้าหน้าที่เพื่อรับเรทที่ถูกต้องอีกครั้ง*</span>
              </div>
              <p className="text-[10px] text-red-200 italic pt-1">
                * ยอดต่ำกว่า 1,000¥ มีค่าบริการ 50฿
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}