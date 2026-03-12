'use client';
import React from 'react';
import { CheckCircle2, MessageCircle, ArrowRightLeft } from 'lucide-react';
import Calculator from '../Calculator'; 
import Image from 'next/image';
import ReviewSection from '../ReviewSection';

export default function HeroSection() {
  // 🚩 ลิงค์ส่วนกลางเพื่อให้แก้ที่เดียวจบ
  const contactLink = "https://lin.ee/XiJIx4F";

  return (
    <section className="relative w-full h-auto min-h-screen bg-[#0a6afc] flex items-center pt-[100px] md:pt-[120px] pb-20 overflow-hidden font-noto">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003192] to-[#4488ff] opacity-95" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* 📱 [Mobile Layout] - แสดงเฉพาะมือถือ */}
        <div className="flex flex-col items-center lg:hidden text-center space-y-8">
          
          {/* Header */}
          <div className="text-white space-y-3">
            <h1 className="text-4xl font-black leading-tight tracking-tight uppercase">
              บริการทางการเงิน<br />ครบวงจร ไทย-จีน
            </h1>
            <p className="text-xl font-bold opacity-90">แลกหยวน-บาท แลกบาท-หยวน</p>
          </div>

          {/* Gray Badge */}
          <div className="bg-slate-200/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-white/20">
            <p className="text-[#003192] text-sm font-bold leading-snug">
              หมดปัญหา บัญชีคู่ค้าจีนโดนอายัด<br />
              เงินค้าง โอนไม่ผ่าน โดนโกง
            </p>
          </div>

          {/* Guarantee List */}
          <div className="space-y-3 text-white">
            <CheckItem text="เรารันตีแหล่ง เงินสะอาด" />
            <CheckItem text="รวดเร็ว ปลอดภัย มีรับประกันยอด" />
            <CheckItem text="เรทคุ้มค่าโปร่งใส ตรวจสอบได้" />
            <CheckItem text="ไม่มีค่าบริการแอบแฝง" />
          </div>

          {/* Experience Text */}
          <p className="text-white/90 text-sm font-medium">
            ด้วยประสบการณ์มากกว่า 10 ปี และยอดโอนจริงจากลูกค้า<br />กว่า 10,000 ราย
          </p>

          {/* CTA Line Button (Mobile Lead) */}
          <div className="w-full flex flex-col items-center gap-2">
            <a 
              href={contactLink}
              target="_blank"
              className="w-full max-w-xs bg-[#32D34C] hover:bg-[#28b83e] text-white py-4 rounded-2xl text-xl font-black flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <MessageCircle size={24} />
              <span>ปรึกษาฟรี / เช็คเรท</span>
            </a>
            <p className="text-white/60 text-[10px] italic">
              * ทีมงานตอบกลับภายใน 5 นาที
            </p>
          </div>

          {/* 🎁 Promo & Service Icons */}
          <div className="w-full space-y-8">
            <div className="w-full bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-[40px] shadow-2xl border border-white/20 relative overflow-hidden text-center">
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                  ลูกค้าใหม่ ฟรีค่าธรรมเนียม<br />ครั้งแรก!
                </h3>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
                  ยอดเข้าภายใน 15 นาที เข้าใจคำว่ารีบ!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full px-1">
              <ServiceIcon imgSrc="/icons/transfer.webp" label="โอนเงินไปจีน" link={contactLink} />
              <ServiceIcon imgSrc="/icons/payment.webp" label="จ่ายค่าสินค้า" link={contactLink} />
              <ServiceIcon imgSrc="/icons/business.webp" label="สำหรับธุรกิจ" link={contactLink} />
            </div>
          </div>

          {/* ReviewSection (Mobile Only) */}
          <div className="w-full overflow-visible">
            <ReviewSection />
          </div>

          {/* Calculator Section */}
          <div className="w-full pt-4">
            <div className="text-white/80 text-xs font-bold mb-4 flex items-center justify-center gap-2 uppercase tracking-tighter">
              <ArrowRightLeft size={14} /> ทดลองคำนวณเรทปัจจุบัน
            </div>
            <Calculator />
          </div>
        </div>

        {/* 💻 [Desktop Layout] - แสดงเฉพาะหน้าจอคอม */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold opacity-90 uppercase tracking-[0.2em] text-blue-200"> MONEY TRANSFER SERVICE BY</h2>
              <h1 className="text-8xl xl:text-9xl font-black leading-none uppercase tracking-tighter">
                YUAN<br />EXCHANGE
              </h1>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                แลกเงินหยวน โอนไปจีน<br />
                ปลอดภัย 100% เรทดีที่สุด
              </h2>
              
              <div className="flex gap-4">
                <Badge text="แหล่งเงินสะอาด" />
                <Badge text="รับประกันยอดโอน" />
                <Badge text="ไม่มีค่าแฝง" />
              </div>
            </div>

            {/* 🚩 [Lead Button for Desktop] - เพิ่มเพื่อให้ทีมแอดเก็บลีดได้น่อ! */}
            <div className="pt-4 space-y-4">
              <a 
                href={contactLink} 
                target="_blank"
                className="inline-flex items-center gap-4 bg-[#32D34C] hover:bg-[#28b83e] text-white px-12 py-6 rounded-[30px] text-3xl font-black shadow-[0_20px_50px_rgba(50,211,76,0.3)] transition-all hover:-translate-y-1 active:scale-95"
              >
                <MessageCircle size={36} />
                <span>ติดต่อสอบถาม / รับเรทพิเศษ</span>
              </a>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="flex justify-end items-center relative">
            <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full" />
            <div className="relative z-10 w-full max-w-lg">
               <Calculator />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// --- Internal Components (Helper) ---

function Badge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full border border-white/20 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md">
      <CheckCircle2 size={16} className="text-green-400" /> {text}
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-base font-bold text-left text-white">
      <div className="bg-white/20 p-1 rounded-full shrink-0">
        <CheckCircle2 size={18} className="text-white" />
      </div>
      <span>{text}</span>
    </div>
  );
}

function ServiceIcon({ imgSrc, label, link }: { imgSrc: string, label: string, link: string }) {
  return (
    <a href={link} target="_blank" className="flex flex-col items-center gap-3 group active:scale-95 transition-all">
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-slate-50 overflow-hidden relative">
        <Image 
          src={imgSrc} 
          alt={label} 
          width={100} 
          height={100}
          className="object-contain group-hover:scale-110 transition-transform p-3" 
        />
      </div>
      <span className="text-white text-[12px] sm:text-sm font-black leading-tight text-center drop-shadow-sm">
        {label}
      </span>
    </a>
  );
}