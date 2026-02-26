'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { RefreshCw, ArrowRightLeft, TrendingUp, Info } from 'lucide-react';

export default function RatesPage() {
  const [amount, setAmount] = useState<number>(0);
  const currentRate = 4.93; // สมมติเรทวันนี้ สามารถทำระบบดึง API มาใส่ตรงนี้ได้

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 text-white">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black mb-4">
              เช็คเรทเงิน <span className="text-brand-yellow">DAILY RATES</span>
            </h1>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-400">
              <RefreshCw className="w-4 h-4 text-brand-yellow animate-spin-slow" />
              อัปเดตล่าสุด: วันนี้ 10:30 น.
            </div>
          </div>

          {/* Calculator Card */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 mb-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <ArrowRightLeft className="w-32 h-32" />
            </div>
            
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-brand-yellow" /> คำนวณอัตราแลกเปลี่ยน
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Input THB */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">เงินบาทไทย (THB)</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  className="w-full bg-slate-800 border border-white/10 rounded-2xl px-6 py-4 text-2xl font-bold focus:border-brand-yellow outline-none transition-all"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>

              {/* Result CNY */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">เงินหยวนจีน (CNY)</label>
                <div className="w-full bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl px-6 py-4 text-2xl font-bold text-brand-yellow">
                  ≈ {(amount / currentRate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ¥
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-xs text-gray-500 flex items-center gap-1">
                <Info className="w-3 h-3" /> เรทคำนวณเบื้องต้น: 1 ¥ = {currentRate} THB (โปรดเช็คเรทโอนจริงทาง LINE อีกครั้ง)
            </p>
          </div>

          {/* Rates Table */}
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900">
                  <th className="p-5 font-bold">ประเภทบริการ</th>
                  <th className="p-5 font-bold text-brand-yellow text-right">เรทวันนี้</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-5 text-gray-300">โอนเข้าธนาคารจีน (โอนไว)</td>
                  <td className="p-5 text-right font-mono text-xl">4.93</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-5 text-gray-300">เติมเงิน Alipay / WeChat Pay</td>
                  <td className="p-5 text-right font-mono text-xl">5.05</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-5 text-gray-300">ฝากจ่ายค่านำเข้าสินค้า</td>
                  <td className="p-5 text-right font-mono text-xl">5.05</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
             <a 
                href="https://line.me/R/ti/p/@yuanexchange"
                className="inline-block bg-[#06C755] text-white px-12 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform"
             >
                จองเรทวันนี้ผ่าน LINE
             </a>
          </div>

        </div>
      </main>
    </>
  );
}