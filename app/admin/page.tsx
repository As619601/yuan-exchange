'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Save, RefreshCw, ChevronLeft, Database, AlertCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // 📝 1. ใช้ String ใน State เพื่อให้ลบจนว่างได้น่อ
  const [rates, setRates] = useState({
    bank_rate: '',
    digital_rate: '',
    pay_rate: '',
    fee_amount: '',
    fee_threshold: ''
  });

  useEffect(() => {
    async function fetchRates() {
      const { data, error } = await supabase
        .from('rates')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (data && !error) {
        // แปลงตัวเลขจาก DB เป็น String เพื่อใส่ใน Input
        setRates({
          bank_rate: data.bank_rate.toString(),
          digital_rate: data.digital_rate.toString(),
          pay_rate: data.pay_rate.toString(),
          fee_amount: data.fee_amount.toString(),
          fee_threshold: data.fee_threshold.toString()
        });
      }
    }
    fetchRates();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234') {
      setIsLoggedIn(true);
    } else {
      alert('รหัสผ่านไม่ถูกต้อง... ลองใหม่อีกครั้งนะปัง');
    }
  };

  // 💾 2. ฟังก์ชันอัปเดตพร้อมระบบตรวจเช็ค (Validation)
  const handleUpdate = async () => {
    // เช็คว่ามีช่องไหนว่างไหม
    const hasEmptyField = Object.values(rates).some(value => value === '');
    
    if (hasEmptyField) {
      alert('⚠️ ห้ามปล่อยช่องว่างน่อปัง! กรุณากรอกตัวเลขให้ครบทุกช่อง');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('rates')
      .update({
        bank_rate: Number(rates.bank_rate),
        digital_rate: Number(rates.digital_rate),
        pay_rate: Number(rates.pay_rate),
        fee_amount: Number(rates.fee_amount),
        fee_threshold: Number(rates.fee_threshold),
        updated_at: new Date()
      })
      .eq('id', 1);

    setLoading(false);
    if (!error) {
      alert('✨ อัปเดตเรทออนไลน์เรียบร้อยแล้วน่อ!');
    } else {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล...');
    }
  };

  if (!isLoggedIn) {
    // ... ส่วน Login (เหมือนเดิม) ...
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-[32px] shadow-xl w-full max-w-sm text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 mb-2 uppercase italic">Admin Access</h1>
            <input 
              type="password" 
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl mb-4 outline-none focus:border-blue-500 transition-all font-bold text-center"
            />
            <button className="w-full bg-[#0a6afc] text-white py-4 rounded-2xl font-black uppercase tracking-widest">Login</button>
          </form>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-left">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold transition-all">
            <ChevronLeft size={20} /> กลับไปหน้าบ้าน
          </Link>
          <div className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live System
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white">
          <div className="bg-[#0a6afc] p-8 md:p-10 text-white">
            <h2 className="text-3xl font-black italic uppercase flex items-center gap-3 tracking-tight">
              <Database /> Rate Control Center
            </h2>
          </div>

          <div className="p-8 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Bank (โอนธนาคาร)', key: 'bank_rate' },
                { label: 'Digital (Alipay/WeChat)', key: 'digital_rate' },
                { label: 'Pay (ฝากจ่ายสินค้า)', key: 'pay_rate' },
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase px-1 tracking-widest">{item.label}</label>
                  <input 
                    type="text" // 👈 เปลี่ยนเป็น text เพื่อคุมพฤติกรรมการพิมพ์
                    inputMode="decimal" // 👈 ให้มือถือโชว์แป้นตัวเลข
                    value={rates[item.key as keyof typeof rates]}
                    onChange={(e) => {
                        // 🛠️ อนุญาตให้กรอกเฉพาะตัวเลขและจุดทศนิยมเท่านั้น
                        const val = e.target.value;
                        if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
                            setRates({ ...rates, [item.key]: val });
                        }
                    }}
                    className={`w-full bg-slate-50 border-2 p-4 rounded-2xl font-black text-slate-700 text-xl outline-none transition-all shadow-sm ${
                        rates[item.key as keyof typeof rates] === '' ? 'border-red-200' : 'border-slate-100 focus:border-blue-600 focus:bg-white'
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <AlertCircle size={14} /> Fee Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { label: 'ค่าธรรมเนียม (บาท)', key: 'fee_amount' },
                    { label: 'ยอดหยวนขั้นต่ำฟรีค่าธรรมเนียม', key: 'fee_threshold' }
                ].map((item) => (
                    <div key={item.key}>
                        <label className="text-[11px] font-black text-slate-400 uppercase px-1 tracking-widest">{item.label}</label>
                        <input 
                            type="text"
                            inputMode="numeric"
                            value={rates[item.key as keyof typeof rates]}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '' || /^[0-9]*$/.test(val)) {
                                    setRates({ ...rates, [item.key]: val });
                                }
                            }}
                            className={`w-full bg-slate-50 border-2 p-4 rounded-2xl font-black text-slate-700 outline-none transition-all shadow-sm ${
                                rates[item.key as keyof typeof rates] === '' ? 'border-red-200' : 'border-slate-100 focus:border-blue-600 focus:bg-white'
                            }`}
                        />
                    </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleUpdate}
                disabled={loading}
                className="w-full bg-[#0a6afc] hover:bg-blue-700 text-white py-6 rounded-3xl text-xl font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-100 active:scale-[0.98] transition-all disabled:opacity-50 uppercase tracking-widest"
              >
                {loading ? <RefreshCw className="animate-spin" /> : <Save />} บันทึกและอัปเดตหน้าเว็บ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}