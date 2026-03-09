'use client';
import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, CheckCircle2, Clock, ChevronDown, Info, RefreshCw } from 'lucide-react';

const RATE_CONFIG = {
  bank: {
    baseRate: 4.68,
    bonus: 0.05,
    thresholds: [{ minCNY: 100000, rate: 4.67 }, { minCNY: 50000, rate: 4.675 }]
  },
  digital: {
    baseRate: 4.71,
    alipayBonus: 0.03,
    wechatBonus: 0,
    minFeeThreshold: 1000,
    feeAmount: 50,
    thresholds: [{ minCNY: 100000, rate: 4.66 }, { minCNY: 50000, rate: 4.665 }, { minCNY: 10000, rate: 4.67 }]
  },
  pay: { fixedRate: 4.76, minFeeThreshold: 1000, feeAmount: 50 }
};

export default function HeroSection() {
  const [amount, setAmount] = useState('10000');
  const [transferType, setTransferType] = useState('bank');
  const [calculationMode, setCalculationMode] = useState('THBtoCNY'); 
  
  const lineLink = "https://line.me/R/ti/p/@yuanexchange";

  const { currentRate, fee, resultValue } = useMemo(() => {
    const inputNum = Number(amount) || 0;
    let rate = 0;
    let transferFee = 0;

    switch (transferType) {
      case 'bank': {
        const config = RATE_CONFIG.bank;
        const estCNY = calculationMode === 'THBtoCNY' ? inputNum / config.baseRate : inputNum;
        const match = config.thresholds.find(t => estCNY >= t.minCNY);
        rate = (match ? match.rate : config.baseRate) + config.bonus;
        break;
      }
      case 'alipay':
      case 'wechat': {
        const config = RATE_CONFIG.digital;
        const estCNY = calculationMode === 'THBtoCNY' ? inputNum / config.baseRate : inputNum;
        const match = config.thresholds.find(t => estCNY >= t.minCNY);
        const bonus = transferType === 'alipay' ? config.alipayBonus : config.wechatBonus;
        rate = (match ? match.rate : config.baseRate) + bonus;
        if (estCNY < config.minFeeThreshold) transferFee = config.feeAmount;
        break;
      }
      case 'pay': {
        const config = RATE_CONFIG.pay;
        rate = config.fixedRate;
        const estCNY = calculationMode === 'THBtoCNY' ? inputNum / rate : inputNum;
        if (estCNY < config.minFeeThreshold) transferFee = config.feeAmount;
        break;
      }
      default: rate = 4.70;
    }

    let finalResult = 0;
    if (calculationMode === 'THBtoCNY') {
      finalResult = Math.max(0, (inputNum - transferFee) / rate);
    } else {
      finalResult = (inputNum * rate) + transferFee;
    }

    return {
      currentRate: rate.toFixed(3),
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
          <div className="bg-slate-50 p-6 md:p-8 rounded-[40px] shadow-2xl w-full max-w-[440px] border border-white/50 relative">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800 uppercase">Calculator</h3>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold">
                <Clock size={12} /> UPDATE: 09/03/2026
              </div>
            </div>

            <div className="space-y-4 relative">
              <div>
                <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase tracking-widest text-left">เลือกช่องทางรับเงิน</label>
                <div className="relative">
                  <select 
                    value={transferType}
                    onChange={(e) => setTransferType(e.target.value)}
                    className="w-full bg-white border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm text-slate-700 appearance-none outline-none focus:border-blue-500 transition-all shadow-sm cursor-pointer"
                  >
                    <option value="bank">บัญชีธนาคารจีน</option>
                    <option value="alipay">อลิเพย์ / Alipay</option>
                    <option value="wechat">วีแชท / WeChat </option>
                    <option value="pay">ฝากจ่ายยอดสินค้า</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-[18px] text-slate-400" size={20} />
                </div>
              </div>

              {/* Input Section */}
              <div className="bg-white p-5 rounded-2xl border-2 border-slate-50 shadow-sm relative z-0">
                <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-widest text-left">
                  {calculationMode === 'THBtoCNY' ? 'คุณจ่าย (THB)' : 'ระบุยอดที่ต้องการ (CNY)'}
                </label>
                <div className="flex justify-between items-center">
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="text-2xl font-black text-slate-800 outline-none w-full bg-transparent" />
                  <span className="font-black text-slate-300 text-sm ml-2">
                    {calculationMode === 'THBtoCNY' ? 'THB' : 'CNY'}
                  </span>
                </div>
              </div>

              {/* Result Section พร้อมปุ่มสลับตรงกลาง */}
              <div className="relative pt-2">
                {/* 🔄 ปุ่มสลับโหมด - ย้ายมาไว้ตรงลูกศรตรงกลางน่อ */}
                <button 
                  onClick={() => setCalculationMode(prev => prev === 'THBtoCNY' ? 'CNYtoTHB' : 'THBtoCNY')}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white p-2.5 rounded-full shadow-md text-[#0a6afc] border-4 border-slate-50 z-20 hover:text-blue-700 hover:scale-110 active:scale-95 transition-all group"
                  title="สลับฝั่งการคำนวณ"
                >
                  <div className="relative overflow-hidden">
                    <ArrowRightLeft size={18} className="group-hover:opacity-0 transition-opacity duration-300" />
                    <RefreshCw size={18} className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500" />
                  </div>
                </button>

                <div className="bg-blue-600 p-5 rounded-2xl shadow-inner relative overflow-hidden">
                  <label className="text-[10px] text-white/70 font-bold block mb-1 uppercase tracking-widest text-left mt-1">
                    {calculationMode === 'THBtoCNY' ? 'ผู้รับได้ (CNY)' : 'คุณต้องจ่ายทั้งหมด (THB)'}
                  </label>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-black text-white truncate">
                      {resultValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <span className="font-black text-white/50 text-sm ml-2">
                      {calculationMode === 'THBtoCNY' ? 'CNY' : 'THB'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="bg-slate-100 p-3 rounded-xl flex justify-between items-center text-[12px] font-black">
                  <span className="text-slate-500 uppercase tracking-tighter text-left">Current Rate:</span>
                  <span className="text-blue-600">1¥ = {currentRate} ฿</span>
                </div>
                {fee > 0 && (
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-red-500 font-bold py-1 bg-red-50 rounded-lg border border-red-100 animate-pulse">
                    <Info size={12} /> มีค่าบริการ {fee}฿ (สำหรับยอดต่ำกว่า 1,000¥)
                  </div>
                )}
              </div>

              <a href={lineLink} target="_blank" className="w-full bg-[#0a6afc] hover:bg-blue-700 text-white py-5 rounded-2xl text-xl font-black transition-all shadow-lg flex items-center justify-center active:scale-95 uppercase tracking-widest">
                แลกเงินทันที
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}