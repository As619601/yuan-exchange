import React from 'react';
import { ShieldCheck, Zap, Heart, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
      <main className="bg-gray-50 min-h-screen pt-15 lg:pt-15">

        {/* Header Section */}
        <section className="bg-gray-700 py-16 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">เกี่ยวกับเรา</h1>
          <p className="text-xl opacity-90">YUAN EXCHANGE - บริการแลกเงินหยวนที่จริงใจและดีที่สุด</p>
        </section>

        {/* Main Content */}
        <section className="max-w-6xl mx-auto py-16 px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-red-600 pl-4">
                ทำไมต้อง YUAN EXCHANGE?
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                เราเริ่มต้นจากการเล็งเห็นถึงความยุ่งยากในการแลกเปลี่ยนเงินหยวน (CNY) 
                ที่มีความผันผวนและขั้นตอนที่ซับซ้อน เราจึงสร้างแพลตฟอร์มนี้ขึ้นมาเพื่อมอบประสบการณ์ที่ง่าย 
                และโปร่งใสที่สุดให้กับลูกค้า
              </p>
              <p className="text-gray-600 leading-relaxed">
                ไม่ว่าคุณจะเป็นนักท่องเที่ยว นักศึกษาต่อ หรือนักธุรกิจที่ต้องการทำธุรกรรมระหว่างไทย-จีน 
                เราพร้อมเป็นพันธมิตรที่ช่วยให้คุณได้รับเรทราคาที่ดีที่สุดเสมอ
              </p>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-red-500 text-center">
                <ShieldCheck className="mx-auto text-red-600 mb-2" size={32} />
                <h4 className="font-bold text-gray-700">ปลอดภัย 100%</h4>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-yellow-500 text-center">
                <Zap className="mx-auto text-yellow-500 mb-2" size={32} />
                <h4 className="font-bold text-gray-700">รวดเร็วทันใจ</h4>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-red-500 text-center">
                <Heart className="mx-auto text-red-600 mb-2" size={32} />
                <h4 className="font-bold text-gray-700">บริการด้วยใจ</h4>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-yellow-500 text-center">
                <Globe className="mx-auto text-yellow-500 mb-2" size={32} />
                <h4 className="font-bold text-gray-700">เรทตามตลาดจริง</h4>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}