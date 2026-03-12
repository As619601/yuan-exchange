'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowRightLeft, ChevronDown, Info, RefreshCw, MessageCircle } from 'lucide-react';

export default function Calculator() {
  const [calculationMode, setCalculationMode] = useState('THBtoCNY');
  const [amount, setAmount] = useState('10000');
  const [transferType, setTransferType] = useState('bank');
  
  // 🔄 State สำหรับเก็บเรทที่ดึงมาจาก Database
  const [rates, setRates] = useState({
    bank: 4.67, 
    digital: 4.70, 
    pay: 4.75,
    bank_cny: 4.35, 
    digital_cny: 4.35, 
    pay_cny: 4.35,
    minFeeThreshold: 1000, 
    feeAmount: 50
  });

  // 🌐 ดึงข้อมูลเรทจาก Supabase เมื่อ Component โหลด
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

  // 🧮 Logic การคำนวณเงิน
  const { currentRate, fee, resultValue } = useMemo(() => {
    const inputNum = Number(amount) || 0;
    let rate = 0;
    let transferFee = 0;

    // 1. เลือกเรทตามโหมดและประเภทการโอน
    if (calculationMode === 'THBtoCNY') {
      if (transferType === 'bank') rate = rates.bank;
      else if (transferType === 'alipay' || transferType === 'wechat') rate = rates.digital;
      else if (transferType === 'pay') rate = rates.pay;
    } else {
      if (transferType === 'bank') rate = rates.bank_cny;
      else if (transferType === 'alipay' || transferType === 'wechat') rate = rates.digital_cny;
      else if (transferType === 'pay') rate = rates.pay_cny;
    }

    // 2. ตรวจสอบค่าธรรมเนียม (อิงตามยอดเงินหยวน)
    const totalCNYForFeeCheck = calculationMode === 'CNYtoTHB' ? inputNum : (inputNum / rate);
    if (totalCNYForFeeCheck > 0 && totalCNYForFeeCheck < rates.minFeeThreshold) {
      transferFee = rates.feeAmount;
    }

    // 3. คำนวณยอดสุทธิ (ใช้ const ตามที่ปังบอกน่อ)
    const finalResult = calculationMode === 'CNYtoTHB' 
      ? (inputNum * rate) 
      : Math.max(0, (inputNum - transferFee) / rate);

    return { 
      currentRate: rate.toFixed(2), 
      fee: calculationMode === 'THBtoCNY' ? transferFee : 0, 
      resultValue: finalResult 
    };
  }, [amount, transferType, calculationMode, rates]);

  return (
    <div className="bg-white p-5 md:p-8 rounded-[40px] shadow-2xl w-full max-w-[440px] border border-white/50 relative">
      
      {/* ส่วนสลับโหมดการคำนวณ */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6 gap-1">
        {['THBtoCNY', 'CNYtoTHB'].map((mode) => (
          <button 
            key={mode} 
            onClick={() => { setCalculationMode(mode); setAmount(mode === 'THBtoCNY' ? '10000' : '1000'); }}
            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all uppercase ${calculationMode === mode ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            {mode === 'THBtoCNY' ? 'บาท แลก หยวน' : 'หยวน แลก บาท'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* เลือกช่องทาง */}
        <div className="relative">
          <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase px-1">เลือกช่องทางรับเงิน</label>
          <select 
            value={transferType} 
            onChange={(e) => setTransferType(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm text-slate-700 appearance-none outline-none focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="bank">โอนเข้าบัญชีธนาคาร</option>
            <option value="alipay">Alipay / Wechatpay</option>
            <option value="pay">ธุรกรรมฝากจ่ายยอดสินค้า</option>
          </select>
          <ChevronDown className="absolute right-4 top-[38px] text-slate-400 pointer-events-none" size={20} />
        </div>

        {/* ช่องกรอกจำนวนเงิน */}
        <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 focus-within:border-blue-200">
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

        {/* ผลลัพธ์การคำนวณ */}
        <div className="bg-blue-600 p-6 rounded-3xl shadow-lg relative overflow-hidden group text-white">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
            <RefreshCw size={60} />
          </div>
          <label className="text-[10px] text-white/70 font-bold block mb-1 uppercase tracking-widest text-left">
            {calculationMode === 'CNYtoTHB' ? 'คุณได้รับทั้งหมด (THB)' : 'ผู้รับจะได้รับ (CNY)'}
          </label>
          <div className="flex justify-between items-center">
            <div className="text-3xl font-black truncate">
              {resultValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="font-black text-white/50 text-sm ml-2 uppercase">
              {calculationMode === 'CNYtoTHB' ? 'THB' : 'CNY'}
            </span>
          </div>
        </div>

        {/* ข้อมูลเรทและค่าธรรมเนียม */}
        <div className="space-y-3 pt-1">
          <div className="flex justify-between items-center px-2">
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 font-bold uppercase">เรทปัจจุบัน</span>
              <span className="text-sm font-black text-slate-700">1¥ = {currentRate} ฿</span>
            </div>
            {fee > 0 && (
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-red-400 font-bold uppercase italic">Service Fee</span>
                <span className="text-sm font-black text-red-500">+{fee} ฿</span>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 space-y-2 text-left">
            {calculationMode === 'THBtoCNY' && (
              <div className="flex items-start gap-2 text-[11px] text-blue-700 font-bold leading-relaxed">
                <Info size={14} className="shrink-0 mt-0.5" />
                <p>ยอดต่ำกว่า {rates.minFeeThreshold.toLocaleString()} หยวน มีค่าบริการ {rates.feeAmount} บาท</p>
              </div>
            )}
            <div className="flex items-start gap-2 text-[11px] text-slate-500 font-medium italic leading-relaxed">
              <MessageCircle size={14} className="shrink-0 mt-0.5 text-green-500" />
              <p>ก่อนทำธุรกรรมสอบถามแอดมินทุกครั้ง!</p>
            </div>
          </div>
        </div>

        {/* ปุ่ม Call to Action */}
        <a 
          href="https://lin.ee/XiJIx4F" 
          target="_blank" 
          className="w-full bg-[#0a6afc] hover:bg-blue-700 text-white py-5 rounded-2xl text-xl font-black flex items-center justify-center transition-all active:scale-95 uppercase tracking-widest gap-2 shadow-lg shadow-blue-200"
        >
          แลกเงินทันที
        </a>
      </div>
    </div>
  );
}