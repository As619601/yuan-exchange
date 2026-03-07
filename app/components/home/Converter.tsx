'use client';
import React, { useMemo } from 'react';
import { Bell, RefreshCw, Clock, Info, AlertCircle } from 'lucide-react'; 
import { useExchange, type Currency } from '@/hooks/useExchange';

export default function Converter() {
  const EXCHANGE_RATE = 5.05; 
  
  const { 
    amount, setAmount, 
    fromCurrency, setFromCurrency, 
    toCurrency, setToCurrency, 
    swapCurrency 
  } = useExchange(EXCHANGE_RATE);

  // 🛠️ ลอจิกค่าธรรมเนียม: โชว์เพื่อแจ้งให้ทราบ
  const fee = useMemo(() => {
    return (amount > 0 && amount < 1000) ? 50 : 0;
  }, [amount]);

  // 🧮 คำนวณยอดออกแบบตรงๆ (Amount / Rate) ตามที่ปังต้องการ
  const directResult = useMemo(() => {
    if (amount <= 0) return 0;
    return fromCurrency === 'THB' ? amount / EXCHANGE_RATE : amount * EXCHANGE_RATE;
  }, [amount, fromCurrency, EXCHANGE_RATE]);

  return (
    <div className="w-full max-w-md p-10 rounded-[40px] shadow-[0_32px_64px_-12px_rgba(49,83,124,0.14)] border border-white/20 bg-white/100 backdrop-blur-xl relative z-10">
      
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-black text-[#31537c]">คำนวณเงินหยวน</h3>
        <div className="text-[#4071b7] bg-blue-50 p-2 rounded-full">
          <Bell size={20} />
        </div>
      </div>

      <div className="space-y-6">
        {/* 📥 ช่องกรอกเงิน (Send) */}
        <div className="bg-[#f4f7fa] p-5 rounded-2xl border border-gray-100 focus-within:border-blue-300 transition-all">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-2 block">
            จำนวนเงินที่โอน ({fromCurrency})
          </label>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              value={amount || ''} 
              placeholder="0.00"
              onChange={(e) => setAmount(Number(e.target.value))}
              className="bg-transparent text-2xl font-bold text-[#31537c] w-full outline-none"
            />
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm font-bold text-[#31537c]">{fromCurrency}</div>
          </div>
        </div>

        {/* 🔄 ปุ่มสลับ */}
        <div className="flex justify-center -my-8 relative z-20">
          <button onClick={swapCurrency} className="bg-[#31537c] text-white p-3 rounded-full shadow-xl hover:rotate-180 transition-all duration-500 border-4 border-white">
            <RefreshCw size={20} />
          </button>
        </div>

        {/* 📤 ช่องผลลัพธ์ (คำนวณตรงๆ) */}
        <div className="bg-[#31537c] p-6 rounded-3xl shadow-inner relative overflow-hidden">
          <label className="text-[10px] font-bold text-white/50 uppercase tracking-[0.1em] mb-2 block">
            ยอดเงินที่จะได้รับ ({toCurrency})
          </label>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-black text-white">
              {directResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-yellow-400 font-black text-lg">{toCurrency}</div>
          </div>
        </div>

        {/* 💸 ส่วนโชว์ค่าธรรมเนียมด้านล่าง (Highlight จุดนี้ให้นะน่อปัง) */}
        <div className={`p-4 rounded-2xl transition-all duration-300 ${fee > 0 ? 'bg-red-50 border border-red-100' : 'bg-green-50 border border-green-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {fee > 0 ? <AlertCircle size={16} className="text-red-500" /> : <Info size={16} className="text-green-500" />}
              <span className={`text-xs font-bold ${fee > 0 ? 'text-red-600' : 'text-green-700'}`}>
                ค่าธรรมเนียมบริการ
              </span>
            </div>
            <span className={`text-sm font-black ${fee > 0 ? 'text-red-600' : 'text-green-700'}`}>
              {fee > 0 ? `+ ${fee} THB` : 'ฟรี! ไม่มีค่าธรรมเนียม'}
            </span>
          </div>
          {fee > 0 && (
            <p className="text-[10px] text-red-400 mt-1 font-medium italic">
              * ยอดโอนต่ำกว่า 1,000 บาท มีค่าบริการคงที่ 50 บาท
            </p>
          )}
        </div>

        <button className="w-full bg-[#4071b7] hover:bg-[#4d82cc] text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95">
  โอนเงินตอนนี้
</button>
      </div>
    </div>
  );
}