'use client';

import { ShieldCheck, Zap, Award, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { label: 'ประสบการณ์ตรง', value: '10+', icon: <Award className="w-5 h-5" /> },
    { label: 'โอนสำเร็จกว่า', value: '50K', icon: <Zap className="w-5 h-5" /> },
    { label: 'ความปลอดภัย', value: '100%', icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  return (
    <section className="relative py-24 bg-[#0f172a] overflow-hidden"> {/* ใช้สีที่เข้มพอๆ กับ Hero */}
      
      {/* แสงฟุ้งพื้นหลัง ปรับให้จางลงเพื่อไม่ให้กวนสายตา */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* ฝั่งซ้าย: รูปภาพ (แก้เรื่องการซ้อนทับ) */}
          <div className="relative group">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img 
                src="/images/about-image.jpg" 
                alt="Business Reliability" 
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>
            
            {/* กรอบตกแต่ง - ปรับตำแหน่งให้เยื้องชัดเจนและไม่ทับรูป */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 border-2 border-brand-yellow/30 rounded-2xl z-0" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-yellow/10 rounded-full blur-2xl z-0" />
          </div>

          {/* ฝั่งขวา: เนื้อหา */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-brand-yellow"></span>
              <h2 className="text-white font-bold tracking-[0.25em] uppercase text-xs">
                รู้จักเราให้มากขึ้น
              </h2>
            </div>
            
           <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-[1.2]">
  ทำธุรกิจกับจีน <br/>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-brand-yellow to-yellow-200">
    ต้องเริ่มด้วยความไว้ใจ
  </span>
</h3>
            
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light">
              เราไม่ใช่แค่ตัวกลางในการโอนเงิน แต่เราคือ <span className="text-white font-medium">คู่คิด</span> ของผู้ประกอบการไทย 
              ด้วยประสบการณ์กว่า 10 ปี เราเข้าใจดีว่าทุกบาทของคุณมีความหมาย 
              ระบบของเราจึงออกแบบมาเพื่อความเร็วและความปลอดภัยสูงสุด
            </p>

            {/* Stats Cards - ปรับ Padding และ Gap */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-yellow/40 transition-all duration-300">
                  <div className="text-brand-yellow mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-3 text-white font-medium hover:text-brand-yellow transition-all group">
              <span className="border-b border-transparent group-hover:border-brand-yellow pb-1">
                ดูใบรับรองและทะเบียนการค้าของเรา
              </span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}