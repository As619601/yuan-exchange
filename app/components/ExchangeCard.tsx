'use client'; // ต้องมีบรรทัดนี้เพราะมีการใช้ State (การโต้ตอบ)

import { useState } from 'react';

export default function ExchangeCard() {
  // สร้าง State สำหรับเก็บค่าต่างๆ เหมือนในไฟล์ index.txt
  const [cnyAmount, setCnyAmount] = useState<number>(0);
  const [service, setService] = useState('โอนเงินไปจีน');
  const [rate, setRate] = useState(4.93);
  const [fee] = useState(50);

  // Logic การคำนวณอัตโนมัติเมื่อมีการเปลี่ยนค่า
  const total = (cnyAmount * rate) + fee;

  // ฟังก์ชันสร้าง Link LINE พร้อมข้อความ
  const lineLink = `https://line.me/R/oaMessage/@yuanexchange/?${encodeURIComponent(
    `สวัสดีค่ะ สนใจใช้บริการ ${service}\nจำนวนเงิน: ${cnyAmount} หยวน\n(ยอดประเมิน ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })} บาท)`
  )}`;
  
  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/30 shadow-2xl animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-white">เช็คเรท & คำนวณ</h3>
        <span className="bg-brand-yellow text-slate-900 px-3 py-1 rounded-lg text-sm font-bold animate-pulse">
          Live Rate
        </span>
      </div>

      <div className="space-y-5">
        {/* เลือกบริการ */}
        <div>
          <label className="block text-blue-100 text-sm mb-2 ml-1">เลือกประเภทบริการ</label>
          <select 
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            onChange={(e) => {
                setService(e.target.value);
                // จำลองการเปลี่ยนเรทตามบริการเหมือนในโค้ดเดิม
                setRate(e.target.value === 'โอนเงินไปจีน' ? 4.93 : 5.05);
            }}
          >
            <option className="text-slate-900">โอนเงินไปจีน</option>
            <option className="text-slate-900">ฝากจ่าย 1688 / Taobao</option>
            <option className="text-slate-900">เติมเงิน Alipay</option>
          </select>
        </div>

        {/* กรอกจำนวนเงินหยวน */}
        <div>
          <label className="block text-blue-100 text-sm mb-2 ml-1">จำนวนเงิน (CNY)</label>
          <input 
            type="number" 
            placeholder="0.00"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-2xl font-bold placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            onChange={(e) => setCnyAmount(Number(e.target.value))}
          />
        </div>

        {/* ส่วนแสดงผลลัพธ์กระจกเบลอซ้อนกระจกเบลอ */}
        <div className="bg-black/20 rounded-2xl p-5 space-y-3 border border-white/10">
          <div className="flex justify-between text-blue-100">
            <span>อัตราแลกเปลี่ยน</span>
            <span className="font-bold text-white">{rate} THB / 1 CNY</span>
          </div>
          <div className="flex justify-between text-blue-100">
            <span>ค่าธรรมเนียม</span>
            <span className="font-bold text-white">{fee} THB</span>
          </div>
          <hr className="border-white/10" />
          <div className="flex justify-between items-end">
            <span className="text-white">ยอดชำระสุทธิประเมิน</span>
            <div className="text-right">
              <span className="block text-3xl font-bold text-brand-yellow">
                {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-blue-200">บาท (THB)</span>
            </div>
          </div>
        </div>

        {/* ปุ่มส่งข้อมูลเข้า LINE */}
        <a 
          href={lineLink}
          target="_blank"
          className="block w-full bg-line-green hover:bg-green-600 text-white text-center py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-green-900/20"
        >
          <i className="fab fa-line mr-2"></i> สั่งออเดอร์ทาง LINE
        </a>
      </div>
    </div>
  );
}