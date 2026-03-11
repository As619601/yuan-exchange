'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowRightLeft, CheckCircle2, ChevronDown, Info, RefreshCw, MessageCircle } from 'lucide-react';

export default function HeroSection() {
  const [calculationMode, setCalculationMode] = useState('THBtoCNY');
  const [amount, setAmount] = useState('10000');
  const [transferType, setTransferType] = useState('bank');
  
  // 🔄 อัปเดตโครงสร้าง State ให้รองรับ 6 เรท
  const [rates, setRates] = useState({
    bank: 4.67,
    digital: 4.70,
    pay: 4.75,
    bank_cny: 4.35,    // เพิ่มเรทฝั่งหยวนแลกบาท
    digital_cny: 4.35, 
    pay_cny: 4.35,
    minFeeThreshold: 1000,
    feeAmount: 50
  });

  useEffect(() => {
    async function fetchLiveRates() {
      const { data, error } = await supabase
        .from('rates')
        .select('*')
        .eq('id', 1)
        .single();

      if (data && !error) {
        setRates({
          bank: data.bank_rate,
          digital: data.digital_rate,
          pay: data.pay_rate,
          bank_cny: data.bank_rate_cny_to_thb,
          digital_cny: data.digital_rate_cny_to_thb,
          pay_cny: data.pay_rate_cny_to_thb,
          feeAmount: data.fee_amount,
          minFeeThreshold: data.fee_threshold
        });
      }
    }
    fetchLiveRates();
  }, []);

  const lineLink = "https://lin.ee/XiJIx4F";

  const { currentRate, fee, resultValue } = useMemo(() => {
    const inputNum = Number(amount) || 0;
    let rate = 0;
    let transferFee = 0;

    // 🎯 1. เลือกเรทให้ถูกฝั่งและถูกประเภท
    if (calculationMode === 'THBtoCNY') {
      // ฝั่งบาทแลกหยวน (ไปจีน)
      if (transferType === 'bank') rate = rates.bank;
      else if (transferType === 'alipay' || transferType === 'wechat') rate = rates.digital;
      else if (transferType === 'pay') rate = rates.pay;
    } else {
      // ฝั่งหยวนแลกบาท (กลับไทย)
      if (transferType === 'bank') rate = rates.bank_cny;
      else if (transferType === 'alipay' || transferType === 'wechat') rate = rates.digital_cny;
      else if (transferType === 'pay') rate = rates.pay_cny;
    }

    // 🎯 2. คำนวณค่าธรรมเนียม (เช็คจากยอดหยวนเสมอ)
    const totalCNYForFeeCheck = calculationMode === 'CNYtoTHB' ? inputNum : (inputNum / rate);
    if (totalCNYForFeeCheck > 0 && totalCNYForFeeCheck < rates.minFeeThreshold) {
      transferFee = rates.feeAmount;
    }

    // 🎯 3. คำนวณผลลัพธ์สุดท้าย
    let finalResult = 0;
    if (calculationMode === 'CNYtoTHB') {
      // หยวน -> บาท: (ยอดหยวน * เรท) + ค่าธรรมเนียม 50 บาท (ถ้ามี)
      finalResult = (inputNum * rate) + transferFee;
    } else {
      // บาท -> หยวน: (ยอดบาท - ค่าธรรมเนียม 50 บาท) / เรท
      finalResult = Math.max(0, (inputNum - transferFee) / rate);
    }

    return {
      currentRate: rate.toFixed(2),
      fee: transferFee,
      resultValue: finalResult
    };
  }, [amount, transferType, calculationMode, rates]);

  // ... (ส่วนของ JSX คงเดิมตามที่ปังส่งมาน่อ เพราะ UI สวยอยู่แล้ว!)
  return (
    <section className="relative w-full h-auto min-h-screen bg-[#0a6afc] flex items-center py-20 md:py-32 overflow-hidden font-noto text-left">
      <div className="absolute inset-0 bg-gradient-to-b from-[#003192] to-[#4488ff] opacity-90" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
        
        {/* Content Side */}
        <div className="text-white space-y-6 w-full text-center lg:text-left">
          <div className="space-y-1">
            <h2 className="text-base md:text-xl font-bold opacity-90 leading-none tracking-wide">เงินหยวน</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none uppercase ">YUAN EXCHANGE</h1>
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
            
            <div className="flex bg-slate-200/50 p-1.5 rounded-2xl mb-6 gap-1">
              <button 
                onClick={() => { setCalculationMode('THBtoCNY'); setAmount('10000'); }}
                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all uppercase tracking-tighter ${calculationMode === 'THBtoCNY' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                บาท แลก หยวน
              </button>
              <button 
                onClick={() => { setCalculationMode('CNYtoTHB'); setAmount('1000'); }}
                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all uppercase tracking-tighter ${calculationMode === 'CNYtoTHB' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                หยวน แลก บาท
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
                    <option value="bank">โอนเข้าบัญชีธนาคาร</option>
                    <option value="alipay">Alipay / Wechatpay</option>
                    <option value="pay">ธุรกรรมฝากจ่ายยอดสินค้า</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-[18px] text-slate-400" size={20} />
                </div>
              </div>

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

              <div className="flex justify-center -my-2 relative z-10">
                <div className="bg-white p-2 rounded-full shadow-md border-4 border-slate-50 text-blue-600">
                  <ArrowRightLeft size={16} />
                </div>
              </div>

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

              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center px-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">เรทปัจจุบัน</span>
                    <span className="text-sm font-black text-slate-700">1¥ = {currentRate} ฿</span>
                  </div>
                  {fee > 0 && (
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-red-400 font-bold uppercase tracking-tight text-right italic leading-none">Service Fee</span>
                      <span className="text-sm font-black text-red-500">+{fee} ฿</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 space-y-2">
  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 space-y-2">
  {/* 1. โชว์ส่วนค่าธรรมเนียม "เฉพาะ" ฝั่งบาทแลกหยวนเท่านั้นน่อปัง */}
  {calculationMode === 'THBtoCNY' && (
    <div className="flex items-start gap-2 text-[11px] text-blue-700 font-bold leading-relaxed">
      <Info size={14} className="shrink-0 mt-0.5" />
      <p>ยอดต่ำกว่า {rates.minFeeThreshold.toLocaleString()} หยวน มีค่าบริการ {rates.feeAmount} บาท/รายการ</p>
    </div>
  )}

  {/* 2. โชว์ส่วนทักแอดมิน "ทั้งสองฝั่ง" เลยน่อ */}
  <div className="flex items-start gap-2 text-[11px] text-slate-500 font-medium leading-relaxed italic">
    <MessageCircle size={14} className="shrink-0 mt-0.5 text-green-500" />
    <p>ก่อนทำธุรกรรมสอบถามแอดมินทุกครั้ง ยอดยิ่งสูงเรทยิ่งดี!</p>
  </div>
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