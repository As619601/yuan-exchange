'use client';

import React from 'react';
import { BadgeDollarSign, Repeat, Wallet, Landmark, History, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function ServicePage() {
    
  const financialServices = [
    {
      title: "แลกเปลี่ยนเงินหยวน (CNY)",
      description: "บริการแลกเงินบาทเป็นเงินหยวน หรือหยวนเป็นบาท ด้วยเรทที่ได้รับมาตรฐานและอัปเดตเรียลไทม์ทุกวัน",
      icon: <BadgeDollarSign className="w-8 h-8 text-brand-yellow" />,
    },
    {
      title: "โอนเงินไปบัญชีธนาคารจีน",
      description: "รับโอนเงินเข้าบัญชีธนาคารในประเทศจีนโดยตรง ปลายทางรับเงินไวภายในวันเดียว ปลอดภัยและตรวจสอบได้",
      icon: <Landmark className="w-8 h-8 text-brand-yellow" />,
    },
    {
      title: "เติมเงิน Alipay / WeChat Pay",
      description: "บริการเติมเงินเข้ากระเป๋าเงินดิจิทัลยอดนิยมของจีน สำหรับนักท่องเที่ยว หรือผู้ที่ต้องการช้อปปิ้งออนไลน์",
      icon: <Wallet className="w-8 h-8 text-brand-yellow" />,
    },
    {
      title: "ชำระค่าสินค้าจีน",
      description: "บริการจ่ายเงินค่าสินค้าให้ซัพพลายเออร์จีนแทนคุณ ลดความยุ่งยากเรื่องการทำธุรกรรมระหว่างประเทศ",
      icon: <Repeat className="w-8 h-8 text-brand-yellow" />,
    },
    {
      title: "ความปลอดภัยระดับสูง",
      description: "ทุกธุรกรรมมีการยืนยันตัวตนและบันทึกประวัติการแลกเปลี่ยนอย่างชัดเจน มั่นใจได้ว่าเงินจะถึงมือผู้รับแน่นอน",
      icon: <ShieldCheck className="w-8 h-8 text-brand-yellow" />,
    },
    {
      title: "ตรวจสอบประวัติย้อนหลัง",
      description: "มีใบเสร็จและการแจ้งเตือนผ่านช่องทางต่าง ๆ ทุกครั้งที่ทำรายการ เพื่อความโปร่งใสและตรวจสอบได้",
      icon: <History className="w-8 h-8 text-brand-yellow" />,
    }
  ];

  return (
    <>
      {/* เพิ่ม Navbar ไว้บนสุดของ Page */}
      <Navbar />
    
    <main className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            บริการการเงิน <span className="text-brand-yellow">FINANCIAL SERVICES</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            เราคือผู้เชี่ยวชาญด้านการแลกเปลี่ยนเงินหยวนที่รวดเร็วและปลอดภัยที่สุด 
            ช่วยให้การทำธุรกรรมระหว่างไทย-จีนของคุณเป็นเรื่องง่าย
          </p>
        </div>

        {/* Financial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {financialServices.map((service, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-brand-yellow/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-yellow/10"
            >
              <div className="mb-4 bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Section */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4 italic">ทำไมต้องแลกเงินกับเรา?</h2>
                    <ul className="space-y-4 text-gray-400 font-light">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-yellow rounded-full" /> เรทดีที่สุดเทียบเคียงตลาดกลาง</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-yellow rounded-full" /> ไม่มีค่าธรรมเนียมแอบแฝง</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-yellow rounded-full" /> โอนไว ปลายทางได้รับทันที</li>
                    </ul>
                </div>
                <div className="flex justify-center">
                    <a 
                      href="https://line.me/R/ti/p/@yuanexchange"
                      className="bg-brand-yellow text-slate-950 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl shadow-yellow-500/20"
                    >
                      เช็คเรทวันนี้ฟรี!
                    </a>
                </div>
            </div>
        </div>

      </div>
    </main>
    </>
  );
}