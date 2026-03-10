'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, RefreshCw, ArrowUpRight, ArrowDownLeft, Wallet, AlertCircle } from 'lucide-react';

// ✅ 1. สร้าง Interface กำหนดโครงสร้างข้อมูลให้ชัดเจน
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // ✅ 2. ระบุ Type ให้ State
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

  const fetchRates = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('rates')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (data) {
        setRates(data as RateState);
      }
    } catch (err) {
      console.error('Error fetching rates:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ 3. เช็คความถูกต้องโดยไม่ใช้ any
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
      const { error } = await supabase
        .from('rates')
        .update(rates)
        .eq('id', 1);
      
      if (error) throw error;
      alert('บันทึกเรทใหม่เรียบร้อยแล้วน่อปัง! ✨');
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการบันทึกน่อ!');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-noto">
      <div className="flex flex-col items-center gap-4">
        <RefreshCw className="animate-spin text-blue-600" size={40} />
        <p className="font-bold text-slate-500">กำลังดึงข้อมูลเรทปัจจุบันน่อ...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 font-noto py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-2xl text-white">
            <RefreshCw size={28} />
          </div>
          จัดการเรทเงินหยวน
        </h1>
        {!isFormValid && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-xl border border-red-100 animate-pulse">
            <AlertCircle size={18} />
            <span className="text-xs font-bold uppercase tracking-tight">กรุณากรอกเรทให้ครบทุกช่องน่อ</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 🇹🇭 -> 🇨🇳 บาทแลกหยวน */}
        <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-blue-600">
            <ArrowUpRight size={24} /> บาท → หยวน (THB → CNY)
          </h2>
          <div className="space-y-5">
            <RateInput label="บาทแลกหยวน" value={rates.bank_rate} onChange={(v) => setRates({...rates, bank_rate: v})} placeholder="เช่น 4.67" />
            <RateInput label="Alipay / WeChat" value={rates.digital_rate} onChange={(v) => setRates({...rates, digital_rate: v})} placeholder="เช่น 4.70" />
            <RateInput label="ฝากจ่ายยอดสินค้า" value={rates.pay_rate} onChange={(v) => setRates({...rates, pay_rate: v})} placeholder="เช่น 4.75" />
          </div>
        </div>

        {/* 🇨🇳 -> 🇹🇭 หยวนแลกบาท */}
        <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-green-600">
            <ArrowDownLeft size={24} /> หยวน → บาท (CNY → THB)
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
          <h2 className="text-xl font-black mb-6 flex items-center gap-2 relative z-10">
            <Wallet size={24} className="text-yellow-400" /> นโยบายค่าธรรมเนียม
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-bold opacity-50 uppercase tracking-widest">ค่าบริการต่อรายการ (บาท)</label>
              <input 
                type="number" 
                placeholder="ระบุค่าบริการ เช่น 50"
                className="w-full p-4 bg-white/10 rounded-2xl border border-white/10 font-bold text-2xl text-white focus:bg-white/20 outline-none transition-all placeholder:text-white/20" 
                value={rates.fee_amount} 
                onChange={(e) => setRates({...rates, fee_amount: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold opacity-50 uppercase tracking-widest">ยอดขั้นต่ำฟรีค่าธรรมเนียม (หยวน)</label>
              <input 
                type="number" 
                placeholder="ระบุยอด เช่น 1000"
                className="w-full p-4 bg-white/10 rounded-2xl border border-white/10 font-bold text-2xl text-white focus:bg-white/20 outline-none transition-all placeholder:text-white/20" 
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
        className={`w-full mt-10 py-6 rounded-[24px] font-black text-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl 
          ${isFormValid ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
      >
        {saving ? <RefreshCw className="animate-spin" /> : <Save />}
        {saving ? 'กำลังบันทึกข้อมูล...' : isFormValid ? 'อัปเดตเรทแบบ Real-time' : 'โปรดกรอกเรทให้ครบ'}
      </button>
    </div>
  );
}

// ✅ 4. ระบุ Type ให้ Props ของ RateInput
interface RateInputProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder: string;
}

function RateInput({ label, value, onChange, placeholder }: RateInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative">
        <input 
          type="number" 
          step="0.01" 
          placeholder={placeholder}
          className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none font-black text-xl text-slate-700 transition-all placeholder:text-slate-300" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-300">฿</span>
      </div>
    </div>
  );
}