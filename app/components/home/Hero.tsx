'use client';
import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, CheckCircle2, Clock, ChevronDown, Info, RefreshCw, MessageCircle } from 'lucide-react';

// ⚙️ Configuration: ปรับเรทดิบที่นี่น่อ
const RATE_CONFIG = {
  bank: 4.67, //แลกเงินเข้าบัญชีธนาคารจีน
  digital: 4.70, //อลิเพย์ / WeChat (ธุรกรรมดิจิทัล)
  pay: 4.75, //ธุรกรรมฝากจ่ายยอดสินค้า (เรทจะดีกว่าเพราะมีความเสี่ยงน้อยกว่า)
  minFeeThreshold: 1000,
  feeAmount: 50
};

export default function HeroSection() {
  const [calculationMode, setCalculationMode] = useState('CNYtoTHB');
  const [amount, setAmount] = useState('1000');
  const [transferType, setTransferType] = useState('bank');
  
  const lineLink = "https://line.me/R/ti/p/@yuanexchange";

  const { currentRate, fee, resultValue } = useMemo(() => {
    const inputNum = Number(amount) || 0;
    let rate = 0;
    let transferFee = 0;

    // 1. เลือกเรทดิบตามประเภท (ไม่มีบวก Bonus แล้วน่อ)
    if (transferType === 'bank') {
      rate = RATE_CONFIG.bank;
    } else if (transferType === 'alipay' || transferType === 'wechat') {
      rate = RATE_CONFIG.digital;
    } else if (transferType === 'pay') {
      rate = RATE_CONFIG.pay;
    }

    // 2. เช็กค่าธรรมเนียมจากยอดหยวน
    const totalCNY = calculationMode === 'CNYtoTHB' ? inputNum : (inputNum / rate);
    if (totalCNY > 0 && totalCNY < RATE_CONFIG.minFeeThreshold) {
      transferFee = RATE_CONFIG.feeAmount;
    }

    // 3. คำนวณตามโหมด
    let finalResult = 0;
    if (calculationMode === 'CNYtoTHB') {
      // หยวน -> บาท: (ยอดหยวน * เรท) + ค่าธรรมเนียม
      finalResult = (inputNum * rate) + transferFee;
    } else {
      // บาท -> หยวน: (ยอดบาท - ค่าธรรมเนียม) / เรท
      finalResult = Math.max(0, (inputNum - transferFee) / rate);
    }

    return {
      currentRate: rate.toFixed(2),
      fee: transferFee,
      resultValue: finalResult
    };
  }, [amount, transferType, calculationMode]);

  return (
    <section className="relative w-full h-auto min-h-screen bg-[#0a6afc] flex items-center py-20 md:py-32 overflow-hidden font-sans text-left">
      <div className="absolute inset-0 bg-gradient-to-b from-[#003192] to-[#4488ff] opacity-90" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
        
        {/* Content Side */}
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
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-white">
              <CheckCircle2 size={14} className="text-green-400" /> ปลอดภัย 100%
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-white">
              <CheckCircle2 size={14} className="text-green-400" /> เรทดีที่สุด
            </div>
          </div>
        </div>

        {/* Calculator Side */}
        <div className="flex flex-col items-center lg:items-end w-full gap-5">
          <div className="bg-slate-50 p-4 md:p-8 rounded-[40px] shadow-2xl w-full max-w-[440px] border border-white/50 relative">
            
            {/* 📑 Tab Switcher */}
            <div className="flex bg-slate-200/50 p-1.5 rounded-2xl mb-6 gap-1">
              <button 
                onClick={() => { setCalculationMode('CNYtoTHB'); setAmount('1000'); }}
                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all uppercase tracking-tighter ${calculationMode === 'CNYtoTHB' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                หยวน แลก บาท
              </button>
              <button 
                onClick={() => { setCalculationMode('THBtoCNY'); setAmount('10000'); }}
                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all uppercase tracking-tighter ${calculationMode === 'THBtoCNY' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                บาท แลก หยวน
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase tracking-widest text-left px-1">เลือกช่องทางรับเงิน</label>
                <div className="relative">
                  <select 
                    value={transferType}
                    onChange={(e) => setTransferType(e.target.value)}
                    className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm text-slate-700 appearance-none outline-none focus:border-blue-500 transition-all shadow-sm cursor-pointer"
                  >
                    <option value="bank">โอนเข้าบัญชีธนาคารจีน</option>
                    <option value="alipay">อลิเพย์ / Alipay</option>
                    <option value="wechat">วีแชท / WeChat</option>
                    <option value="pay">ธุรกรรมฝากจ่ายยอดสินค้า</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-[18px] text-slate-400" size={20} />
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm transition-all focus-within:border-blue-200">
                <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-widest text-left">
                  {calculationMode === 'CNYtoTHB' ? 'ระบุยอดหยวน (CNY)' : 'ระบุยอดบาท (THB)'}
                </label>
                <div className="flex justify-between items-center">
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    className="text-2xl font-black text-slate-800 outline-none w-full bg-transparent" 
                  />
                  <span className="font-black text-blue-600 text-sm ml-2 bg-blue-50 px-3 py-1 rounded-lg">
                    {calculationMode === 'CNYtoTHB' ? 'CNY' : 'THB'}
                  </span>
                </div>
              </div>

              {/* Middle Icon */}
              <div className="flex justify-center -my-2 relative z-10">
                <div className="bg-white p-2 rounded-full shadow-md border-4 border-slate-50 text-blue-600">
                  <ArrowRightLeft size={16} />
                </div>
              </div>

              {/* Result Area */}
              <div className="bg-blue-600 p-6 rounded-3xl shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform pointer-events-none">
                    <RefreshCw size={60} />
                </div>
                <label className="text-[10px] text-white/70 font-bold block mb-1 uppercase tracking-widest text-left">
                  {calculationMode === 'CNYtoTHB' ? 'คุณต้องจ่ายทั้งหมด (THB)' : 'ผู้รับจะได้รับ (CNY)'}
                </label>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-black text-white truncate">
                    {resultValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="font-black text-white/50 text-sm ml-2 uppercase">
                    {calculationMode === 'CNYtoTHB' ? 'THB' : 'CNY'}
                  </span>
                </div>
              </div>

              {/* Dynamic Info */}
              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center px-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">เรทปัจจุบัน</span>
                    <span className="text-sm font-black text-slate-700">1¥ = {currentRate} ฿</span>
                  </div>
                  {fee > 0 && (
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-red-400 font-bold uppercase tracking-tight text-right italic leading-none">Low Amount Fee</span>
                      <span className="text-sm font-black text-red-500">+{fee} ฿</span>
                    </div>
                  )}
                </div>
                
                {/* 📝 โน้ตด้านล่าง */}
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 space-y-2">
                  <div className="flex items-start gap-2 text-[11px] text-blue-700 font-bold leading-relaxed">
                    <Info size={14} className="shrink-0 mt-0.5" />
                    <p>ยอดต่ำกว่า 1,000 หยวน มีค่าบริการ 50 บาท/รายการ</p>
                  </div>
                  <div className="flex items-start gap-2 text-[11px] text-slate-500 font-medium leading-relaxed italic">
                    <MessageCircle size={14} className="shrink-0 mt-0.5 text-green-500" />
                    <p>ก่อนทำธุรกรรมสอบถามแอดมินทุกครั้ง ยอดยิ่งสูงเรทยิ่งดี!</p>
                  </div>
                </div>
              </div>

              <a href={lineLink} target="_blank" className="w-full bg-[#0a6afc] hover:bg-blue-700 text-white py-5 rounded-2xl text-xl font-black transition-all shadow-lg shadow-blue-200 flex items-center justify-center active:scale-95 uppercase tracking-widest gap-2">
                แลกเงินทันที
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}