'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { RefreshCw, TrendingUp, Calculator } from 'lucide-react';

interface RateHistory {
  date: string;
  rate: number;
}

export default function RatesPage() {
  const [historyData, setHistoryData] = useState<RateHistory[]>([]);
  const [currentRate, setCurrentRate] = useState(4.85); // ค่าเริ่มต้น
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลเรทเงินย้อนหลัง 7 วัน
    const fetchRates = async () => {
      try {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        // ดึงข้อมูลจาก Frankfurter API (CNY -> THB)
        const res = await fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=CNY&to=THB`);
        const data = await res.json();
        
        // แปลงข้อมูลให้เข้ากับรูปแบบของ Recharts
        const formattedData = Object.keys(data.rates).map(date => ({
          date: date.split('-').slice(1).join('/'), // แปลง 2026-02-26 เป็น 02/26
          rate: data.rates[date].THB
        }));

        setHistoryData(formattedData);
        setCurrentRate(formattedData[formattedData.length - 1].rate);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rates:", error);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 pt-32 pb-20 text-white">
        <div className="max-w-5xl mx-auto px-4">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black mb-2">สถิติเรทเงิน <span className="text-brand-yellow">LIVE ANALYTICS</span></h1>
            <p className="text-gray-400">ข้อมูลย้อนหลัง 7 วัน (1 CNY ต่อ THB)</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* ฝั่งซ้าย: กราฟ */}
            <div className="lg:col-span-2 bg-slate-900/50 border border-white/10 rounded-3xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="flex items-center gap-2 font-bold"><TrendingUp className="text-brand-yellow"/> แนวโน้มเรทเงิน</h2>
                {loading && <RefreshCw className="w-4 h-4 animate-spin text-brand-yellow" />}
              </div>
              
              <div className="h-64 w-full">
                {!loading && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis domain={['dataMin - 0.02', 'dataMax + 0.02']} hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                        itemStyle={{ color: '#facc15' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="#facc15" 
                        strokeWidth={4} 
                        dot={{ r: 4, fill: '#facc15', strokeWidth: 2 }} 
                        activeDot={{ r: 8, stroke: '#facc15', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* ฝั่งขวา: เครื่องคิดเลข */}
            <div className="bg-brand-yellow rounded-3xl p-8 text-slate-950 shadow-2xl shadow-yellow-500/10">
              <div className="flex items-center gap-2 mb-6 font-black text-xl uppercase italic">
                <Calculator /> Quick Convert
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase opacity-60">ใส่จำนวนเงินบาท (THB)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/20 border-b-2 border-slate-950/20 py-3 text-3xl font-black outline-none focus:border-slate-950 transition-all placeholder:text-slate-900/30"
                    placeholder="0.00"
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <div className="pt-4">
                  <label className="text-xs font-bold uppercase opacity-60">คุณจะได้รับเงินหยวน (CNY)</label>
                  <div className="text-5xl font-black tracking-tighter">
                    ¥ {(amount / currentRate).toLocaleString(undefined, {maximumFractionDigits: 2})}
                  </div>
                  <div className="text-sm font-bold mt-2 bg-slate-950/10 inline-block px-2 py-1 rounded">
                    Rate: 1 ¥ = {currentRate.toFixed(3)} ฿
                  </div>
                </div>
                <a 
                  href="https://line.me/R/ti/p/@yuanexchange"
                  className="block w-full bg-slate-950 text-white text-center py-4 rounded-2xl font-bold mt-8 hover:scale-105 transition-transform"
                >
                  แลกเงินเรทนี้เลย
                </a>
              </div>
            </div>
          </div>

          {/* ตารางรายละเอียด (Optional) */}
          <div className="mt-10 bg-slate-900/30 border border-white/5 rounded-2xl p-6">
             <p className="text-sm text-gray-500 italic text-center">
                * เรทเงินหยวนอัปเดตอ้างอิงตาม Frankfurter API ตลาดกลางต่างประเทศ ข้อมูลเพื่อใช้ประกอบการตัดสินใจเบื้องต้นเท่านั้น
             </p>
          </div>
        </div>
      </main>
    </>
  );
}