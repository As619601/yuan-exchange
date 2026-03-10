'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Save, RefreshCw, ArrowUpRight, ArrowDownLeft, 
  Wallet, AlertCircle, Lock, LogOut, ExternalLink, ChevronLeft 
} from 'lucide-react';
import Link from 'next/link';

interface RateState {
  bank_rate: string | number;
  digital_rate: string | number;
  pay_rate: string | number;
  bank_rate_cny_to_thb: string | number;
  digital_rate_cny_to_thb: string | number;
  pay_rate_cny_to_thb: string | number;
  fee_amount: string | number;
  fee_threshold: string | number;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [rates, setRates] = useState<RateState>({
    bank_rate: '',
    digital_rate: '',
    pay_rate: '',
    bank_rate_cny_to_thb: '',
    digital_rate_cny_to_thb: '',
    pay_rate_cny_to_thb: '',
    fee_amount: '',
    fee_threshold: ''
  });

  // 🔐 ระบบตรวจสอบรหัสผ่าน
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_auth', 'true'); // จำไว้เบื้องต้นน่อ
    } else {
      alert('รหัสผ่านไม่ถูกต้องน่อ! ลองใหม่อีกครั้ง');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_auth');
  };

  const fetchRates = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('rates')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (data) setRates(data as RateState);
    } catch (err) {
      console.error('Error fetching rates:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const isFormValid = useMemo(() => {
    const requiredFields: (string | number)[] = [
      rates.bank_rate, rates.digital_rate, rates.pay_rate,
      rates.bank_rate_cny_to_thb, rates.digital_rate_cny_to_thb, rates.pay_rate_cny_to_thb,
      rates.fee_amount, rates.fee_threshold
    ];
    return requiredFields.every(field => field !== '' && !isNaN(Number(field)) && Number(field) > 0);
  }, [rates]);

  const handleSave = async () => {
    if (!isFormValid) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('rates').update(rates).eq('id', 1);
      if (error) throw error;
      alert('บันทึกเรทใหม่เรียบร้อยแล้วน่อ! ✨');
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึกน่อ!');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchRates();
    if (localStorage.getItem('admin_auth') === 'true') setIsLoggedIn(true);
  }, [fetchRates]);

  // 🧱 หน้าจอ Login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 font-noto p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 text-center">
          <div className="inline-flex p-4 bg-blue-50 rounded-3xl text-blue-600 mb-6">
            <Lock size={40} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 mb-2">Admin Access</h1>
          <p className="text-slate-500 mb-8 text-sm">กรุณากรอกรหัสผ่านเพื่อจัดการเรทน่อ</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none text-center font-bold transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all shadow-lg shadow-blue-100">
              เข้าสู่ระบบ
            </button>
          </form>
          <Link href="/" className="inline-flex items-center gap-2 mt-8 text-slate-400 hover:text-blue-600 transition-colors text-sm font-bold">
            <ChevronLeft size={16} /> กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-noto">
      <div className="flex flex-col items-center gap-4">
        <RefreshCw className="animate-spin text-blue-600" size={40} />
        <p className="font-bold text-slate-500">กำลังดึงข้อมูลเรทปัจจุบันน่อ...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 font-noto py-12">
      {/* 🧭 Header & Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-100">
            <RefreshCw size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800">จัดการเรทเงินหยวน</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Update real-time rates</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 bg-white border-2 border-slate-100 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all">
            <ExternalLink size={18} /> ดูหน้าเว็บหลัก
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 px-5 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all">
            <LogOut size={18} /> ออกจากระบบ
          </button>
        </div>
      </div>

      {!isFormValid && (
        <div className="mb-8 flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100">
          <AlertCircle size={20} />
          <span className="text-sm font-black uppercase tracking-tight">กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง (ต้องมากกว่า 0)</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🇹🇭 -> 🇨🇳 */}
        <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-blue-600 uppercase tracking-tighter">
            <ArrowUpRight size={24} /> บาท → หยวน (THB/CNY)
          </h2>
          <div className="space-y-5">
            <RateInput label="โอนเข้าบัญชีธนาคารจีน" value={rates.bank_rate} onChange={(v) => setRates({...rates, bank_rate: v})} placeholder="เช่น 4.67" />
            <RateInput label="Alipay / WeChat" value={rates.digital_rate} onChange={(v) => setRates({...rates, digital_rate: v})} placeholder="เช่น 4.70" />
            <RateInput label="ฝากจ่ายยอดสินค้า" value={rates.pay_rate} onChange={(v) => setRates({...rates, pay_rate: v})} placeholder="เช่น 4.75" />
          </div>
        </div>

        {/* 🇨🇳 -> 🇹🇭 */}
        <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-green-600 uppercase tracking-tighter">
            <ArrowDownLeft size={24} /> หยวน → บาท (CNY/THB)
          </h2>
          <div className="space-y-5">
            <RateInput label="หยวนแลกบาท" value={rates.bank_rate_cny_to_thb} onChange={(v) => setRates({...rates, bank_rate_cny_to_thb: v})} placeholder="เช่น 4.35" />
            <RateInput label="Alipay / WeChat" value={rates.digital_rate_cny_to_thb} onChange={(v) => setRates({...rates, digital_rate_cny_to_thb: v})} placeholder="เช่น 4.40" />
            <RateInput label="ฝากจ่ายยอดสินค้า" value={rates.pay_rate_cny_to_thb} onChange={(v) => setRates({...rates, pay_rate_cny_to_thb: v})} placeholder="เช่น 4.45" />
          </div>
        </div>

        {/* 💰 ค่าธรรมเนียม */}
        <div className="md:col-span-2 bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Wallet size={120} />
          </div>
          <h2 className="text-xl font-black mb-6 flex items-center gap-2 relative z-10 uppercase tracking-tighter">
            <Wallet size={24} className="text-yellow-400" /> นโยบายค่าธรรมเนียม
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">ค่าบริการต่อรายการ (บาท)</label>
              <input 
                type="number" 
                placeholder="เช่น 50"
                className="w-full p-4 bg-white/10 rounded-2xl border border-white/10 font-bold text-2xl text-white focus:bg-white/20 outline-none transition-all" 
                value={rates.fee_amount} 
                onChange={(e) => setRates({...rates, fee_amount: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">ยอดขั้นต่ำฟรีค่าธรรมเนียม (หยวน)</label>
              <input 
                type="number" 
                placeholder="เช่น 1000"
                className="w-full p-4 bg-white/10 rounded-2xl border border-white/10 font-bold text-2xl text-white focus:bg-white/20 outline-none transition-all" 
                value={rates.fee_threshold} 
                onChange={(e) => setRates({...rates, fee_threshold: e.target.value})} 
              />
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleSave}
        disabled={saving || !isFormValid}
        className={`w-full mt-10 py-7 rounded-[28px] font-black text-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl 
          ${isFormValid ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200/50' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
      >
        {saving ? <RefreshCw className="animate-spin" size={28} /> : <Save size={28} />}
        {saving ? 'กำลังบันทึกข้อมูล...' : isFormValid ? 'อัปเดตเรทแบบ REAL-TIME' : 'กรุณากรอกเรทให้ครบทุกช่อง'}
      </button>
    </div>
  );
}

interface RateInputProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder: string;
}

function RateInput({ label, value, onChange, placeholder }: RateInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <input 
          type="number" 
          step="0.01" 
          placeholder={placeholder}
          className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none font-black text-xl text-slate-700 transition-all" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-300">฿</span>
      </div>
    </div>
  );
}